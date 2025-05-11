import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookDetailsPage from './pages/BookDetailsPage';
import AddReviewPage from './pages/AddReviewPage';
import EditReviewPage from './pages/EditReviewPage';
import { BookProvider } from './context/BookContext';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BookProvider>
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books/:id" element={<BookDetailsPage />} />
            <Route path="/books/:id/review" element={<AddReviewPage />} />
            <Route path="/reviews/:id/edit" element={<EditReviewPage />} />
          </Routes>
        </main>
        <Footer />
      </BookProvider>
    </div>
  );
}

export default App;