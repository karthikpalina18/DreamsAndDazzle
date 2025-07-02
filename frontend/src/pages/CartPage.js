import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    getTaxAmount,
    getShippingCost,
    getFinalTotal,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold">Your Cart is Empty 🛒</h2>
        <Link to="/products" className="text-blue-600 underline mt-4 block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Cart Items */}
      <div className="md:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        {items.map((item, index) => (
          <div key={index} className="flex gap-4 items-center border p-4 rounded shadow-sm">
            <img
              src={item.product.images?.[0]?.url || '/no-image.png'}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.product.name}</h3>
              <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
              <p className="text-sm text-gray-600">
                Quantity:{' '}
                <button
                  onClick={() =>
                    updateQuantity(item.product._id, item.quantity - 1, item.color, item.size)
                  }
                  disabled={item.quantity <= 1}
                  className="px-2"
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.product._id, item.quantity + 1, item.color, item.size)
                  }
                  className="px-2"
                >
                  +
                </button>
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.product._id, item.color, item.size)}
              className="text-red-600 hover:underline text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="border p-6 rounded shadow space-y-4 bg-gray-50">
        <h2 className="text-xl font-bold">Summary</h2>
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
          <span>₹{getShippingCost().toFixed(2)}</span>
        </div>
        <hr />
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>₹{getFinalTotal().toFixed(2)}</span>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
