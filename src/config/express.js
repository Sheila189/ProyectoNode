const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { personsRouter, usersRouter, authRouter, nb4Router, nb5Router, nb6Router, nb7Router, nb136Router, nb403Router } = require('../modules/controller/routes');

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

app.use((req, res, next) => {
  console.log('Received request:', req.method, req.url);
  next();
});

app.get('/', (req, res) => {
  res.send('Hola, bienvenido a la base de datos de METALINS');
});

// Rutas de la API
app.use('/api/persons', personsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/form/nb4', nb4Router);
app.use('/api/form/nb5', nb5Router);
app.use('/api/form/nb6', nb6Router);
app.use('/api/form/nb7', nb7Router);
app.use('/api/form/nb136', nb136Router);
app.use('/api/form/nb403', nb403Router);

module.exports = { app };

