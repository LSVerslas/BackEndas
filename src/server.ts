import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();

const port = 3000;


app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
    res.json({ msg: 'server is running' });
});

//Routes

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});