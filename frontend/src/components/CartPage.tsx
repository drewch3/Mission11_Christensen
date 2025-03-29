import React, { useEffect, useState } from 'react';
import { CartItem } from '../types';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showModal, setShowModal] = useState(false); // ✅ Modal State
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  const total = cart.reduce((sum, i) => sum + i.quantity * i.book.price, 0);

  // ✅ Clear Cart Function
  const clearCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Title</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.book.bookID}>
                  <td>{item.book.title}</td>
                  <td>{item.quantity}</td>
                  <td>${item.book.price.toFixed(2)}</td>
                  <td>${(item.book.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4 className="mt-3">Total: ${total.toFixed(2)}</h4>
          <button className="btn btn-secondary mt-2" onClick={() => navigate(-1)}>
            Continue Shopping
          </button>
          <button className="btn btn-danger mt-2 ms-2" onClick={() => setShowModal(true)}>
            Clear Cart
          </button>
        </>
      )}

      {/* ✅ Bootstrap Modal (New Feature) */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Cart Clearance</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to clear your cart?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={clearCart}>
            Clear Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CartPage;
