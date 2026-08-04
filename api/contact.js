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

    const brevoApiKey = process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      return res.status(500).json({ success: false, message: 'La clé d\'API Brevo n\'est pas configurée.' });
    }

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
          <div class='header'>Nouveau contact depuis le site DevSupAi (Vercel)</div>
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

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Contact DevSupAi', email: 'contact@devsupai.fr' },
        to: [{ email: 'contact@devsupai.fr', name: 'DevSupAi Team' }],
        replyTo: { email: email, name: name },
        subject: `[DevSupAi] Nouveau message de contact - ${name}`,
        htmlContent: htmlContent,
      }),
    });

    const responseData = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true, message: 'Message envoyé avec succès.' });
    } else {
      return res.status(response.status).json({
        success: false,
        message: responseData.message || 'Une erreur est survenue lors de l\'envoi via Brevo.',
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
  }
}
