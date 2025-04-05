import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Book } from './types';
import { Link } from 'react-router-dom';

const AdminBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isEditing, setIsEditing] = useState(false);
 const [editBookId, setEditBookId] = useState<number | null>(null);

  const [newBook, setNewBook] = useState<Book>({
    bookID: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: 0,
    price: 0
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await axios.get('/api/books?pageNumber=1&pageSize=1000');
    setBooks(res.data.books);
  };

  const handleAdd = async () => {
    await axios.post('/api/books', newBook);
    fetchBooks();
    resetForm();
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`/api/books/${id}`);
    fetchBooks();
  };

  const handleUpdate = async (book: Book) => {
    await axios.put(`/api/books/${book.bookID}`, book);
    fetchBooks();
    resetForm();
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditBookId(null);
    setNewBook({
      bookID: 0,
      title: '',
      author: '',
      publisher: '',
      isbn: '',
      classification: '',
      category: '',
      pageCount: 0,
      price: 0
    });
  };

  return (
    <div className="container mt-5">
    <Link to="/">
      <button className="btn btn-outline-primary mb-3">
        ← Back to Bookstore
      </button>
    </Link>
    
    <h2 className="mb-4 text-center">Admin Book Management</h2>

      <div className="row g-2 mb-4">
        {[
          { label: 'Title', key: 'title' },
          { label: 'Author', key: 'author' },
          { label: 'Publisher', key: 'publisher' },
          { label: 'ISBN', key: 'isbn' },
          { label: 'Classification', key: 'classification' },
          { label: 'Category', key: 'category' }
        ].map((field, index) => (
          <div className="col-md-4" key={index}>
            <label className="form-label">{field.label}</label>
            <input
              className="form-control"
              value={(newBook as any)[field.key]}
              onChange={(e) => setNewBook({ ...newBook, [field.key]: e.target.value })}
            />
          </div>
        ))}

        <div className="col-md-2">
          <label className="form-label">Page Count</label>
          <input
            className="form-control"
            type="number"
            value={newBook.pageCount === 0 ? '' : newBook.pageCount}
            onChange={e =>
              setNewBook({
                ...newBook,
                pageCount: e.target.value === '' ? 0 : parseInt(e.target.value)
              })
            }
          />
        </div>

        <div className="col-md-2">
          <label className="form-label">Price ($)</label>
          <input
            className="form-control"
            type="number"
            step="0.01"
            value={newBook.price === 0 ? '' : newBook.price}
            onChange={(e) => setNewBook({ ...newBook, price: e.target.value === '' ? 0 : parseFloat(e.target.value) || 0 })}
          />
        </div>

        <div className="col-md-2 d-flex align-items-end">
          {isEditing ? (
            <button
              className="btn btn-success w-100"
              onClick={() => handleUpdate(newBook)}
            >
              Save Changes
            </button>
          ) : (
            <button
              className="btn btn-primary w-100"
              onClick={handleAdd}
            >
              Add Book
            </button>
          )}
        </div>

        {isEditing && (
          <div className="col-md-2 d-flex align-items-end">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={resetForm}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <table className="table table-striped table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.bookID}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>${book.price.toFixed(2)}</td>
              <td className="text-center">
                <button
                  className="btn btn-outline-warning btn-sm me-2"
                  onClick={() => {
                    setNewBook(book);
                    setIsEditing(true);
                    setEditBookId(book.bookID);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(book.bookID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBooks;
