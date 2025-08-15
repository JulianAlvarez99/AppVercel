
# Invitación XV - Next.js (lista para desplegar en Vercel)

## Qué incluye
- `pages/index.jsx` -> Página principal con cuenta regresiva, mapa embebido, botón para ver datos bancarios, formulario de sugerencias de canciones, formulario RSVP (envía confirmación por mail), selección de restricciones alimentarias y control de música.
- `pages/api/send-email.js` -> Endpoint serverless que usa nodemailer para enviar los correos al anfitrión y confirmación al invitado.
- `public/audio/` -> carpeta vacía para agregar tu archivo de música `party.mp3` si lo deseas.

## Antes de desplegar (obligatorio)
Reemplaza en `pages/index.jsx` las constantes de configuración:
- `EVENT_DATE` -> fecha y hora del evento en formato ISO (`YYYY-MM-DDTHH:MM:SS`)
- `MAP_EMBED_SRC` -> URL embed de Google Maps para la ubicación
- `HOST_BANK_INFO` -> datos bancarios reales
- `MUSIC_SRC` -> ruta a `public/audio/party.mp3` o URL externa

## Variables de entorno (Vercel - Project > Settings > Environment Variables)
Configura estas variables en Vercel:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `HOST_EMAIL`

> Nota: Para usar Gmail como SMTP debes generar un App Password (si tu cuenta tiene 2FA).

## Desplegar (opciones)
### Opción A — subir a GitHub y conectar a Vercel (recomendado)
1. Inicializa git y sube al repo:
```bash
cd invitacion-xv-vercel
git init
git add .
git commit -m "Initial commit - Invitacion XV"
# crea el repo en GitHub y luego:
git remote add origin git@github.com:TU_USUARIO/TU_REPO.git
git branch -M main
git push -u origin main
```
2. En Vercel, **Import Project** > conecta tu cuenta de GitHub > selecciona el repo > Deploy.
3. En Vercel, agrega las Environment Variables listadas arriba y redeploy.

### Opción B — usar Vercel CLI (si prefieres no usar GitHub)
1. Instala Vercel CLI:
```bash
npm i -g vercel
```
2. Desde la carpeta del proyecto:
```bash
vercel login
vercel
# Sigue el asistente; cuando pida añadir variables de entorno, puedes hacerlo en dashboard.v
```

## Probar localmente
1. Copia variables a `.env.local`:
```
SMTP_HOST=smtp.tudominio.com
SMTP_PORT=587
SMTP_USER=usuario@dominio.com
SMTP_PASS=contraseña
HOST_EMAIL=anfitrion@dominio.com
```
2. Instala dependencias:
```bash
npm install
npm run dev
```

## Limitaciones
- No puedo conectarme a tu cuenta de GitHub o Vercel por seguridad. Te entrego todo listo para que lo subas y despliegues en 2-5 minutos siguiendo los pasos anteriores.
- Si prefieres, puedo darte los comandos exactos (y un script shell) para crear el repo en GitHub usando `gh` (GitHub CLI) si me confirmas que lo usarás. No ejecuto nada en tu cuenta.

