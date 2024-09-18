import express from 'express';
import { getAllBooks, getBookById, addBook, addMultipleBooks } from '../controllers/bookController.js';

const router = express.Router();

// Route to get all books
router.get('/getAllBooks', getAllBooks);

// Route to get a specific book by ID
router.get('/getBy/:id', getBookById);

// Route to add a new book
router.post('/addSingleBooks', addBook);

// Route to add multiple books
router.post('/addMultipleBooks', addMultipleBooks);

export default router;