
import React, { useState } from 'react';

export default function SongsForm(){
  const [sending, setSending] = useState(false);

  async function handle(e){
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    setSending(true);
    try{
      await fetch('/api/send-email', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({type:'song', data})});
      alert('Sugerencia enviada. Gracias!'); e.target.reset();
    }catch(err){
      alert('Error al enviar la sugerencia.');
    }finally{ setSending(false); }
  }

  return (
    <form onSubmit={handle} style={{display:'grid', gap:8, maxWidth:520, margin:'0 auto'}}>
      <input name="name" placeholder="Tu nombre" required />
      <input name="artist" placeholder="Artista" required />
      <input name="song" placeholder="Canción" required />
      <button type="submit" disabled={sending} style={{padding:10, borderRadius:8, border:'none', background:'#ffb6c1', color:'#fff'}}>{sending? 'Enviando...':'Enviar sugerencia'}</button>
    </form>
  );
}
