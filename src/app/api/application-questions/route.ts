import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Define the JSON schema for structured output
const applicationQuestionsSchema = {
  name: 'satellite_application_questions',
  schema: {
    type: 'object',
    properties: {
      questions: {
        type: 'array',
        description:
          'List of questions to understand how satellite remote sensing can provide value for the operational activity',
        items: {
          type: 'string'
        }
      }
    },
    required: ['questions'],
    additionalProperties: false
  },
  strict: true
};

async function generateApplicationQuestions(operation: string, orgScope: string) {
  const systemPrompt = `You are an expert in using satellite remote sensing to provide tangible operational value across multiple industries. You are knowledgeable about all the variables of spatial, temporal, and spectral resolution in the latest remote sensing satellites.

Given an operational activity, compose a list of questions that would help you refine your understanding of the activity enough to describe how remote sensing might provide specific value. Tailor the questions to someone who is deeply familiar with the given activity but has no familiarity with satellite operation and try to keep the number of questions under 5.

Your questions should focus on:
1. **Spatial characteristics**: What physical elements, equipment, or changes are involved that might be visible from above?
2. **Temporal patterns**: When does this activity occur? How frequently? Are there seasonal or cyclical patterns?
3. **Operational constraints**: What factors limit or enable this activity? What conditions are critical for success?
4. **Value indicators**: What outcomes or metrics matter most for this activity? What would early detection or monitoring provide?
5. **Context and scale**: Where does this activity take place? What is the typical scale or extent?

Ask practical, specific questions that would reveal actionable satellite applications without requiring satellite expertise from the respondent.

Format your response as a JSON object:

{
  "questions": [
    "Example question?",
    "Example question?"
  ]
}`;

  const userMessage = `Organizational scope: ${orgScope}\nOperational activity: ${operation}`;

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;

    // Parse JSON with error handling
    let parsedContent;
    try {
      parsedContent = JSON.parse(content || '{}');

      // Validate that it has the expected structure
      if (!parsedContent.questions || !Array.isArray(parsedContent.questions)) {
        throw new Error('Response does not contain expected questions array');
      }

      // Ensure we have at least one question and no more than 5
      if (parsedContent.questions.length === 0) {
        throw new Error('No questions generated');
      }

      // Trim to maximum 5 questions if more were generated
      if (parsedContent.questions.length > 5) {
        parsedContent.questions = parsedContent.questions.slice(0, 5);
      }
    } catch (jsonError) {
      // Fallback structure if JSON parsing fails
      parsedContent = {
        questions: [
          `What specific equipment or infrastructure is most critical for ${operation}?`,
          `How often and when does ${operation} typically occur?`,
          `What are the main factors that could disrupt or enhance ${operation}?`,
          `What would be the most valuable outcome from monitoring ${operation}?`
        ]
      };
    }

    return {
      questions: parsedContent.questions,
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
  const operation = searchParams.get('operation');
  const orgScope = searchParams.get('orgScope');

  if (!operation) {
    return NextResponse.json({ error: 'operation parameter is required' }, { status: 400 });
  }

  if (!orgScope) {
    return NextResponse.json({ error: 'orgScope parameter is required' }, { status: 400 });
  }

  try {
    const result = await generateApplicationQuestions(operation, orgScope);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Application Questions API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
