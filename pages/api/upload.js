// pages/api/upload.js
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const config = {
  api: {
    bodyParser: false, // 禁用 Next.js 默认的 bodyParser
  },
};

const handler = (req, res) => {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).json({ message: '上传失败' });
        return;
      }

      const uploadedFile = files.file[0];
      const filePath = `/uploads/${uploadedFile.newFilename}`;
      res.status(200).json({ filePath });
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
