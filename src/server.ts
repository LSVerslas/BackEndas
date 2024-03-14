import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// import mysql from 'mysql2';
import tripsRouter from './routes/tripRoutes.js';

const app = express();

const port = 3000;

//MIddleware
app.use(morgan('dev'));
app.use(cors());

app.get('/', (_req, res) => {
    res.json({ msg: 'server is running' });
});

//Routes
app.use('/trips', tripsRouter);

// 404
app.use((req, res) => {
 res.status(404).json({ error: 'Server not found', path: req.url });
    
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});