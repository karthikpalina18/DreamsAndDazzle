import React, { useEffect } from 'react';
import { useOrders } from '../context/OrderContext';
import { Link } from 'react-router-dom';

const AdminOrders = () => {
  const {
    fetchAllOrders,
    orders,
    loading,
    error,
    getOrderStatusColor,
    getPaymentStatusColor
  } = useOrders();

  useEffect(() => {
    fetchAllOrders(); // no filters
  }, []);

  if (loading) return <p className="p-6">Loading orders...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Admin Orders</h2>
      <div className="overflow-auto">
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2">User</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Date</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-2">{order._id.slice(-6)}</td>
                <td className="p-2">{order.shippingInfo?.name}</td>
                <td className="p-2">₹{order.total}</td>
                <td className={`p-2 ${getOrderStatusColor(order.orderStatus)} rounded`}>
                  {order.orderStatus}
                </td>
                <td className={`p-2 ${getPaymentStatusColor(order.paymentStatus)} rounded`}>
                  {order.paymentStatus}
                </td>
                <td className="p-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2">
                  <Link
                    to={`/admin/orders/${order._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {orders?.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
