// sukurti ir exportuoti routeri
import express from 'express';
import dbQueryWithData from '../helpers/helper.js';
import { TripObjType } from '../helpers/types.js';
import { ResultSetHeader } from 'mysql2';
import { checkTripBody } from '../middleware/middleware.js';

const tripsRouter = express.Router();

// const fields = [
//   'id','name','date','country','city','rating','description','price','user_id',
// ];
const tripCols = 'id,name,date,country,city,rating,description,price,user_id,image_main';

// GET - /trips/ - texta 'get all trips'
tripsRouter.get('/', async (_req, res) => {
  // panaudoti dbQueryWithData
  const sql = `SELECT ${tripCols} FROM trips WHERE is_deleted=0`;
  const [row, error] = (await dbQueryWithData(sql)) as [TripObjType[], Error];

  if (error) {
    console.warn('get all trips error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  console.log('row ===', row[0]);

  // gauti visus trips objektus masyvo pavidalu
  res.json(row);
});

// Get - trips/cities - grazinti visus unikalius miestus
tripsRouter.get('/cities', async (_req, res) => {
  const sql = `SELECT DISTINCT city FROM trips WHERE is_deleted=0`;
  const [row, error] = (await dbQueryWithData(sql)) as [TripObjType[], Error];

  if (error) {
    console.warn('get all cities error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  // gauti visus trips objektus masyvo pavidalu
  res.json(row);
});

// GET /trips/countries - grazinti visas unikalias salis
tripsRouter.get('/countries', async (_req, res) => {
  const sql = `SELECT DISTINCT country FROM trips WHERE is_deleted=0`;
  const [row, error] = (await dbQueryWithData(sql)) as [TripObjType[], Error];

  if (error) {
    console.warn('get all countries error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  // gauti visus trips objektus masyvo pavidalu
  res.json(row);
});

// GET /trips/filter?country=uk
tripsRouter.get('/filter', async (req, res) => {
  // kur gyvena ?country
  const countryVal = req.query.country?.toString();
  const cityVal = req.query.city?.toString();
  const rating = req.query.rating?.toString();

  // if (!countryVal && !cityVal && !rating) return res.status(400).json('no country/city given');

  // kreiptis i duomenu base ir pariusti tik tos salies objektus
  let sql = `SELECT ${tripCols} FROM trips WHERE is_deleted=0`;
  let argArr = [];

  if (countryVal) {
    sql += ` AND country = ?`;
    argArr.push(countryVal);
  }

  if (cityVal) {
    sql += ` AND city = ?`;
    argArr.push(cityVal);
  }

  if (rating) {
    sql += ` AND rating >= ?`;
    argArr.push(rating);
  }

  // prideti rating

  // const sql = `SELECT ${tripCols} FROM trips WHERE is_deleted=0 AND country = ? AND city = ?`;
  // const sql = `SELECT ${tripCols} FROM trips WHERE is_deleted=0 AND country = ? AND city = ? AND raing ? ?`;
  const [row, error] = (await dbQueryWithData(sql, argArr)) as [TripObjType[], Error];

  if (error) {
    console.warn('get all trips error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  // console.log('row ===', row[0]);

  // gauti visus trips objektus masyvo pavidalu
  res.json(row);

  // res.json(countryVal);
});

// - GET /trips/:id - grazinti viena irasa pagal id
tripsRouter.get('/:tripId', async (req, res) => {
  const currentId = req.params.tripId;

  const sql = `SELECT ${tripCols} FROM trips WHERE is_deleted=0 AND id=?`;

  const [rows, error] = (await dbQueryWithData(sql, [currentId])) as [TripObjType[], Error];

  if (error) {
    console.warn('grazinti viena irasa pagal id error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  // nuspresti ar radom irasa ar 404

  if (rows.length === 0) {
    console.log('no rows');
    return res.status(404).json({ msg: `trip with id: '${currentId}' was not found` });
  }

  // console.log('rows ===', rows);

  res.json(rows[0]);
});

// - POST /trips - sukurti nauja irasa
tripsRouter.post('/', checkTripBody, async (req, res) => {
  // tai kas atsiusta gyvena ?

  const {
    name,
    date,
    country,
    city,
    rating,
    description,
    price,
    user_id,
    image_main,
    images_1 = '',
    images_2 = '',
    images_3 = '',
  } = req.body as Omit<TripObjType, 'id'>;
  // validation
  const argArr = [
    name,
    date,
    country,
    city,
    rating,
    description,
    price,
    user_id,
    image_main,
    images_1,
    images_2,
    images_3,
  ];

  // panaudoti dbQueryWithData ir sukurti nauja irasa
  const sql = `INSERT INTO trips (name, date, country, city, rating, description, price, user_id, image_main, images_1, images_2, images_3) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;

  // jei sekmingai sukurta grzinti naujai sukurto iraso id
  const [rows, error] = (await dbQueryWithData(sql, argArr)) as [ResultSetHeader, Error];

  // grazinti pilna nauja objekta
  if (error) {
    console.warn('sukurti nauja irasa error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  // // sukurimo rezultato tipas yra ResultSetHeader
  // let rez: ResultSetHeader;
  // res.json(rows);
  res.json({ id: rows.insertId, ...req.body } as TripObjType);
});

// - DELETE /trips/:id - istrinti irasa pakeiciant is_deleted i 1

tripsRouter.delete('/:tripId', async (req, res) => {
  const currentId = req.params.tripId;

  const sql = `UPDATE trips SET is_deleted=1 WHERE id=? LIMIT 1`;

  const [rows, error] = (await dbQueryWithData(sql, [currentId])) as [ResultSetHeader, Error];

  if (error) {
    console.warn('istrinti irasa pakeiciant is_deleted i 1 error ===', error);
    console.warn('error ===', error.message);
    return res.status(400).json({ error: 'something went wrong' });
  }

  if (rows.affectedRows === 0) {
    console.log('no rows');
    return res.status(404).json({ error: `trip with id: '${currentId}' was not found` });
  }

  res.json({ msg: `trip with id: '${currentId}' was deleted` });
});

export default tripsRouter;