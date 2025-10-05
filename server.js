const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public'))); // Cambia 'public' por la carpeta donde está tu index.html

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Configuración de CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'germandovich@gmail.com',
      pass: 'ylom tbzu bmif exet'
    }
  });

  let mailOptions = {
    from: email,
    to: 'germandovich@gmail.com',
    subject: 'Nuevo mensaje de contacto',
    text: `Nombre: ${name}\nEmail: ${email}\nMensaje:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Mensaje enviado');
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
    res.status(500).send('Error al enviar el mensaje');
  }
});

app.listen(3000, () => {
  console.log('Servidor iniciado en puerto 3000');
});