
import React, { useState } from 'react';

export default function RSVPForm(){ 
  const [sending, setSending] = useState(false);

  async function handle(e){
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    setSending(true);
    try{
      const res = await fetch('/api/send-email', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({type:'rsvp', data})});
      if (!res.ok) throw new Error('Error en servidor');
      alert('Confirmación enviada. Gracias!');
      e.target.reset();
    }catch(err){
      alert('No se pudo enviar. Revisa la configuración.');
    }finally{ setSending(false); }
  }

  return (
    <form onSubmit={handle} style={{display:'grid', gap:8, maxWidth:520, margin:'0 auto'}}>
      <input name="name" placeholder="Nombre completo" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="guests" type="number" placeholder="Cantidad de acompañantes" min="0" defaultValue="0" />
      <label>Restricción alimentaria</label>
      <select name="diet" defaultValue="none">
        <option value="none">Ninguna</option>
        <option value="vegetarian">Vegetariano</option>
        <option value="vegan">Vegano</option>
        <option value="gluten_free">Sin gluten</option>
        <option value="dairy_free">Sin lácteos</option>
        <option value="nuts">Alergia a frutos secos</option>
        <option value="other">Otra (especificar)</option>
      </select>
      <input name="diet_detail" placeholder="Si elegiste 'Otra', especifica" />
      <button type="submit" disabled={sending} style={{padding:10, borderRadius:8, border:'none', background:'#ffb6c1', color:'#fff'}}>{sending? 'Enviando...':'Confirmar asistencia'}</button>
    </form>
  );
}
