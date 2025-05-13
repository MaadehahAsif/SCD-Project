import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';

interface Book {
  _id: string;
  title: string;
  author: string;
  coverImage: string;
  averageRating: number;
  description: string;
}

interface Review {
  _id: string;
  bookId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface BookContextProps {
  books: Book[];
  reviews: { [key: string]: Review[] };
  loading: boolean;
  error: string | null;
  fetchBooks: () => Promise<void>;
  fetchBookReviews: (bookId: string) => Promise<void>;
  addReview: (review: Omit<Review, '_id' | 'createdAt'>) => Promise<void>;
  updateReview: (id: string, review: Partial<Review>) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
}

const BookContext = createContext<BookContextProps | undefined>(undefined);

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
  return context;
};

export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [reviews, setReviews] = useState<{ [key: string]: Review[] }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${apiUrl}/books`);
      setBooks(response.data);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookReviews = async (bookId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${apiUrl}/books/${bookId}/reviews`);
      setReviews(prev => ({
        ...prev,
        [bookId]: response.data
      }));
    } catch (err) {
      setError('Failed to fetch reviews. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (review: Omit<Review, '_id' | 'createdAt'>) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Sending review:", review); // ✅ log payload before sending
      const response = await axios.post(`${apiUrl}/reviews`, review);
      setReviews(prev => ({
        ...prev,
        [review.bookId]: [...(prev[review.bookId] || []), response.data]
      }));
      await fetchBooks();
    } catch (err) {
      setError('Failed to add review. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  const updateReview = async (id: string, review: Partial<Review>) => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.put(`${apiUrl}/reviews/${id}`, review);
  
      const bookId = review.bookId;
      if (bookId) {
        setReviews((prev) => ({
          ...prev,
          [bookId]: prev[bookId]?.map((r) =>
            r._id === id ? { ...r, ...response.data } : r
          ) || []
        }));
      }
  
      await fetchBooks();
    } catch (err) {
      setError("Failed to update review. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  const deleteReview = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`${apiUrl}/reviews/${id}`);
      const bookId = response.data.bookId;
      
      setReviews(prev => ({
        ...prev,
        [bookId]: prev[bookId].filter(r => r._id !== id)
      }));
      
      // Update book average rating
      await fetchBooks();
    } catch (err) {
      setError('Failed to delete review. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider
      value={{
        books,
        reviews,
        loading,
        error,
        fetchBooks,
        fetchBookReviews,
        addReview,
        updateReview,
        deleteReview
      }}
    >
      {children}
    </BookContext.Provider>
  );
};