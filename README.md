
Invitacion XV - Modular
-----------------------
Estructura modular con:
- config/siteConfig.js: variables editables (colores, fuentes, tamaños, fecha, bank, host email, etc.)
- components/: componentes React por sección
- pages/api/list-pages.js: devuelve lista de imágenes en /public/pages para levantarlas dinámicamente
- pages/api/send-email.js: endpoint para enviar emails (nodemailer)
- public/pages/: carpeta donde pones imágenes que serán mostradas como 'páginas' (sin tocar código)
- public/audio/: carpeta para el archivo mp3 (party.mp3)

Cómo usar:
1. Reemplaza valores en config/siteConfig.js
2. Coloca imágenes en public/pages/ (jpg/png/webp) y un archivo party.mp3 en public/audio/
3. Instala dependencias: npm install
4. Levanta local: npm run dev
5. Despliega a Vercel: conecta repo o usa vercel cli

Notas:
- El API que lista imágenes usa fs.readdirSync sobre public/pages; en Vercel funciona con archivos incluidos en el repo.
- Para envío de mails configura variables de entorno en Vercel: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, HOST_EMAIL
