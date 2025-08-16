
import nodemailer from 'nodemailer';

export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).end();
  try{
    const { type, data } = req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const hostMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.HOST_EMAIL,
      subject: `[Invitación XV] Nueva ${type === 'rsvp' ? 'confirmación' : 'sugerencia'}`,
      text: `${type} - ${JSON.stringify(data, null, 2)}`
    };

    await transporter.sendMail(hostMailOptions);

    if (type === 'rsvp' && data?.email){
      const guestMailOptions = {
        from: process.env.SMTP_USER,
        to: data.email,
        subject: 'Confirmación de asistencia - Invitación XV',
        text: `Hola ${data.name || ''},\n\nHemos recibido tu confirmación.\nDetalles:\n${JSON.stringify(data, null, 2)}`
      };
      await transporter.sendMail(guestMailOptions);
    }

    return res.status(200).json({ ok:true });
  }catch(err){
    console.error(err);
    return res.status(500).json({ error: String(err) });
  }
}
