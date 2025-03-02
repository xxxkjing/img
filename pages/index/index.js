// pages/index/index.js
import '../public/global.css';
import './style.css';

export default function Home() {
  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/proxy', { method: 'POST', body: formData });
    return res.json();
  };

  return (
    <div className="container">
      <input type="file" onChange={(e) => handleUpload(e.target.files)} />
    </div>
  );
}
