const { exec } = require('child_process');
const path = require('path');
const querystring = require('querystring');

export default function handler(req, res) {
  const scriptPath = path.join(process.cwd(), 'src/app/services/mece-org.py');

  const userMessage = decodeURIComponent(req.query.userMessage);

  exec(`python3 ${scriptPath} "${userMessage}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    if (stderr) {
      res.status(500).json({ message: stderr });
      return;
    }
    res.status(200).json({ message: stdout });
  });
}
