import express from 'express';
import { getRepository } from 'typeorm';
import { Book } from '../entity/Book';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const bookRepository = getRepository(Book);
    const books: Book[] = await bookRepository.find();
    res.send(books);
  } catch (err) {
    console.error('Error while requesting books', err.message);
    return res.status(500).json({
      error: err.message,
    });
  }
});

export default router;
