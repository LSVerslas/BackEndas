
import express from 'express';
import dbQueryWithData from '../helpers/helper.js';
import { TripObjType } from '../helpers/types.js';

const tripsRouter = express.Router();

// const fields = [
// 'id', 'name', 'date', 'country', 'city', 'rating', 'description', 'price', 'user_id',
// ];

const tripCols = 'id,name,date,country,city,rating,description,price,user_id'

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

export default tripsRouter;

