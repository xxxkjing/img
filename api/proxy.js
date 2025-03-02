// api/proxy.js
export default async (req, res) => {
    const upstreamUrl = 'https://telegra.ph/upload';
    const imageRes = await fetch(upstreamUrl, {
      method: 'POST',
      body: req.body,
      headers: { 'Referer': 'https://telegra.ph/' }
    });
    
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    imageRes.body.pipe(res);
  };
  