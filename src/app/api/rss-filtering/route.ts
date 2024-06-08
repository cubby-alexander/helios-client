import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const newThread = await openai.beta.threads.create();
  const operations = searchParams.get('operations');
  const orgScope = searchParams.get('orgScope');

  const threadMessages = await openai.beta.threads.messages.create(newThread.id, {
    role: 'user',
    content: `organizational scope: ${orgScope}, operations: ${operations}`
  });

  const run = await openai.beta.threads.runs.createAndPoll(newThread.id, {
    assistant_id: process.env.OPENAI_RSS_FILTERING_ID
  });

  if (run.status === 'completed') {
    const messages = await openai.beta.threads.messages.list(run.thread_id);
    const rawAssistantResponse = JSON.parse(messages.data[0].content[0].text.value);
    return NextResponse.json({ rssFilter: rawAssistantResponse }, { status: 200 });
  } else {
    return NextResponse.json({ error: 'Thread run failed' }, { status: 500 });
  }
}
