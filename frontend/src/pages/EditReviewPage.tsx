import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useBookContext } from '../context/BookContext';
import ReviewForm from '../components/ReviewForm';
import LoadingSpinner from '../components/LoadingSpinner';

interface Review {
  _id: string;
  bookId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const EditReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { books, updateReview } = useBookContext();
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  
  useEffect(() => {
    const fetchReview = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`${apiUrl}/reviews/${id}`);
        setReview(response.data);
      } catch (err) {
        setError('Failed to fetch review details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReview();
  }, [id, apiUrl]);
  
  useEffect(() => {
    if (review) {
      const book = books.find(b => b._id === review.bookId);
      if (book) {
        document.title = `Edit Review for ${book.title} | Book Reviews`;
      }
    }
  }, [review, books]);
  
  const handleSubmit = async (values: { userName: string; rating: number; comment: string }) => {
    if (!id || !review) return;
  
    setIsSubmitting(true);
    try {
      await updateReview(id, {
        bookId: review.bookId, // ✅ ensure backend receives bookId
        userName: values.userName,
        rating: values.rating,
        comment: values.comment
      });
      navigate(`/books/${review.bookId}`);
    } catch (err) {
      console.error('Failed to update review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error || !review) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">{error || 'Review not found.'}</p>
        <Link 
          to="/"
          className="bg-[#8B4513] text-white py-2 px-4 rounded hover:bg-[#6d3612] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }
  
  const book = books.find(b => b._id === review.bookId);
  
  return (
    <div className="slide-in">
      <Link 
        to={`/books/${review.bookId}`} 
        className="inline-flex items-center text-[#8B4513] hover:underline mb-6"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to Book
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Your Review</h1>
        {book && (
          <p className="text-gray-600">for {book.title} by {book.author}</p>
        )}
      </div>
      
      <div className="max-w-2xl">
        <ReviewForm 
          initialValues={{
            userName: review.userName,
            rating: review.rating,
            comment: review.comment
          }}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EditReviewPage;