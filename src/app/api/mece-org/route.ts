import { NextRequest, NextResponse } from 'next/server';
const { exec } = require('child_process');
const path = require('path');

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userMessage = searchParams.get('userMessage');
  const scriptPath = path.join?.(process.cwd(), 'src/app/services/mece-org.py');

  try {
    const result = await new Promise((resolve, reject) => {
      exec(
        `python3 ${scriptPath} "${userMessage}" ${process.env.OPENAI_MECE_ORG_OPS_ID}`,
        (error, stdout, stderr) => {
          if (error) {
            reject({ message: error.message, status: 500 });
          }
          if (stderr) {
            reject({ message: stderr, status: 500 });
          }
          try {
            const output = JSON.parse(stdout);
            resolve({ output, status: 200 });
          } catch (parseError) {
            reject({ message: parseError.message, status: 500 });
          }
        }
      );
    });

    return NextResponse.json(result.output, { status: result.status });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
}
