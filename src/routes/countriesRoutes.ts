// create a countriesRouter
import express from 'express';
import dbQueryWithData from '../helpers/helper.js';
import { ResultSetHeader } from 'mysql2';
import { CountryObjType } from '../helpers/types.js';

const countriesRouter = express.Router();

// GET - /countries/ - texta 'get all countries'
countriesRouter.get('/', async (_req, res) => {
  // panaudoti dbQueryWithData
  const sql = `SELECT id,name,description,image_main FROM countries WHERE is_deleted=0`;
  const [row, error] = await dbQueryWithData<CountryObjType[]>(sql);

  if (error) {
    console.warn('get all countries error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  // gauti visus countries objektus masyvo pavidalu
  res.json(row);
});

// - GET /countries/:id - grazinti viena irasa pagal id
countriesRouter.get('/:countryId', async (req, res) => {
  const currentId = req.params.countryId;

  const sql = `SELECT id,name,description,image_main FROM countries WHERE is_deleted=0 AND id=?`;

  const [rows, error] = await dbQueryWithData<CountryObjType[]>(sql, [currentId]);

  if (error) {
    console.warn('grazinti viena irasa pagal id error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  // nuspresti ar radom irasa ar 404

  if (rows.length === 0) {
    console.log('no rows');
    return res.status(404).json({ msg: `country with id: '${currentId}' was not found` });
  }

  // console.log('rows ===', rows);

  res.json(rows[0]);
});

// - POST /countries - sukurti nauja irasa
countriesRouter.post('/', async (req, res) => {
  const { name, description, image_main } = req.body;

  const sql = `INSERT INTO countries (name, description, image_main) VALUES (?,?,?)`;

  const [rows, error] = await dbQueryWithData<ResultSetHeader>(sql, [
    name,
    description,
    image_main,
  ]);

  if (error) {
    console.warn('sukurti nauja irasa error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  // console.log('rows ===', rows);

  res.json({ id: rows.insertId, name, description, image_main });
});

export default countriesRouter;