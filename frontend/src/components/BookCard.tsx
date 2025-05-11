import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  rating: number;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, author, coverImage, rating }) => {
  return (
    <Link to={`/books/${id}`} className="block">
      <div className="book-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img 
            src={coverImage} 
            alt={`Cover of ${title}`} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{title}</h3>
          <p className="text-gray-600 text-sm mb-2">by {author}</p>
          <div className="flex items-center">
            <StarRating rating={rating} />
            <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;