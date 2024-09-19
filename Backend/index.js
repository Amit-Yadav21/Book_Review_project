import express from 'express';
import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
import cors from 'cors';

// Import routes
import bookRoutes from './routes/bookRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

// Initialize app
const app = express();
const PORT = 5000;

// Increase the limit for JSON payload
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// MongoDB Connection
const mongoURI = 'mongodb+srv://amit21:SLb3cF41HdHgsdfL@cluster0.lvclbz1.mongodb.net/Book-Review-project?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use Routes
app.use('/', bookRoutes);
app.use('/books', reviewRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});