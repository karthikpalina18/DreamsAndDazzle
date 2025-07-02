import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderSuccess = () => {
  const { state } = useLocation(); // Gets passed order object via state
  const order = state?.order;

  if (!order) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Order not found.</h2>
        <Link to="/dashboard" className="text-blue-600 hover:underline">Go to Home</Link>
      </div>
    );
  }

  const {
    _id,
    shippingAddress: shippingInfo = {},
    items = [],
    subtotal = 0,
    tax = 0,
    shippingCost: shipping = 0,
    total = 0,
    createdAt = new Date(),
  } = order;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Order Placed Successfully!</h2>
      <p className="mb-6">Thank you for your purchase. Below are your order details.</p>

      <div className="bg-white border rounded p-4 shadow-sm space-y-4">
        <p><strong>Order ID:</strong> {_id}</p>
        <p><strong>Date:</strong> {new Date(createdAt).toLocaleString()}</p>
        <p><strong>Name:</strong> {shippingInfo?.name}</p>
        <p><strong>Address:</strong> {`${shippingInfo?.street}, ${shippingInfo?.city}, ${shippingInfo?.state} - ${shippingInfo?.zipCode}, ${shippingInfo?.country}`}</p>

        <hr />

        <div>
          <h3 className="font-semibold mb-2">Items:</h3>
          <ul className="space-y-2">
            {items.map((item, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{item.name || item.product?.name} (x{item.quantity})</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <hr />

        <div className="text-right space-y-1">
          <p>Subtotal: ₹{Number(subtotal).toFixed(2)}</p>
          <p>Tax: ₹{Number(tax).toFixed(2)}</p>
          <p>Shipping: ₹{Number(shipping).toFixed(2)}</p>
          <p className="font-bold text-lg">Total: ₹{Number(total).toFixed(2)}</p>
        </div>
      </div>

      <Link
        to="/my-orders"
        className="inline-block mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        View My Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;
