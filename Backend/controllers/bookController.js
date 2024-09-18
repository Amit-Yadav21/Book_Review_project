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
  const { title, isbn, pageCount, publishedDate, thumbnailUrl, shortDescription, longDescription, status, authors, categories } = req.body;  // Extract data from the request body

  // Check if any required field is missing
  if (!title || !isbn || !pageCount || !publishedDate || !thumbnailUrl || !shortDescription || !longDescription || !status || !authors || !categories) {
    return res.status(400).json({ message: 'All fields (title, isbn, pageCount, publishedDate, thumbnailUrl, shortDescription, longDescription, status, authors, categories) are required', addedBooks: [] });
  }

  try {
    // Create a new book instance
    const newBook = new Book({
      title,
      isbn,
      pageCount,
      publishedDate,
      thumbnailUrl,
      shortDescription,
      longDescription,
      status,
      authors,
      categories
    });

    // Save the book to the database
    const savedBook = await newBook.save();

    res.status(201).json({ addedBooks:savedBook });  // Return the newly created book in an array
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
    
    // Count the number of added books
    const count = addedBooks.length;

    res.status(201).json({ count, addedBooks });

  } catch (err) {
    res.status(500).json({ message: 'Server error. Could not add books.', error: err.message });
  }
};