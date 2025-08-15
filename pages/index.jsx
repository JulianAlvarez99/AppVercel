import { useState, useEffect } from 'react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showBankInfo, setShowBankInfo] = useState(false);

  useEffect(() => {
    const targetDate = new Date("2025-10-10T00:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#fff" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap');
        body {
          margin: 0;
          padding: 0;
        }
        section {
          padding: 50px 20px;
          text-align: center;
        }
        h1, h2 {
          font-family: 'Playfair Display', serif;
          margin-bottom: 20px;
        }
        .pastel1 { background-color: #FFF5E1; }
        .pastel2 { background-color: #FFE6EB; }
        .pastel3 { background-color: #FFD6C2; }
        .pastel4 { background-color: #FDE2E4; }
        .countdown {
          font-size: 1.5rem;
          font-weight: bold;
        }
        iframe {
          width: 100%;
          height: 300px;
          border: none;
          border-radius: 10px;
        }
        input, select, textarea, button {
          padding: 10px;
          margin: 5px 0;
          width: 100%;
          max-width: 400px;
        }
        button {
          background-color: #ffb6c1;
          border: none;
          color: white;
          cursor: pointer;
        }
      `}</style>

      <section className="pastel1">
        <h1>Mis 15 Años</h1>
        <div className="countdown">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
      </section>

      <section className="pastel2">
        <h2>Ubicación</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13134.707786536902!2d-57.5575414!3d-38.0054779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584d94ebca3a7c3%3A0x7d2f3a3e3e3b71c3!2sMar%20del%20Plata%2C%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1691787777777!5m2!1ses!2sar"
          allowFullScreen=""
          loading="lazy">
        </iframe>
      </section>

      <section className="pastel3">
        <h2>Regalo</h2>
        <button onClick={() => setShowBankInfo(!showBankInfo)}>Ver información bancaria</button>
        {showBankInfo && <p>CBU: 0000000000000000000000</p>}
      </section>

      <section className="pastel4">
        <h2>Recomienda artistas y canciones</h2>
        <form>
          <input type="text" placeholder="Tu nombre" required />
          <textarea placeholder="Artista/canción" required></textarea>
          <button type="submit">Enviar</button>
        </form>
      </section>

      <section className="pastel1">
        <h2>Dress Code</h2>
        <p>Elegante, colores claros o pastel</p>
      </section>

      <section className="pastel2">
        <h2>Confirmar asistencia</h2>
        <form>
          <input type="text" placeholder="Nombre completo" required />
          <input type="email" placeholder="Tu email" required />
          <select>
            <option value="">¿Restricción alimentaria?</option>
            <option value="ninguna">Ninguna</option>
            <option value="vegetariano">Vegetariano</option>
            <option value="vegano">Vegano</option>
            <option value="celiaco">Celíaco</option>
          </select>
          <button type="submit">Confirmar</button>
        </form>
      </section>
    </div>
  );
}
