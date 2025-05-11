import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { useBookContext } from '../context/BookContext';

interface ReviewItemProps {
  review: {
    _id: string;
    bookId: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
  };
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteReview } = useBookContext();
  
  const formattedDate = new Date(review.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setIsDeleting(true);
      try {
        await deleteReview(review._id);
      } catch (error) {
        console.error('Failed to delete review:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 fade-in">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-gray-800">{review.userName}</h4>
          <div className="flex items-center mt-1">
            <StarRating rating={review.rating} />
            <span className="text-sm text-gray-500 ml-2">
              {formattedDate}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link 
            to={`/reviews/${review._id}/edit`}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Edit size={18} />
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-gray-600 hover:text-red-600 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <p className="text-gray-700 mt-2">{review.comment}</p>
    </div>
  );
};

export default ReviewItem;