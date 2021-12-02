import express from 'express';

import oauthRouter from './oauth';
import authRouter from './auth';
import booksRouter from './books';
import jwtMiddleware from '../middlewares/jwt'

const router = express.Router();

router.use('/oauth', oauthRouter);
router.use('/auth', jwtMiddleware, authRouter);
router.use('/books', jwtMiddleware, booksRouter);

export default router;
