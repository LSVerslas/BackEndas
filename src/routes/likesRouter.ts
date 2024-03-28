import express from 'express';

const likesRouter = express.Router();

// Routes
// POST - /likes - sukurs nauja irasa likes lenteleje
likesRouter.post('/', async (req, res) => {
  res.json('like post');
});

export default likesRouter;