
import React, { useEffect, useState } from 'react';
import SITE from '../config/siteConfig';

export default function Countdown(){ 
  const target = new Date(SITE.event.dateISO);
  const [time, setTime] = useState(getTimeObj());

  useEffect(()=>{
    const t = setInterval(()=> setTime(getTimeObj()), 1000);
    return ()=> clearInterval(t);
  }, []);

  function getTimeObj(){
    const diff = target - new Date();
    if (diff <= 0) return null;
    const d = Math.floor(diff / (1000*60*60*24));
    const h = Math.floor((diff / (1000*60*60)) % 24);
    const m = Math.floor((diff / (1000*60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    return { d, h, m, s };
  }

  if (!time) return <div style={{fontSize: SITE.sizes.subtitle}}>¡El evento está ocurriendo o la fecha es inválida!</div>;

  return (
    <div style={{fontSize: SITE.sizes.subtitle, fontWeight:600}}>
      {time.d}d {String(time.h).padStart(2,'0')}:{String(time.m).padStart(2,'0')}:{String(time.s).padStart(2,'0')}
    </div>
  );
}
