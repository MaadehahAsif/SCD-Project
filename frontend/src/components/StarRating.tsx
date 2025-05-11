import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  editable?: boolean;
  onChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  editable = false, 
  onChange 
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);
  
  const handleClick = (selectedRating: number) => {
    if (editable && onChange) {
      onChange(selectedRating);
    }
  };
  
  const renderStar = (index: number) => {
    const filled = 
      editable 
        ? index <= (hoverRating || rating)
        : index <= rating;
        
    return (
      <Star
        key={index}
        className={`w-5 h-5 ${filled ? 'filled text-yellow-500' : 'text-gray-300'} ${editable ? 'cursor-pointer' : ''}`}
        fill={filled ? 'currentColor' : 'none'}
        onMouseEnter={() => editable && setHoverRating(index)}
        onMouseLeave={() => editable && setHoverRating(0)}
        onClick={() => handleClick(index)}
      />
    );
  };
  
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map(index => renderStar(index))}
    </div>
  );
};

export default StarRating;