// pages/index.js

import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.filePath) {
      setImageUrl(data.filePath);
    } else {
      alert("上传失败");
    }
  };

  return (
    <div>
      <h1>图床项目</h1>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>上传</button>

      {imageUrl && (
        <div>
          <p>上传成功！</p>
          <img src={imageUrl} alt="Uploaded Image" width="300" />
        </div>
      )}
    </div>
  );
}
