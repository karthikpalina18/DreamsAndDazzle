import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

 // 🟢 Ensure autoTable is registered


const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/orders', {
        params: statusFilter ? { status: statusFilter } : {}
      });
      setOrders(res.data.orders || []);
      setStats(res.data.stats || []);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, { status });
      fetchOrders();
    } catch (err) {
      alert('Failed to update order status.');
    }
  };

  const downloadPDF = () => {
  const doc = new jsPDF();

  doc.text('Order Report', 14, 16);

  doc.autoTable({
    head: [['Order ID', 'User', 'Status', 'Total', 'Date']],
    body: orders.map(order => [
      order.orderNumber || order._id.slice(-6),
      order.user?.name || 'N/A',
      order.orderStatus || 'N/A',
      `₹${(order.total || 0).toFixed(2)}`,
      new Date(order.createdAt).toLocaleDateString()
    ])
  });

  doc.save('orders-report.pdf');
};



  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const filteredOrders = orders.filter(o =>
    o.user?.name.toLowerCase().includes(search.toLowerCase()) ||
    o.orderNumber?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-6">Loading orders...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📦 Admin - Manage All Orders</h2>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by user or order number"
          className="border px-3 py-1 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-3 py-1 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <CSVLink
          data={orders}
          filename={'orders.csv'}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Export CSV
        </CSVLink>

        <button
          onClick={downloadPDF}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="p-3">Order ID</th>
              <th className="p-3">User</th>
              <th className="p-3">Status</th>
              <th className="p-3">Total</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="border-t text-sm">
                <td className="p-3">{order.orderNumber || order._id.slice(-6)}</td>
                <td className="p-3">
                  {order.user?.name} <br />
                  <span className="text-gray-500 text-xs">{order.user?.email}</span>
                </td>
                <td className="p-3 capitalize">{order.orderStatus}</td>
                <td className="p-3">₹{order.total.toFixed(2)}</td>
                <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-3 space-x-2">
                  <Link
                    to={`/order/${order._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                  <select
                    className="border px-2 py-1 text-sm"
                    value={order.orderStatus}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
