// Drew Christensen Section 3

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import CartSummary from './CartSummary';
import CategoryFilter from './CategoryFilter';
import { Book, CartItem } from '../types';
import { Toast, ToastContainer } from 'react-bootstrap'; // ✅ Import Toast

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [page, setPage] = useState<number>(1);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [showToast, setShowToast] = useState<boolean>(false); // ✅ State for Toast
  const pageSize = 6;

  useEffect(() => {
    // Get books for current page and selected category
    axios
      .get(`/api/books?pageNumber=${page}&pageSize=${pageSize}&category=${selectedCategory || 'All'}`)
      .then((res) => {
        setBooks(res.data.books);
        setTotalRecords(res.data.totalRecords);
      });

    // ✅ Get all categories for dropdown
    axios
      .get('/api/books/categories')
      .then((res) => {
        setCategories(res.data);
      });

    const storedCart = localStorage.getItem('cart');
    if (storedCart) setCart(JSON.parse(storedCart));
  }, [page, selectedCategory]);

  // ✅ Add book to cart with toast notification
  const addToCart = (book: Book) => {
    const existing = cart.find((item) => item.book.bookID === book.bookID);
    const updated = existing
      ? cart.map((item) =>
          item.book.bookID === book.bookID ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...cart, { book, quantity: 1 }];

    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));

    // ✅ Show toast notification
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="container mt-4">
      <CartSummary cart={cart} />
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={(cat) => {
          setSelectedCategory(cat);
          setPage(1); // <-- Reset page when switching category
        }}
      />
      <div className="row">
        {books.map((book) => (
          <BookCard key={book.bookID} book={book} onAdd={addToCart} />
        ))}
      </div>

      <div className="text-center my-2">
        Page {page} of {Math.ceil(totalRecords / pageSize)}
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-outline-secondary"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          &laquo; Prev
        </button>
        <button
          className="btn btn-outline-secondary"
          disabled={page >= Math.ceil(totalRecords / pageSize)}
          onClick={() => setPage((p) => p + 1)}
        >
          Next &raquo;
        </button>
      </div>

      {/* ✅ Bootstrap Toast (New Feature) */}
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Bookstore</strong>
            <small>Just Now</small>
          </Toast.Header>
          <Toast.Body>✅ Book added to cart!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default BookList;
