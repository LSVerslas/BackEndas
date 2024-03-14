
import express from 'express';

const tripsRouter = express.Router();

// GET - /trips - textaa 'get all trips'
tripsRouter.get('/', async (_req, res) => {
    res.json('getting all trips');
});

export default tripsRouter;

