import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Define the JSON schema for structured output
const meceOpsSchema = {
  name: 'mece_operations_breakdown',
  schema: {
    type: 'object',
    properties: {
      scope: {
        type: 'string',
        description: 'The organizational scope'
      },
      operation: {
        type: 'string',
        description: 'The major operation being broken down'
      },
      activities: {
        type: 'array',
        description: 'List of specific activities that comprise this operation',
        items: {
          type: 'string'
        }
      }
    },
    required: ['scope', 'operation', 'activities'],
    additionalProperties: false
  },
  strict: true
};

async function generateMeceOpsList(
  majorOperation: string,
  orgScope: string,
  excludedOperations?: string[]
) {
  // Build the system prompt with the user's specific requirements
  const systemPrompt = `You are an expert in all manner of organizational operations. When given an organizational operation, generate a mutually exclusive, collectively exhaustive list of what activities that operation would consist of. Furthermore, you will consider a list of EXCLUDED operations and refrain listing any activity that would be contained within those excluded operations.

Consider the following example:
Given organizational scope: a fire department
Given major operation: Fire Fighting
Given excluded operations: Fire Prevention, Emergency Medical Services, Hazardous Material Response, Disaster Response, Administration and Support, Community Engagement

The list of appropriate activities would include:
-Extinguish fires
-Rescuing individuals
-Conducting fire suppression operations

It would not include activities that belong in excluded operations:
-Providing first aid and medical response
-Responding to chemical spills

Format the response as a JSON object, using the following based on the example above:

{
  "scope": "Organizational Scope",
  "operation": "Major Operation",
  "activities": ["Extinguish fires", "Rescuing individuals", "Conducting fire suppression operations"]
}

Note the list of activities should be as long as needed to comprehensively cover all activities necessary for the major operation.`;

  // Build the user message
  let userMessage = `organizational scope: ${orgScope}\nmajor operation: ${majorOperation}`;

  if (excludedOperations && excludedOperations.length > 0) {
    userMessage += `\nexcluded operations: ${excludedOperations.join(', ')}`;
  }

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o', // Use gpt-4o which supports JSON mode
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' } // Use json_object mode for reliable JSON
    });

    const content = response.choices[0].message.content;

    // Parse JSON with error handling
    let parsedContent;
    try {
      parsedContent = JSON.parse(content || '{}');

      // Validate that it has the expected structure
      if (
        !parsedContent.scope ||
        !parsedContent.operation ||
        !parsedContent.activities ||
        !Array.isArray(parsedContent.activities)
      ) {
        throw new Error(
          'Response does not contain expected structure (scope, operation, activities)'
        );
      }
    } catch (jsonError) {
      // Fallback structure if JSON parsing fails
      parsedContent = {
        scope: orgScope,
        operation: majorOperation,
        activities: [content || 'No content received']
      };
    }

    return {
      content: parsedContent,
      raw_content: content,
      model: response.model,
      usage: {
        prompt_tokens: response.usage?.prompt_tokens || 0,
        completion_tokens: response.usage?.completion_tokens || 0,
        total_tokens: response.usage?.total_tokens || 0
      }
    };
  } catch (error) {
    throw new Error(
      `OpenAI API error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const majorOperation = searchParams.get('majorOperation');
  const orgScope = searchParams.get('orgScope');
  const excludedOperationsParam = searchParams.get('excludedOperations');

  // Parse excluded operations if provided (comma-separated list)
  const excludedOperations = excludedOperationsParam
    ? excludedOperationsParam
        .split(',')
        .map((op) => op.trim())
        .filter((op) => op.length > 0)
    : undefined;

  if (!majorOperation) {
    return NextResponse.json({ error: 'majorOperation parameter is required' }, { status: 400 });
  }

  if (!orgScope) {
    return NextResponse.json({ error: 'orgScope parameter is required' }, { status: 400 });
  }

  try {
    const result = await generateMeceOpsList(majorOperation, orgScope, excludedOperations);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('MECE Ops API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
