import Book from '../models/bookModel.js';

// Get all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to add a new book
export const addBook = async (req, res) => {
  const { title, author, description, imageUrl } = req.body;  // Extract data from the request body

  // Validate if all necessary fields are present
  if (!title || !author || !description || !imageUrl) {
    return res.status(400).json({ message: 'All fields (title, author, description, imageUrl) are required' });
  }

  try {
    // Create a new book instance
    const newBook = new Book({
      title,
      author,
      description,
      imageUrl
    });

    // Save the book to the database
    const savedBook = await newBook.save();

    res.status(201).json(savedBook);  // Return the newly created book
  } catch (err) {
    res.status(500).json({ message: 'Server error. Could not add book.', error: err.message });
  }
};

// Controller function to add multiple books
export const addMultipleBooks = async (req, res) => {
  const books = req.body;  // Expecting an array of books in the request body

  // Check if the request body is an array
  if (!Array.isArray(books)) {
    return res.status(400).json({ message: 'Invalid input, an array of books is expected.' });
  }

  try {
    // Insert multiple books in one operation
    const addedBooks = await Book.insertMany(books);

    res.status(201).json(addedBooks);  // Return the newly added books
  } catch (err) {
    res.status(500).json({ message: 'Server error. Could not add books.', error: err.message });
  }
};