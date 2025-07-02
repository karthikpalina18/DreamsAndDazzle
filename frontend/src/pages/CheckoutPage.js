import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const {
    items,
    getCartTotal,
    getTaxAmount,
    getShippingCost,
    getFinalTotal,
    clearCart,
    getOrderFormattedItems // ✅ NEW: cleaner way to format order items
  } = useCart();

  const { createOrder, loading, error, clearError } = useOrders();

  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });

  const [notes, setNotes] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    const requiredFields = ['name', 'phone', 'street', 'city', 'state', 'zipCode'];
    return requiredFields.every((field) => shippingAddress[field].trim()) && items.length > 0;
  };

  const handlePlaceOrder = async () => {
    if (!isFormValid()) {
      alert('Please fill in all required fields.');
      return;
    }

    clearError();
    setPlacingOrder(true);

    const orderData = {
      items: getOrderFormattedItems(),
      shippingAddress,
      notes: notes.trim() || undefined
    };

    try {
      const result = await createOrder(orderData);
      if (result.success) {
        clearCart();
        navigate('/order-success', { state: { order: result.data } });
      } else {
        console.error('Order creation failed:', result.error);
      }
    } catch (err) {
      console.error('Unexpected error during order creation:', err);
    }

    setPlacingOrder(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Shipping Form */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
        <div className="space-y-4">
          {['name', 'phone', 'street', 'city', 'state', 'zipCode', 'country'].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={`${field[0].toUpperCase() + field.slice(1)}${['name', 'phone', 'street', 'city', 'state', 'zipCode'].includes(field) ? ' *' : ''}`}
              value={shippingAddress[field]}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={['name', 'phone', 'street', 'city', 'state', 'zipCode'].includes(field)}
            />
          ))}

          <textarea
            name="notes"
            placeholder="Order Notes (Optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            maxLength="500"
          />
          <small className="text-gray-500">
            {notes.length}/500 characters
          </small>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 border rounded p-6 shadow space-y-4">
        <h2 className="text-2xl font-bold">Order Summary</h2>

        {items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <>
            <ul className="divide-y">
              {items.map((item, idx) => (
                <li key={idx} className="py-2 flex justify-between">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    <p className="text-sm text-gray-500">₹{item.price} each</p>
                  </div>
                  <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>

            <hr />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%):</span>
                <span>₹{getTaxAmount().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>
                  {getShippingCost() === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `₹${getShippingCost().toFixed(2)}`
                  )}
                </span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>₹{getFinalTotal().toFixed(2)}</span>
              </div>
            </div>

            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
              <p><strong>Payment Method:</strong> Cash on Delivery</p>
              <p><strong>Estimated Delivery:</strong> 7 days from order date</p>
              {getCartTotal() > 500 && (
                <p className="text-green-600">🎉 You qualify for free shipping!</p>
              )}
            </div>
          </>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <button
          onClick={handlePlaceOrder}
          disabled={placingOrder || !isFormValid() || loading}
          className={`w-full py-3 rounded font-medium transition-colors ${
            placingOrder || !isFormValid() || loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {placingOrder || loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Placing Order...
            </span>
          ) : (
            'Place Order'
          )}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
