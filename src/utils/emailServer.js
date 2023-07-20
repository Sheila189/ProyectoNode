const nodemailer = require('nodemailer');

// Configuración del transportador de correo
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'metalinstsadecv@gmail.com',
    pass: 'MET220709G21',
  },
});

module.exports = transporter;
