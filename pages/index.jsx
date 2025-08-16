
import React, { useState } from 'react';
import SITE from '../config/siteConfig';
import Countdown from '../components/Countdown';
import MusicPlayer from '../components/MusicPlayer';
import BankInfo from '../components/BankInfo';
import RSVPForm from '../components/RSVPForm';
import SongsForm from '../components/SongsForm';
import ImagePages from '../components/ImagePages';

export default function Home(){
  const [showBank, setShowBank] = useState(false);

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`;

  return (
    <div>
      {/* Hero section - full viewport */}
      <section className="section-full" style={{background: SITE.colors.pastel1}}>
        <div className="container card">
          <h1 style={{fontSize: SITE.sizes.title}}>{SITE.event.title}</h1>
          <p style={{fontSize: SITE.sizes.body, marginBottom:12}}>{SITE.event.venueName} · {new Date(SITE.event.dateISO).toLocaleString()}</p>
          <Countdown />
          <div style={{marginTop:12}}><MusicPlayer /></div>
        </div>
      </section>

      {/* Image pages loaded dynamically from /public/pages */}
      <ImagePages />

      {/* Location - compact section with map */}
      <section className="section-compact" style={{background: SITE.colors.pastel2}}>
        <div className="container card">
          <h2>Ubicación</h2>
          <div style={{maxWidth:800, margin:'0 auto'}}>
            <iframe title="mapa" src={mapSrc} style={{width:'100%', height:320, border:0, borderRadius:10}} allowFullScreen loading="lazy"></iframe>
          </div>
        </div>
      </section>

      {/* Bank info */}
      <section className="section-compact" style={{background: SITE.colors.pastel3}}>
        <div className="container card">
          <h2>Regalos</h2>
          <p>Si deseás enviar un regalo en efectivo, aquí están los datos:</p>
          <button onClick={()=>setShowBank(s=>!s)} style={{padding:10, borderRadius:8, border:'none', background:SITE.colors.accent, color:'#fff'}}>{showBank? 'Ocultar datos':'Ver datos bancarios'}</button>
          <BankInfo visible={showBank} />
        </div>
      </section>

      {/* Songs suggestions */}
      <section className="section-compact" style={{background: SITE.colors.pastel4}}>
        <div className="container card">
          <h2>Recomendá artistas y canciones</h2>
          <SongsForm />
        </div>
      </section>

      {/* Dress code */}
      <section className="section-compact" style={{background: SITE.colors.pastel1}}>
        <div className="container card">
          <h2>Dress Code</h2>
          <p>{SITE.event.dressCode}</p>
        </div>
      </section>

      {/* RSVP */}
      <section className="section-compact" style={{background: SITE.colors.pastel2}}>
        <div className="container card">
          <h2>Confirmar asistencia</h2>
          <RSVPForm />
        </div>
      </section>

      <footer style={{textAlign:'center', padding:20, color:'#666'}}>
        <small>Personaliza valores iniciales en <code>config/siteConfig.js</code>. Agrega imágenes en <code>public/pages/</code> y el mp3 en <code>public/audio/</code>.</small>
      </footer>
    </div>
  );
}
