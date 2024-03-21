// sukursim authRouter
import express from 'express';
import dbQueryWithData from '../helpers/helper.js';
import { ResultSetHeader } from 'mysql2';

const authRouter = express.Router();

// POST - /auth/register - gausim email ir password
// ir israsysim i users lentele
authRouter.post('/register', async (req, res) => {
  const { name = '', email, password } = req.body;

  const insertSql = `INSERT INTO users (name, email,password) VALUES (?,?,?)`;
  const passwordHash = ''; // hash password su brcypt
  const [result, insertError] = (await dbQueryWithData(insertSql, [name, email, password])) as [
    ResultSetHeader,
    Error,
  ];

  if (insertError) {
    console.warn('insert user error ===', insertError);
    console.warn('error ===', insertError.message);

    if (insertError?.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists' });
    }

    return res.status(400).json({ error: 'something went wrong' });
  }
  if (result.affectedRows === 0) {
    return res.status(400).json({ error: 'user was not created' });
  }

  // grazinti success ir email
  res.json({ success: true, email });
});

// sukurti useri is fron end

authRouter.post('/login', async (req, res) => {
  // 1. gaunam email ir password

  // 2. surasti ar yra toks email, jei nera pranesti useriui

  // 3. jei yra. jau turim gave userObj ziurim ar sutampa slaptazodziai?
  // 3.1 tikrinti su bcrypt ar sutampa sifras su duotu slaptazodziu

  // 4. jei nesutampa - pranesam kad email arba pass netinka

  // 5. jei sutampa - 200, success yra true, email ir name to userio kuris prisiregistravo

  res.json('login route');
});

export default authRouter;