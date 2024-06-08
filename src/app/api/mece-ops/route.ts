import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const openai = new OpenAI();
  const { searchParams } = new URL(req.url);
  const majorOperation = searchParams.get('majorOperation');
  const orgScope = searchParams.get('orgScope');

  const newThread = await openai.beta.threads.create();

  const threadMessages = await openai.beta.threads.messages.create(newThread.id, {
    role: 'user',
    content: `organizational scope: ${orgScope}, major operation: ${majorOperation}`
  });

  const run = await openai.beta.threads.runs.createAndPoll(newThread.id, {
    assistant_id: process.env.OPENAI_MECE_OPS_ACTIVITY_ID
  });

  if (run.status === 'completed') {
    const messages = await openai.beta.threads.messages.list(run.thread_id);
    return NextResponse.json(messages, { status: 200 });
  } else {
    return NextResponse.json({ error: 'Thread run failed' }, { status: 500 });
  }
}
