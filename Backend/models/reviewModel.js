import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  bookId: mongoose.Schema.Types.ObjectId,
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Review', reviewSchema);