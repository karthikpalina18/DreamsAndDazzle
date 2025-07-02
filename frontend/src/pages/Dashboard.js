import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get('/api/auth/me');
        const ordersRes = await axios.get('/api/orders/my-orders?limit=3');
        const productsRes = await axios.get('/api/products');

        setUser(userRes.data);
        setOrders(ordersRes.data.orders || []);
        setProducts(productsRes.data.products || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Group products by category
    const grouped = {};
    for (const product of products) {
      if (!product.isActive) continue;
      if (!grouped[product.category]) grouped[product.category] = [];
      grouped[product.category].push(product);
    }
    setGroupedProducts(grouped);
  }, [products]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">👋 Welcome, {user?.name || 'User'}!</h2>

      {/* Profile Info */}
      {user && (
        <div className="bg-white rounded shadow p-4 mb-6">
          <h3 className="text-xl font-semibold mb-2">Your Profile</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
        </div>
      )}

      {/* Recent Orders */}
      <div className="bg-white rounded shadow p-4 mb-6">
        <h3 className="text-xl font-semibold mb-4">🛒 Recent Orders</h3>
        {orders.length === 0 ? (
          <p>No recent orders.</p>
        ) : (
          <ul className="space-y-3">
            {orders.map(order => (
              <li key={order._id} className="border-b pb-2">
                <Link to={`/order/${order._id}`} className="text-blue-600 hover:underline">
                  Order #{order.orderNumber || order._id.slice(-6)} – ₹{order.total.toFixed(2)} – {order.orderStatus}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <Link to="/my-orders" className="inline-block mt-3 text-sm text-blue-600 hover:underline">
          View All Orders →
        </Link>
      </div>

      {/* Products by Category */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4">🛍️ Products by Category</h3>
        {Object.keys(groupedProducts).length === 0 ? (
          <p>Loading products...</p>
        ) : (
          Object.entries(groupedProducts).map(([category, products]) => (
            <div key={category} className="mb-8">
              <h4 className="text-xl font-semibold mb-3">{category}</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {products.map(product => (
                  <div
                    key={product._id}
                    className="border p-3 rounded shadow-sm hover:shadow-md transition"
                  >
                    <img
                      src={product.images?.[0]?.url || '/placeholder.png'}
                      alt={product.name}
                      className="h-32 w-full object-cover rounded mb-2"
                    />
                    <h5 className="font-medium">{product.name}</h5>
                    <p className="text-sm text-gray-600">₹{product.price}</p>
                    <Link
                      to={`/product/${product._id}`}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      View Product
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
