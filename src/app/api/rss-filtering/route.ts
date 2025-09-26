import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Define the JSON schema for structured output
const rssFilterSchema = {
  name: 'satellite_observation_filter',
  schema: {
    type: 'object',
    properties: {
      rssFilter: {
        type: 'object',
        properties: {
          definitelyObservable: {
            type: 'array',
            description:
              'Activities that are definitely observable by satellite (clear, large-scale, distinctive)',
            items: {
              type: 'string'
            }
          },
          maybeObservable: {
            type: 'array',
            description:
              'Activities that might be observable by satellite (smaller scale, less distinctive, or require inference)',
            items: {
              type: 'string'
            }
          }
        },
        required: ['definitelyObservable', 'maybeObservable'],
        additionalProperties: false
      }
    },
    required: ['rssFilter'],
    additionalProperties: false
  },
  strict: true
};

async function generateRSSFilter(operations: string, orgScope: string) {
  const systemPrompt = `You are an expert in satellite observation and remote sensing capabilities for monitoring organizational activities. Given an organizational scope and a list of specific operations, categorize the activities based on their observability from satellite imagery.

Your task is to analyze each operation and classify the constituent activities into two categories:

1. **Definitely Observable**: Activities that are clearly visible and identifiable from satellite imagery. These typically include:
   - Large-scale infrastructure and equipment
   - Vehicles and machinery in operation
   - Construction activities and structures
   - Clear changes in land use or physical patterns
   - Activities that create visible signatures (smoke, heat, movement patterns)

2. **Maybe Observable**: Activities that might be detectable through satellite observation but require more sophisticated analysis or inference. These typically include:
   - Smaller-scale activities that might be visible under ideal conditions
   - Activities that require inference from secondary indicators
   - Indoor activities that might have visible external manifestations
   - Seasonal or intermittent activities
   - Activities requiring multi-temporal analysis to detect

Consider the technical capabilities of commercial satellite imagery (resolution, spectral bands, revisit frequency) when making classifications.

Format your response as JSON with the exact structure shown below.

Example for a construction company with "Site preparation, Foundation work, Structural installation" operations:
{
  "rssFilter": {
    "definitelyObservable": ["Heavy machinery operation", "Excavation work", "Material stockpiles", "Construction vehicles", "Building structures", "Site boundaries"],
    "maybeObservable": ["Indoor electrical work", "Plumbing installation", "Quality inspections", "Worker presence", "Tool storage"]
  }
}`;

  const userMessage = `Organizational scope: ${orgScope}\nOperations: ${operations}`;

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 1500,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;

    // Parse JSON with error handling
    let parsedContent;
    try {
      parsedContent = JSON.parse(content || '{}');

      // Validate that it has the expected structure
      if (
        !parsedContent.rssFilter ||
        !parsedContent.rssFilter.definitelyObservable ||
        !Array.isArray(parsedContent.rssFilter.definitelyObservable) ||
        !parsedContent.rssFilter.maybeObservable ||
        !Array.isArray(parsedContent.rssFilter.maybeObservable)
      ) {
        throw new Error('Response does not contain expected rssFilter structure');
      }
    } catch (jsonError) {
      // Fallback structure if JSON parsing fails
      parsedContent = {
        rssFilter: {
          definitelyObservable: [],
          maybeObservable: [operations]
        }
      };
    }

    return {
      rssFilter: parsedContent.rssFilter,
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
  const operations = searchParams.get('operations');
  const orgScope = searchParams.get('orgScope');

  if (!operations) {
    return NextResponse.json({ error: 'operations parameter is required' }, { status: 400 });
  }

  if (!orgScope) {
    return NextResponse.json({ error: 'orgScope parameter is required' }, { status: 400 });
  }

  try {
    const result = await generateRSSFilter(operations, orgScope);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('RSS Filtering API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
