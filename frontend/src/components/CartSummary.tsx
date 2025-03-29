import React from 'react';
import { CartItem } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  cart: CartItem[];
}

const CartSummary: React.FC<Props> = ({ cart }) => {
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalCost = cart.reduce((sum, i) => sum + i.quantity * i.book.price, 0);

  return (
    <div className="alert alert-light border d-flex justify-content-between align-items-center">
      <div>
        <strong>Cart:</strong> {totalItems} item(s)
      </div>
      <div className="fw-bold">${totalCost.toFixed(2)}</div>
      <Link to="/cart" className="btn btn-sm btn-outline-primary">View Cart</Link>
    </div>
  );
};

export default CartSummary;
