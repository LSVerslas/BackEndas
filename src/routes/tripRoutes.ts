
import express from 'express';
import dbQueryWithData from '../helpers/helper.js';
import { TripObjType } from '../helpers/types.js';
import { ResultSetHeader } from 'mysql2';
// import { ResultSetHeader } from 'mysql2';

const tripsRouter = express.Router();

// const fields = [
// 'id', 'name', 'date', 'country', 'city', 'rating', 'description', 'price', 'user_id',
// ];

const tripCols = 'id,name,date,country,city,rating,description,price,user_id,image_main';

// GET - /trips - textaa 'get all trips'
tripsRouter.get('/', async (_req, res) => {
    const sql = `SELECT ${tripCols} FROM trips WHERE is_deleted=0`;
    const [row, error] = (await dbQueryWithData(sql)) as [TripObjType[], Error];

    if (error) {
        console.warn('get all trips error ===', error);
        console.warn('error ===', error.message);
        return res.status(400).json({ error: 'Something went wrong' });
    }

    console.log('row ===', row[0]);


    res.json(row);
});

tripsRouter.get('/:tripId', async (req, res) => {
    const currentId = req.params.tripId;

    const sql = `SELECT ${tripCols} FROM trips WHERE is_deleted=0 AND id=?`;

    const [rows, error] = await dbQueryWithData(sql, [currentId]) as [TripObjType[], Error];

    if (error) {
        console.warn('grazinti viena irasa pagal id error ===', error);
        console.warn('error ===', error.message);
        return res.status(400).json({ error: 'Something went wrong' });
    }

    if (rows.length === 0) {
        console.log('no rows');
        return res.status(404).json({ msg: `trip with id: '${currentId}' was not found` });
    }

    console.log('rows ===', rows);

    res.json(rows[0]);
});




tripsRouter.post('/', async (req, res) => {


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
    const sql = `INSERT INTO trips (name, date, country, city, rating, description, price, user_id, image_main, images_1, images_2, images_3) VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?)`;

    // let rez: ResultSetHeader
    const[rows, error] = (await dbQueryWithData(sql, argArr)) as [ResultSetHeader, Error];
    // rez.insertId
    if (error) {
        console.warn('sukurti nauja irasa error ===', error);
        console.warn('error ===', error.message);
        return res.status(400).json({ error: 'Something went wrong' });
    }



    // res.json(rows);
    res.json({ id: rows.insertId, ...req.body } as TripObjType);
});
    // // padaryti DELETE/trip




    tripsRouter.delete('/:tripId', async (req, res) => {
        const currentId = req.params.tripId;

        const sql = `UPDATE trip SET is_deleted=1 WHERE id=?`;

        const [rows, error] = (await dbQueryWithData(sql, [currentId])) as [ResultSetHeader, Error];

        if (error) {
            console.warn('istrinti irasa pakeiciant is_deleted i 1 error ===', error);
            console.warn('error ===', error.message);
            return res.status(400).json({ error: 'Something went wrong' });
        }

        if (rows.affectedRows === 0) {
            console.log('no rows');
            return res.status(404).json({ msg: `trip with id: '${currentId}' was not found` });
        }

        res.json({ msg: `trip with id: '${currentId}' was deleted` });
    });

export default tripsRouter;

    // tripsRouter.delete('/:tripId', async (req, res) => {
    //     const currentId = req.params.tripId;

    //     const sql = `UPDATE trips SET is_deleted=1 WHERE id=?`;

    //     const [rows, error] = await dbQueryWithData(sql, [currentId]) as [ResultSetHeader, Error];

    //     if (error) {
    //         console.warn('istrimti irasa pakeiciant is_delete i 1 error ===', error);
    //         console.warn('error ===', error.message);
    //         return res.status(400).json({ error: 'Something went wrong' });
    //     }
    // });

    // padaryti UPDATE/trip

    // res.json(argArr);



