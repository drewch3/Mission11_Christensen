import React from 'react';
import { Book } from '../types';

interface Props {
  book: Book;
  onAdd: (book: Book) => void;
}

const BookCard: React.FC<Props> = ({ book, onAdd }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text">{book.author}</p>
          <p><span className="badge bg-info">{book.category}</span></p>
          <p className="card-text fw-bold">${book.price.toFixed(2)}</p>
          <button className="btn btn-primary w-100" onClick={() => onAdd(book)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
