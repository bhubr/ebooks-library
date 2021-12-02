import express from 'express';
import { join } from 'path';
import { getRepository } from 'typeorm';
import { Book } from '../entity/Book';

const booksRoot = process.env.BOOKS_PATH;

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

router.get('/:slug/*', async (req, res) => {
  try {
    const { slug } = req.params;
    const bits = req.url.split('/');
    while(bits.shift() !== slug) {}
    console.log('req', req.url, bits);
    const bookRepository = getRepository(Book);
    const books: Book[] = await bookRepository.find({ slug });
    if (!books.length) {
      return res.status(404).send({
        error: `Book "${slug}" not found`
      })
    }
    const [book] = books;
    const bookFile = join(booksRoot, slug, ...bits);
    console.log(bookFile);
    return res.sendFile(bookFile);
  } catch (err) {
    console.error('Error while requesting books', err.message);
    return res.status(500).json({
      error: err.message,
    });
  }
});

export default router;
