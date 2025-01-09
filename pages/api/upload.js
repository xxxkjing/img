// pages/api/upload.js

import multer from "multer";
import nextConnect from "next-connect";
import fs from "fs";
import path from "path";

// 设置存储位置和文件名
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.resolve("./public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 使用 next-connect 来处理多步请求
const handler = nextConnect();

handler.use(upload.single("image")); // 只接受一个文件，并命名为 "image"

handler.post((req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // 返回上传的文件的相对路径
  return res.status(200).json({
    message: "File uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
  });
});

export default handler;
