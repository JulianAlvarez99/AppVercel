
import { useEffect, useState, useRef } from 'react';

// --- CONFIGURA AQUI ---
const EVENT_DATE = '2025-11-20T21:00:00'; // Cambiar por la fecha/hora del evento (ISO)
const MAP_EMBED_SRC = 'https://www.google.com/maps?q=Buenos+Aires,+Argentina&output=embed'; // Reemplazar por link embed de Google Maps
const MUSIC_SRC = '/audio/party.mp3'; // O archivo en public/audio/party.mp3 o URL externa
const HOST_BANK_INFO = `Titular: Camila Perez\nCBU: 0000000000000000000000\nAlias: CAMILA.XV`;
// -----------------------

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [showBank, setShowBank] = useState(false);
  const [sending, setSending] = useState(false);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  function getTimeLeft() {
    const diff = new Date(EVENT_DATE) - new Date();
    if (diff <= 0) return null;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    return { d, h, m, s };
  }

  function formatTime(t) {
    if (!t) return '¡Evento en curso o fecha inválida!';
    return `${t.d}d ${pad(t.h)}:${pad(t.m)}:${pad(t.s)}`;
  }

  function pad(n){return String(n).padStart(2,'0');}

  async function handleSongSuggestion(e){
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    setSending(true);
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ type: 'song', data })
    });
    setSending(false);
    if (res.ok) { alert('Sugerencia enviada. Gracias!'); e.target.reset(); }
    else alert('Error al enviar. Revisa la configuración del servidor.');
  }

  async function handleRSVP(e){
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    setSending(true);
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ type: 'rsvp', data })
    });
    setSending(false);
    if (res.ok) { alert('RSVP registrado y correo de confirmación enviado. Gracias!'); e.target.reset(); }
    else alert('No se pudo enviar la confirmación. Verifica variables de entorno.');
  }

  function toggleAudio(){
    if (!audioRef.current) return;
    if (playing){ audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play().catch(()=>{}); setPlaying(true); }
  }

  return (
    <div style={{fontFamily:'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue"', maxWidth:960, margin:'0 auto', padding:20}}>
      <header style={{textAlign:'center', marginBottom:24}}>
        <h1 style={{fontSize:36, margin:6}}>Camila - 15 Años</h1>
        <p style={{margin:6}}>Te esperamos para celebrar este momento especial</p>
        <div style={{fontSize:20, marginTop:12}}>{formatTime(timeLeft)}</div>
        <div style={{marginTop:12}}>
          <button onClick={toggleAudio} style={{padding:'8px 14px', borderRadius:8, cursor:'pointer'}}>{playing? 'Pausar música':'Reproducir música'}</button>
        </div>
      </header>

      <section style={{display:'grid', gap:20, gridTemplateColumns:'1fr'}}>
        <article style={{padding:16, border:'1px solid #eee', borderRadius:8}}>
          <h2>Detalles</h2>
          <p><strong>Fecha:</strong> 20 de noviembre de 2025 · 21:00</p>
          <p><strong>Lugar:</strong> Salon La Fuente — Ver mapa abajo</p>
          <p><strong>Dresscode:</strong> Formal elegante (colores: rosa, dorado). Zapatos cómodos.</p>
        </article>

        <article style={{padding:16, border:'1px solid #eee', borderRadius:8}}>
          <h2>Ubicación</h2>
          <div style={{width:'100%', height:300}}>
            <iframe title="mapa" src={MAP_EMBED_SRC} style={{border:0,width:'100%',height:'100%'}} allowFullScreen loading="lazy"></iframe>
          </div>
        </article>

        <article style={{padding:16, border:'1px solid #eee', borderRadius:8}}>
          <h2>Regalos (transferencia)</h2>
          <p>Si querés colaborar con un regalo en efectivo, podés usar:</p>
          <button onClick={()=>setShowBank(s=>!s)} style={{padding:'8px 12px', borderRadius:8, cursor:'pointer'}}>Ver datos bancarios</button>
          {showBank && (
            <pre style={{whiteSpace:'pre-wrap', background:'#fafafa', padding:10, marginTop:10, borderRadius:6}}>{HOST_BANK_INFO}</pre>
          )}
        </article>

        <article style={{padding:16, border:'1px solid #eee', borderRadius:8}}>
          <h2>Recomendá artistas / canciones</h2>
          <form onSubmit={handleSongSuggestion}>
            <div style={{display:'grid', gap:8}}>
              <input name="name" placeholder="Tu nombre" required />
              <input name="artist" placeholder="Artista" required />
              <input name="song" placeholder="Canción" required />
              <button type="submit" disabled={sending} style={{padding:8, borderRadius:6}}>{sending? 'Enviando...':'Enviar sugerencia'}</button>
            </div>
          </form>
        </article>

        <article style={{padding:16, border:'1px solid #eee', borderRadius:8}}>
          <h2>RSVP - Confirmar asistencia</h2>
          <form onSubmit={handleRSVP}>
            <div style={{display:'grid', gap:8}}>
              <input name="name" placeholder="Nombre completo" required />
              <input name="email" type="email" placeholder="Email" required />
              <input name="guests" type="number" placeholder="Cantidad de acompañantes" min={0} defaultValue={0} />

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

              <button type="submit" disabled={sending} style={{padding:8, borderRadius:6}}>{sending? 'Enviando...':'Confirmar asistencia'}</button>
            </div>
          </form>
        </article>

      </section>

      <footer style={{textAlign:'center', marginTop:24, color:'#666'}}>
        <small>Invitación generada con sistema de demo. Personaliza textos, fecha y datos bancarios.</small>
      </footer>

      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />
    </div>
  );
}
