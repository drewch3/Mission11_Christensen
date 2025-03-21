//Drew Christensen Seciton 3

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Book {
  bookID: number;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  classification: string;
  category: string;
  pageCount: number;
  price: number;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const API_URL = 'http://localhost:5056/api/Books';

  const fetchBooks = async () => {
    try {
      console.log(`Fetching books - Page: ${page}, PageSize: ${pageSize}`);
  
      const response = await axios.get(API_URL, {
        params: { pageNumber: page, pageSize: pageSize, sortBy: "Title", sortOrder }
      });
  
      console.log("API Raw Response:", response.data); // ✅ Debugging
  
      if (response.data && response.data.books) {
        setBooks(response.data.books); // ✅ Ensure books are correctly extracted
        setTotalCount(response.data.totalRecords || 0);
      } else {
        console.warn("Invalid API response:", response.data);
        setBooks([]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    }
  };  

  useEffect(() => {
    fetchBooks();
  }, [page, pageSize, sortOrder]); // ✅ Ensures fetchBooks is called when page updates

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleSortByTitle = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="container mt-4">
      <h2>Online Bookstore</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ cursor: 'pointer' }} onClick={handleSortByTitle}>
              Title {sortOrder === 'asc' ? '▲' : '▼'}
            </th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification</th>
            <th>Category</th>
            <th>Page Count</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map(book => (
              <tr key={book.bookID}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.isbn}</td>
                <td>{book.classification}</td>
                <td>{book.category}</td>
                <td>{book.pageCount}</td>
                <td>${book.price.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center">
                No books available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => (
            <li key={pg} className={`page-item ${page === pg ? 'active' : ''}`}>
              <button
                className="page-link"
                onClick={() => {
                  console.log(`Changing to page: ${pg}`);
                  setPage(pg);
                }}
              >
                {pg}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Change number of results per page */}
      <div className="mt-3">
        <label>Results per page:</label>
        <select
          className="ms-2"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1); // Reset to page 1 when changing page size
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};

export default BookList;
