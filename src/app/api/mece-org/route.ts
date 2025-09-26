import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Define the JSON schema for structured output
const meceOrgSchema = {
  name: 'mece_organizational_breakdown',
  schema: {
    type: 'object',
    properties: {
      groups: {
        type: 'array',
        description:
          'MECE (Mutually Exclusive, Collectively Exhaustive) groups of organizational activities',
        items: {
          type: 'object',
          properties: {
            group: {
              type: 'string',
              description: 'Name of the activity group'
            },
            activities: {
              type: 'array',
              description: 'List of specific activities within this group',
              items: {
                type: 'string'
              }
            }
          },
          required: ['group', 'activities'],
          additionalProperties: false
        }
      }
    },
    required: ['groups'],
    additionalProperties: false
  },
  strict: true
};

async function generateMeceList(userMessage: string, systemPrompt?: string) {
  // Default system prompt with JSON format requirement
  const defaultSystemPrompt = `You are an expert in all manner of organizational operations. When given an example organization, generate a mutually exclusive, collectively exhaustive list of what activities that organization might be involved in.

Create comprehensive groups that cover all aspects of the organization without overlap. Each group should contain specific, actionable activities that fall clearly within that category.

Consider the following example structure:
- Core Operations (Primary business activities, Service delivery, Quality control)
- Business Development (Marketing, Sales, Partnership development)
- Support Functions (HR, Finance, IT, Legal)

Ensure your breakdown is:
1. Mutually Exclusive: No activity appears in multiple groups
2. Collectively Exhaustive: All major organizational activities are covered
3. Comprehensive: Include both operational and strategic activities

IMPORTANT: You must respond with valid JSON in exactly this format:
{
  "groups": [
    {
      "group": "Group Name",
      "activities": ["Activity 1", "Activity 2", "Activity 3"]
    }
  ]
}`;

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o', // Use gpt-4o which supports JSON mode
      messages: [
        { role: 'system', content: systemPrompt || defaultSystemPrompt },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' } // Use json_object mode for now
    });

    const content = response.choices[0].message.content;

    // Parse JSON with error handling
    let parsedContent;
    try {
      parsedContent = JSON.parse(content || '{}');

      // Validate that it has the expected structure
      if (!parsedContent.groups || !Array.isArray(parsedContent.groups)) {
        throw new Error('Response does not contain expected groups array');
      }
    } catch (jsonError) {
      // Fallback structure if JSON parsing fails
      parsedContent = {
        groups: [
          {
            group: 'Raw Response',
            activities: [content || 'No content received']
          }
        ]
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
  const userMessage = searchParams.get('userMessage');
  const systemPrompt = searchParams.get('systemPrompt');

  if (!userMessage) {
    return NextResponse.json({ error: 'userMessage parameter is required' }, { status: 400 });
  }

  try {
    const result = await generateMeceList(userMessage, systemPrompt || undefined);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('MECE Org API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
