import Review from '../models/reviewModel.js';

// Get reviews for a specific book
export const getReviewsByBookId = async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.id });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Submit a review for a book
export const createReview = async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const review = new Review({
      bookId: req.params.id,
      rating,
      comment,
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};