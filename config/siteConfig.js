
/*
  Archivo de configuración editable.
  Cambia aquí TODAS las variables del sitio: colores, fuentes, tamaños, datos del evento, datos bancarios, etc.
*/
const SITE = {
  // Diseño y paleta (colores pastel crema/rosa)
  colors: {
    background: '#FFFFFF',
    pastel1: '#FFF5E1',
    pastel2: '#FFE6EB',
    pastel3: '#FFD6C2',
    pastel4: '#FDE2E4',
    accent: '#FFB6C1',
    text: '#333333'
  },

  // Tipografías y tamaños
  fonts: {
    title: "Playfair Display, serif",
    body: "Poppins, sans-serif"
  },
  sizes: {
    title: '2.2rem',      // títulos principales
    subtitle: '1.25rem',  // subtítulos
    body: '1rem'          // texto normal
  },

  // Información del evento
  event: {
    title: 'Oriana - 15 Años',
    dateISO: '2025-11-20T21:00:00', // formato ISO a editar
    venueName: 'Salón La Fuente',
    dressCode: 'Elegante'
  },

  // Datos bancarios - editable
  bank: {
    holder: 'Ori Sapienza',
    cbu: '0000000000000000000000',
    alias: 'MIS.XV'
  },

  // Mail al que llegan las confirmaciones y sugerencias
  hostEmail: 'anfitrion@dominio.com',

  // Música - archivo dentro de public/audio/party.mp3
  musicFile: '/audio/Paco Amoroso - Viuda Negra (Video oficial).mp3',

  // Map - ciudad base (puedes cambiar la query)
  mapQuery: 'Mar del Plata, Buenos Aires, Argentina'
};

export default SITE;
