const { exec } = require('child_process');
const path = require('path');
const querystring = require('querystring');

export default function handler(req, res) {
  const scriptPath = path.join(process.cwd(), 'src/app/services/mece-org.py');

  const userMessage = decodeURIComponent(req.query.userMessage);

  exec(
    `python3 ${scriptPath} "${userMessage}" ${process.env.OPENAI_MECE_ORG_OPS_ID}`,
    (error, stdout, stderr) => {
      if (error) {
        res.status(500).json({ message: `exec error: ${error.message}` });
        return;
      }
      if (stderr) {
        res.status(500).json({ message: stderr });
        return;
      }
      try {
        const output = JSON.parse(stdout);
        res.status(200).json(output);
      } catch (parseError) {
        res.status(500).json({ message: `JSON parse error: ${parseError.message}` });
      }
    }
  );
}
