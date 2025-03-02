// pages/index.js (直接映射到根路径)
import Head from 'next/head';
import '../public/global.css';

export default function Home() {
  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/proxy', { method: 'POST', body: formData });
    return await res.json();
  };

  return (
    <div className="container">
      <input type="file" onChange={(e) => handleUpload(e.target.files)} />
    </div>
  );
}
