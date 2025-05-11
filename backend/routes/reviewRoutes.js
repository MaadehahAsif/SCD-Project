import express from 'express';
import {
  getReviewById,
  createReview,
  updateReview,
  deleteReview
} from '../controllers/reviewController.js';

const router = express.Router();

// GET a specific review
router.get('/:id', getReviewById);

// POST a new review
router.post('/', createReview);

// PUT/update a review
router.put('/:id', updateReview);

// DELETE a review
router.delete('/:id', deleteReview);

export default router;