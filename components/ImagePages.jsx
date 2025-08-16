
import React, { useEffect, useState } from 'react';

export default function ImagePages(){
  const [images, setImages] = useState([]);

  useEffect(()=>{
    async function load(){ 
      try{
        const res = await fetch('/api/list-pages');
        const js = await res.json();
        setImages(js.files || []);
      }catch(e){ setImages([]); }
    }
    load();
  },[]);

  if (!images.length) return null;

  return (
    <div>
      {images.map((img,i)=>(
        <section key={i} style={{height:'100vh', backgroundImage:`url(${img})`, backgroundSize:'cover', backgroundPosition:'center'}} aria-label={`pagina-${i}`} />
      ))}
    </div>
  );
}
