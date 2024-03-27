import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import tripsRouter from './routes/tripRoutes.js';
import { PORT } from './config.js';
import testConnection from './helpers/msqlTestRoute.js';
import countriesRouter from './routes/countriesRoutes.js';
import authRouter from './routes/authRoutes.js';
import usersRouter from './routes/usersRoutes.js';

const app = express();

const port = PORT || 5000;

// atsikopijuoti test funkcija prisijungimui prie db
testConnection();

// MIddleware
app.use(morgan('dev'));
app.use(cors());
// leisti gauti duomenis json formatu
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ msg: 'server is running' });
});

// Routes
app.use('/auth', authRouter);
app.use('/trips', tripsRouter);
app.use('/countries', countriesRouter);
app.use('/users', usersRouter);

// 404

app.use((req, res) => {
  res.status(404).json({ error: 'Path not found', path: req.url });
});

app.listen(port, () => {
  console.log(`Server runing on http://localhost:${port}`);
});