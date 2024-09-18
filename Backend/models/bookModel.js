import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  imageUrl: String,
});

export default mongoose.model('Book', bookSchema);