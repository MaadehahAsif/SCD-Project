import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useBookContext } from '../context/BookContext';
import ReviewForm from '../components/ReviewForm';
import LoadingSpinner from '../components/LoadingSpinner';

const AddReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { books, loading, error, fetchBooks, addReview } = useBookContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const book = books.find(b => b._id === id);
  
  useEffect(() => {
    if (!book && !loading) {
      fetchBooks();
    }
    
    if (book) {
      document.title = `Review ${book.title} | Book Reviews`;
    }
  }, [book, loading, fetchBooks]);
  
  const handleSubmit = async (values: { userName: string; rating: number; comment: string }) => {
    if (!id) return;
    
    setIsSubmitting(true);
    try {
      await addReview({
        bookId: id,
        userName: values.userName,
        rating: values.rating,
        comment: values.comment
      });
      navigate(`/books/${id}`);
    } catch (err) {
      console.error('Failed to submit review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading && !book) {
    return <LoadingSpinner />;
  }
  
  if (error && !book) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => fetchBooks()}
          className="bg-[#8B4513] text-white py-2 px-4 rounded hover:bg-[#6d3612] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  if (!book) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600 mb-4">Book not found.</p>
        <Link 
          to="/"
          className="bg-[#8B4513] text-white py-2 px-4 rounded hover:bg-[#6d3612] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }
  
  return (
    <div className="slide-in">
      <Link 
        to={`/books/${id}`} 
        className="inline-flex items-center text-[#8B4513] hover:underline mb-6"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to Book
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Write a Review</h1>
        <p className="text-gray-600">for {book.title} by {book.author}</p>
      </div>
      
      <div className="max-w-2xl">
        <ReviewForm 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default AddReviewPage;