import { NextRequest, NextResponse } from 'next/server';
import { ExecException } from 'child_process';
import { MeceOrgResponse } from '../api-types';
const { exec } = require('child_process');
const path = require('path');

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userMessage = searchParams.get('userMessage');
  const scriptPath = path.join?.(process.cwd(), 'src/app/services/mece-org.py');

  try {
    const result: MeceOrgResponse = await new Promise<MeceOrgResponse>((resolve, reject) => {
      exec(
        `python3 ${scriptPath} "${userMessage}" ${process.env.OPENAI_MECE_ORG_OPS_ID}`,
        (error: ExecException | null, stdout: string, stderr: string) => {
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
            const errorMessage = (parseError as Error).message;
            reject({ message: errorMessage, status: 500 });
          }
        }
      );
    });

    const responseInit: ResponseInit = { status: result.status };
    return NextResponse.json(result.output, responseInit);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 } as ResponseInit);
  }
}
