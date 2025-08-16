
import fs from 'fs';
import path from 'path';

export default function handler(req, res){
  try{
    const dir = path.join(process.cwd(), 'public', 'pages');
    if (!fs.existsSync(dir)) return res.status(200).json({ files: [] });
    const files = fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f)).map(f => '/pages/' + f);
    return res.status(200).json({ files });
  }catch(err){
    console.error(err);
    return res.status(500).json({ error: String(err) });
  }
}
