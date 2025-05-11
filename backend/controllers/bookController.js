import Book from '../models/Book.js';
import Review from '../models/Review.js';

// Get all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ title: 1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new book
export const createBook = async (req, res) => {
  try {
    const { title, author, description, coverImage } = req.body;
    
    const newBook = new Book({
      title,
      author,
      description,
      coverImage,
      averageRating: 0
    });
    
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a book
export const updateBook = async (req, res) => {
  try {
    const { title, author, description, coverImage } = req.body;
    
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, description, coverImage },
      { new: true, runValidators: true }
    );
    
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a book
export const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // Also delete all reviews for this book
    await Review.deleteMany({ bookId: req.params.id });
    
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reviews for a specific book
export const getBookReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.id }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};