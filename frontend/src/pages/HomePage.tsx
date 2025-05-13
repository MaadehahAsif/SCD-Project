import React, { useEffect } from 'react';
import { useBookContext } from '../context/BookContext';
import BookCard from '../components/BookCard';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage: React.FC = () => {
  const { books, loading, error, fetchBooks } = useBookContext();

  useEffect(() => {
    document.title = 'Book Reviews | Home';
    fetchBooks();
  }, [fetchBooks]);

  console.log('books:', books);

  if (loading && Array.isArray(books) && books.length === 0) {
    return <LoadingSpinner />;
  }

  if (error && Array.isArray(books) && books.length === 0) {
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

  return (
    <div className="slide-in">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Discover Books and Reviews</h1>

      {!Array.isArray(books) || books.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 mb-4">No books found in the database.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {books.map((book) => (
            <BookCard
              key={book._id}
              id={book._id}
              title={book.title}
              author={book.author}
              coverImage={book.coverImage}
              rating={book.averageRating}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
