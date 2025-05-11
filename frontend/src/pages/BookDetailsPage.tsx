import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { useBookContext } from '../context/BookContext';
import StarRating from '../components/StarRating';
import ReviewItem from '../components/ReviewItem';
import LoadingSpinner from '../components/LoadingSpinner';

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { books, reviews, loading, error, fetchBooks, fetchBookReviews } = useBookContext();
  
  const book = books.find(b => b._id === id);
  const bookReviews = id ? reviews[id] || [] : [];
  
  useEffect(() => {
    if (!book) {
      fetchBooks();
    }
    
    if (id) {
      fetchBookReviews(id);
      if (book) {
        document.title = `${book.title} | Book Reviews`;
      }
    }
  }, [id, book, fetchBooks, fetchBookReviews]);
  
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
        to="/" 
        className="inline-flex items-center text-[#8B4513] hover:underline mb-6"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to Books
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:w-1/3 lg:w-1/4">
            <img 
              src={book.coverImage} 
              alt={`Cover of ${book.title}`} 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="p-6 md:w-2/3 lg:w-3/4">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
            <p className="text-gray-600 mb-4">by {book.author}</p>
            
            <div className="flex items-center mb-6">
              <StarRating rating={book.averageRating} />
              <span className="ml-2 text-gray-600">
                {book.averageRating.toFixed(1)} ({bookReviews.length} {bookReviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
              <p className="text-gray-700">{book.description}</p>
            </div>
            
            <Link 
              to={`/books/${book._id}/review`}
              className="inline-flex items-center bg-[#8B4513] text-white py-2 px-4 rounded-md hover:bg-[#6d3612] transition-colors"
            >
              <Plus size={16} className="mr-1" />
              Write a Review
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
        </div>
        
        {loading && bookReviews.length === 0 ? (
          <LoadingSpinner />
        ) : bookReviews.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600 mb-4">No reviews yet. Be the first to share your thoughts!</p>
            <Link 
              to={`/books/${book._id}/review`}
              className="inline-flex items-center bg-[#8B4513] text-white py-2 px-4 rounded-md hover:bg-[#6d3612] transition-colors"
            >
              <Plus size={16} className="mr-1" />
              Write a Review
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookReviews.map((review) => (
              <ReviewItem key={review._id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetailsPage;