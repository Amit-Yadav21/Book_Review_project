import express from 'express';
import { getReviewsByBookId, createReview } from '../controllers/reviewController.js';

const router = express.Router();

// Route to get all reviews for a specific book
router.get('/:id/reviews', getReviewsByBookId);

// Route to submit a review for a specific book
router.post('/:id/reviews', createReview);

export default router;