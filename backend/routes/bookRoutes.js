import express from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getBookReviews
} from '../controllers/bookController.js';

const router = express.Router();

// GET all books
router.get('/', getAllBooks);

// GET a specific book
router.get('/:id', getBookById);

// POST a new book
router.post('/', createBook);

// PUT/update a book
router.put('/:id', updateBook);

// DELETE a book
router.delete('/:id', deleteBook);

// GET all reviews for a specific book
router.get('/:id/reviews', getBookReviews);

export default router;