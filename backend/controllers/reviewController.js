import Review from '../models/Review.js';
import Book from '../models/Book.js';
import mongoose from 'mongoose';

// Get review by ID
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new review
export const createReview = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { bookId, userName, rating, comment } = req.body;
    
    // Check if book exists
    const book = await Book.findById(bookId).session(session);
    if (!book) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // Create new review
    const newReview = new Review({
      bookId,
      userName,
      rating,
      comment
    });
    
    const savedReview = await newReview.save({ session });
    
    // Update book's average rating
    const allReviews = await Review.find({ bookId }).session(session);
    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / allReviews.length;
    
    await Book.findByIdAndUpdate(
      bookId,
      { averageRating },
      { new: true, runValidators: true, session }
    );
    
    await session.commitTransaction();
    session.endSession();
    
    res.status(201).json(savedReview);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: error.message });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { userName, rating, comment } = req.body;
    
    // Find the review
    const review = await Review.findById(req.params.id).session(session);
    if (!review) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Review not found' });
    }
    
    // Update review
    review.userName = userName || review.userName;
    review.rating = rating !== undefined ? rating : review.rating;
    review.comment = comment || review.comment;
    
    const updatedReview = await review.save({ session });
    
    // Update book's average rating
    const bookId = review.bookId;
    const allReviews = await Review.find({ bookId }).session(session);
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / allReviews.length;
    
    await Book.findByIdAndUpdate(
      bookId,
      { averageRating },
      { new: true, runValidators: true, session }
    );
    
    await session.commitTransaction();
    session.endSession();
    
    res.status(200).json(updatedReview);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: error.message });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    // Find the review
    const review = await Review.findById(req.params.id).session(session);
    if (!review) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Review not found' });
    }
    
    const bookId = review.bookId;
    
    // Delete the review
    await Review.findByIdAndDelete(req.params.id, { session });
    
    // Update book's average rating
    const allReviews = await Review.find({ bookId }).session(session);
    
    let averageRating = 0;
    if (allReviews.length > 0) {
      const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
      averageRating = totalRating / allReviews.length;
    }
    
    await Book.findByIdAndUpdate(
      bookId,
      { averageRating },
      { new: true, runValidators: true, session }
    );
    
    await session.commitTransaction();
    session.endSession();
    
    res.status(200).json({ message: 'Review deleted successfully', bookId });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};