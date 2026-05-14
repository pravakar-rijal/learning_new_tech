const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const os = require('os');

const app = express();
app.use(express.raw({ type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', limit: '20mb' })); // Accept Word files

// Detect LibreOffice path
function getLibreOfficeCommand() {
  const platform = os.platform();
  if (platform === 'win32') {
    const programFiles = process.env['PROGRAMFILES'] || 'C:\\Program Files';
    return `"${path.join(programFiles, 'LibreOffice', 'program', 'soffice.exe')}"`;
  } else if (platform === 'darwin') {
    return '/Applications/LibreOffice.app/Contents/MacOS/soffice';
  }
  return 'libreoffice';
}

const libreOfficeCommand = getLibreOfficeCommand();

app.post('/convert', async (req, res) => {
  const tempDir = path.resolve('uploads');
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

  const inputPath = path.join(tempDir, `upload-${Date.now()}.docx`);
  const outputPath = inputPath.replace(/\.docx$/, '.pdf');

  // Save the incoming file
  fs.writeFileSync(inputPath, req.body);

  const command = `${libreOfficeCommand} --headless --convert-to pdf --outdir "${tempDir}" "${inputPath}"`;
  exec(command, (error) => {
    if (error) {
      console.error('Conversion error:', error);
      fs.unlinkSync(inputPath);
      return res.status(500).json({ error: 'Failed to convert file' });
    }

    fs.readFile(outputPath, (err, data) => {
      if (err) {
        console.error('Error reading PDF:', err);
        return res.status(500).json({ error: 'Failed to read converted file' });
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="converted.pdf"');
      res.send(data);

      // Cleanup
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
