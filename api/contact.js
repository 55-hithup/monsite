import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée.' });
  }

  try {
    const { name, email, phone, projectType, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Veuillez remplir tous les champs obligatoires.' });
    }

    // Configuration variables from Vercel Environment Settings
    const smtpHost = process.env.ZIMBRA_SMTP_HOST || 'smtpng.dfinet.ch';
    const smtpPort = parseInt(process.env.ZIMBRA_SMTP_PORT || '465', 10);
    const zimbraEmail = process.env.ZIMBRA_EMAIL || 'contact@devsupai.fr';
    const zimbraPassword = process.env.ZIMBRA_PASSWORD;

    if (!zimbraPassword) {
      return res.status(500).json({
        success: false,
        message: 'La variable d\'environnement ZIMBRA_PASSWORD n\'est pas configurée sur Vercel.',
      });
    }

    // Create the Nodemailer SMTP transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for port 465, false for other ports (like 587)
      auth: {
        user: zimbraEmail,
        pass: zimbraPassword,
      },
      tls: {
        // Do not fail on invalid / self-signed certificates
        rejectUnauthorized: false
      }
    });

    // Construct HTML email content
    const htmlContent = `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px; }
          .header { font-size: 18px; font-weight: bold; border-bottom: 2px solid #2E8FE0; padding-bottom: 10px; margin-bottom: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #7A7F94; font-size: 12px; text-transform: uppercase; }
          .value { font-size: 15px; margin-top: 5px; }
          .message-box { background: #f9f9f9; padding: 15px; border-left: 4px solid #2E8FE0; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class='container'>
          <div class='header'>Nouveau contact depuis le site DevSupAi (Zimbra SMTP)</div>
          <div class='field'>
            <div class='label'>Nom :</div>
            <div class='value'>${name}</div>
          </div>
          <div class='field'>
            <div class='label'>Email :</div>
            <div class='value'><a href='mailto:${email}'>${email}</a></div>
          </div>
          <div class='field'>
            <div class='label'>Téléphone :</div>
            <div class='value'>${phone || 'non spécifié'}</div>
          </div>
          <div class='field'>
            <div class='label'>Type de projet :</div>
            <div class='value'>${projectType}</div>
          </div>
          <div class='field'>
            <div class='label'>Message :</div>
            <div class='message-box'>${message.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send the email
    await transporter.sendMail({
      from: `"Contact DevSupAi" <${zimbraEmail}>`,
      to: zimbraEmail,
      replyTo: `"${name}" <${email}>`,
      subject: `[DevSupAi] Nouveau message de contact - ${name}`,
      html: htmlContent,
    });

    return res.status(200).json({ success: true, message: 'Message envoyé avec succès.' });

  } catch (error) {
    console.error('SMTP Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de l\'envoi de l\'email via le serveur SMTP.',
      debug: error.message,
    });
  }
}
