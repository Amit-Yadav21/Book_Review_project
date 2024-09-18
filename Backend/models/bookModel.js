import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  pageCount: { type: Number, required: true },
  publishedDate: { type: String, required: true},
  thumbnailUrl: { type: String, required: true},
  shortDescription: { type: String, required: true},
  longDescription: { type: String, required: true},
  status: { type: String, enum: ['PUBLISH', 'UNPUBLISH', 'MEAP'], required: true },
  authors: [{ type: String, required: true }],
  categories: [{ type: String, required: true }]
});

const Book = mongoose.model('Book', bookSchema);

export default Book;