//Drew Christensen Seciton 3
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import CartPage from './components/CartPage'; // <-- Create this next

const App: React.FC = () => {
  return (
    <Router>
      <h1 className="text-center mt-4">Online Bookstore</h1>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
};

export default App;

