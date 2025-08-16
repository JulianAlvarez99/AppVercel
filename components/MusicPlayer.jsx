
import React, { useRef, useState } from 'react';
import SITE from '../config/siteConfig';

export default function MusicPlayer(){
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = async ()=>{
    if (!audioRef.current) return;
    if (playing){ audioRef.current.pause(); setPlaying(false); }
    else { try { await audioRef.current.play(); setPlaying(true); } catch(e){ setPlaying(false); } }
  };

  return (
    <div style={{display:'flex', gap:8, alignItems:'center', justifyContent:'center'}}>
      <button onClick={toggle} style={{padding:'8px 12px', borderRadius:8, border:'none', background:SITE.colors.accent, color:'#fff'}}>{playing? 'Pausar música':'Reproducir música'}</button>
      <audio ref={audioRef} src={SITE.musicFile} loop preload="auto" />
    </div>
  );
}
