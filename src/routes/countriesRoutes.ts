// create a countriesRouter
import express from 'express';
import dbQueryWithData from '../helpers/helper.js';

const countriesRouter = express.Router();

/*
CREATE TABLE countries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_main VARCHAR(255) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/

type CountryObjType = {
  id: number;
  name: string;
  description: string;
  image_main: string;
  created_at: string;
};

// GET - /countries/ - texta 'get all countries'
countriesRouter.get('/', async (_req, res) => {
  // panaudoti dbQueryWithData
  const sql = `SELECT id,name FROM countries WHERE is_deleted=0`;
  const [row, error] = (await dbQueryWithData(sql)) as [CountryObjType[], Error];

  if (error) {
    console.warn('get all countries error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  console.log('row ===', row[0]);

  // gauti visus countries objektus masyvo pavidalu
  res.json(row);
});

// - GET /countries/:id - grazinti viena irasa pagal id
countriesRouter.get('/:countryId', async (req, res) => {
  const currentId = req.params.countryId;

  const sql = `SELECT id,name,description,image_main FROM countries WHERE is_deleted=0 AND id=?`;

  const [rows, error] = (await dbQueryWithData(sql, [currentId])) as [CountryObjType[], Error];

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

  const [rows, error] = (await dbQueryWithData(sql, [name, description, image_main])) as [
    CountryObjType[],
    Error,
  ];

  if (error) {
    console.warn('sukurti nauja irasa error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  // console.log('rows ===', rows);

  res.json(rows);
});

export default countriesRouter;