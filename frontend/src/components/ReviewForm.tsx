import React, { useState } from 'react';
import StarRating from './StarRating';

interface ReviewFormProps {
  initialValues?: {
    userName: string;
    rating: number;
    comment: string;
  };
  onSubmit: (values: { userName: string; rating: number; comment: string }) => void;
  isSubmitting: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ 
  initialValues = { userName: '', rating: 0, comment: '' },
  onSubmit,
  isSubmitting
}) => {
  const [userName, setUserName] = useState(initialValues.userName);
  const [rating, setRating] = useState(initialValues.rating);
  const [comment, setComment] = useState(initialValues.comment);
  const [errors, setErrors] = useState({ userName: '', rating: '', comment: '' });
  
  const validate = () => {
    const newErrors = { userName: '', rating: '', comment: '' };
    let isValid = true;
    
    if (!userName.trim()) {
      newErrors.userName = 'Name is required';
      isValid = false;
    }
    
    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
      isValid = false;
    }
    
    if (!comment.trim()) {
      newErrors.comment = 'Review comment is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({ userName, rating, comment });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="userName" className="block text-gray-700 font-medium mb-2">
          Your Name
        </label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
          placeholder="Enter your name"
        />
        {errors.userName && (
          <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
        )}
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Rating
        </label>
        <div className="flex items-center">
          <StarRating 
            rating={rating} 
            editable={true} 
            onChange={(value) => setRating(value)} 
          />
          <span className="ml-2 text-gray-600">
            {rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : ''}
          </span>
        </div>
        {errors.rating && (
          <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
        )}
      </div>
      
      <div className="mb-4">
        <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">
          Your Review
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
          placeholder="Share your thoughts about this book..."
        ></textarea>
        {errors.comment && (
          <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-[#8B4513] text-white py-2 px-4 rounded-md hover:bg-[#6d3612] transition-colors duration-200 disabled:bg-gray-400"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;