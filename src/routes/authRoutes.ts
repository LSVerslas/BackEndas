// sukursim authRouter
import express from 'express';
import bcrypt from 'bcrypt';
import dbQueryWithData from '../helpers/helper.js';
import { ResultSetHeader, QueryError } from 'mysql2';
// import bcrypt from 'bcrypt';
import { UpdateUserObjType, UserObjType } from '../helpers/types.js';

const authRouter = express.Router();

// POST - /auth/register - gausim email ir password
// ir israsysim i users lentele
authRouter.post('/register', async (req, res) => {
  const { name = '', email, password } = req.body;

  const insertSql = `INSERT INTO users (name, email,password) VALUES (?,?,?)`;
  const passwordHash = await bcrypt.hash(password, 10);
  // const passwordHash = ''; // hash password su brcypt
  const [result, insertError] = await dbQueryWithData<ResultSetHeader>(insertSql, [
    name,
    email,
    passwordHash,
  ]);

  if (insertError) {
    const msqlErr = insertError as QueryError;
    console.warn('insert user error ===', insertError);
    console.warn('error ===', insertError.message);

    if (msqlErr.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists' });
    }

    return res.status(400).json({ error: 'something went wrong' });
  }
  if (result.affectedRows === 0) {
    return res.status(400).json({ error: 'user was not created' });
  }
  console.log('name ===', name);
  // grazinti success ir email
  res.json({ success: true, email, name, id: result.insertId });
});

// sukurti useri is fron end

authRouter.post('/login', async (req, res) => {
  // 1. gaunam email ir password
  const { email, password: plainTextPassword } = req.body;

  // 2. surasti ar yra toks email, jei nera pranesti useriui
  const selectSql = `SELECT * FROM users WHERE email = ?`;
  const [users, selectError] = await dbQueryWithData<UserObjType[]>(selectSql, [email]);

  if (selectError) {
    console.warn('select user error ===', selectError);
    return res.status(500).json({ error: 'something went wrong' });
  }

  if (users.length === 0) {
    return res.status(400).json({ error: 'User does not exist' });
  }

  // 3. jei yra. jau turim gave userObj ziurim ar sutampa slaptazodziai?
  const userObj = users[0];
  // const arSutampaSlaptazodziai = bcrypt.compare(myPlaintextPassword, hash)
  const arSutampaSlaptazodziai = await bcrypt.compare(plainTextPassword, userObj.password);
  if (!arSutampaSlaptazodziai) {
    return res.status(400).json({ error: 'Email or password is incorrect (p)' });
  }
  // 3.1 tikrinti su bcrypt ar sutampa sifras su duotu slaptazodziu

  // 4. jei nesutampa - pranesam kad email arba pass netinka

  // 5. jei sutampa - 200, success yra true, email ir name to userio kuris prisiregistravo
  res.json({ success: true, email: userObj.email, name: userObj.name, id: userObj.id });
});

// password/user update
// PUT /auth/user/update/:userId

authRouter.put('/user/update/:userId', async (req, res) => {
  // pasiimiti user id
  const { userId } = req.params;
  // pasiimti password ir currentPassword is req body
  const { email, password: newPassword, name, currentPassword } = req.body as UpdateUserObjType;
  console.log('req.body ===', req.body);

  // step1 - login
  // surasti user pgl id
  const selectSql = `SELECT * FROM users WHERE id = ?`;
  const [users, selectError] = await dbQueryWithData<UserObjType[]>(selectSql, [userId]);

  if (selectError) {
    console.warn('password/user update ===', selectError);
    return res.status(500).json({ error: 'something went wrong' });
  }

  if (users.length === 0) {
    return res.status(400).json({ error: 'User does not exist' });
  }

  // 3. jei yra. jau turim gave userObj ziurim ar sutampa slaptazodziai?
  const userObj = users[0];
  console.log('userObj ===', userObj);
  // patikrinti slaptazodziai
  // lyginam req.body.currentPassword(plain) su userObj.password(hash)
  const arSutampaSlaptazodziai = await bcrypt.compare(currentPassword.toString(), userObj.password);
  if (!arSutampaSlaptazodziai) {
    return res
      .status(400)
      .json({ code: 'pass', error: 'Email or password is incorrect (p current pass)' });
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  //nustato user su id userId slaptazodi i passwordHash
  const sql = `UPDATE users SET password = ? WHERE id = ?`;
  const [result, insertError] = await dbQueryWithData<ResultSetHeader>(sql, [passwordHash, userId]);
  // jei sutampa register logic
  if (insertError) {
    console.warn('password/user update ===', insertError);
    return res.status(500).json({ error: 'something went wrong' });
  }

  if (result.affectedRows === 0) {
    return res.status(400).json('Nothing changed');
  }

  res.json({ success: true });
});

export default authRouter;