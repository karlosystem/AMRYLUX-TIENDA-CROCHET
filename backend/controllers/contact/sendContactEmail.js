const nodemailer = require('nodemailer');
require('dotenv').config();

const sendContactEmail = async (req, res) => {
  const { nombres, apellidos, email, celular, mensaje } = req.body;

  // Validación básica
  if (!nombres || !apellidos || !email || !celular || !mensaje) {
    return res.status(400).json({
      success: false,
      message: 'Todos los campos son obligatorios'
    });
  }

  try {
    // Configurar transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: process.env.SMTP_USER || process.env.EMAIL_USER,
        pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
      },
    });

    // Verificar conexión
    await transporter.verify();

    // Configurar email
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Donde quieres recibir los mensajes
      subject: `Nuevo mensaje de contacto - ${nombres} ${apellidos}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">
            Nuevo Mensaje de Contacto - AMRY LUXE
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Datos del Cliente:</h3>
            <p><strong>Nombre:</strong> ${nombres} ${apellidos}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Teléfono:</strong> ${celular}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <h3 style="color: #555; margin-top: 0;">Mensaje:</h3>
            <p style="line-height: 1.6; color: #333;">${mensaje}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #888; font-size: 12px;">
            <p>Enviado desde el formulario de contacto de AMRY LUXE</p>
            <p>Fecha: ${new Date().toLocaleString('es-PE')}</p>
          </div>
        </div>
      `,
      replyTo: email,
    };

    // Enviar email
    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Mensaje enviado correctamente',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error al enviar email:', error);
    res.status(500).json({
      success: false,
      message: 'Error al enviar el mensaje. Inténtalo de nuevo.',
      error: error.message
    });
  }
};

module.exports = sendContactEmail;