import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Eye,
  Edit,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  Calendar,
  DollarSign,
  User,
  Phone,
  Mail,
  MapPin,
  Download,
  RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual API call
      setTimeout(() => {
        setOrders([
          {
            id: '#12345',
            customer: {
              name: 'John Doe',
              email: 'john@example.com',
              phone: '+1 234 567 8900'
            },
            items: [
              { name: 'Wireless Headphones', quantity: 1, price: 299.99 },
              { name: 'Phone Case', quantity: 2, price: 24.99 }
            ],
            total: 349.97,
            status: 'completed',
            paymentStatus: 'paid',
            shippingAddress: '123 Main St, New York, NY 10001',
            createdAt: '2025-01-15T10:30:00Z',
            updatedAt: '2025-01-16T14:20:00Z'
          },
          {
            id: '#12346',
            customer: {
              name: 'Jane Smith',
              email: 'jane@example.com',
              phone: '+1 234 567 8901'
            },
            items: [
              { name: 'Smart Watch', quantity: 1, price: 199.99 }
            ],
            total: 199.99,
            status: 'pending',
            paymentStatus: 'paid',
            shippingAddress: '456 Oak Ave, Los Angeles, CA 90210',
            createdAt: '2025-01-15T09:15:00Z',
            updatedAt: '2025-01-15T09:15:00Z'
          },
          {
            id: '#12347',
            customer: {
              name: 'Bob Wilson',
              email: 'bob@example.com',
              phone: '+1 234 567 8902'
            },
            items: [
              { name: 'Laptop Stand', quantity: 1, price: 89.99 },
              { name: 'Wireless Mouse', quantity: 1, price: 49.99 },
              { name: 'Keyboard', quantity: 1, price: 129.99 }
            ],
            total: 269.97,
            status: 'shipped',
            paymentStatus: 'paid',
            shippingAddress: '789 Pine St, Chicago, IL 60601',
            createdAt: '2025-01-14T16:45:00Z',
            updatedAt: '2025-01-15T11:30:00Z'
          },
          {
            id: '#12348',
            customer: {
              name: 'Alice Brown',
              email: 'alice@example.com',
              phone: '+1 234 567 8903'
            },
            items: [
              { name: 'Water Bottle', quantity: 3, price: 29.99 }
            ],
            total: 89.97,
            status: 'processing',
            paymentStatus: 'paid',
            shippingAddress: '321 Elm St, Miami, FL 33101',
            createdAt: '2025-01-14T11:20:00Z',
            updatedAt: '2025-01-14T15:10:00Z'
          },
          {
            id: '#12349',
            customer: {
              name: 'Charlie Davis',
              email: 'charlie@example.com',
              phone: '+1 234 567 8904'
            },
            items: [
              { name: 'Gaming Chair', quantity: 1, price: 449.99 }
            ],
            total: 449.99,
            status: 'cancelled',
            paymentStatus: 'refunded',
            shippingAddress: '654 Maple Dr, Seattle, WA 98101',
            createdAt: '2025-01-13T14:30:00Z',
            updatedAt: '2025-01-14T09:45:00Z'
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // Simulate API call
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
          : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const OrderCard = ({ order }) => (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-yellow-200/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedOrders.includes(order.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedOrders([...selectedOrders, order.id]);
                } else {
                  setSelectedOrders(selectedOrders.filter(id => id !== order.id));
                }
              }}
              className="w-4 h-4 text-yellow-600 rounded border-gray-300 focus:ring-yellow-500"
            />
            <h3 className="text-lg font-bold text-gray-800">{order.id}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)}
              {order.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="font-semibold text-gray-800">{order.customer.name}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{order.customer.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{order.customer.phone}</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <span className="font-bold text-xl text-gray-800">${order.total}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{formatDate(order.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{order.items.length} items</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
            <span className="text-sm text-gray-600">{order.shippingAddress}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-semibold text-gray-800 mb-2">Items:</h4>
          <div className="space-y-1">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.quantity}x {item.name}</span>
                <span className="font-medium text-gray-800">${(item.quantity * item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-6">
          <button
            onClick={() => navigate(`/orders/${order.id}`)}
            className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-2 px-4 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
          
          {order.status !== 'completed' && order.status !== 'cancelled' && (
            <select
              value={order.status}
              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
              className="px-3 py-2 border border-yellow-200 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg font-medium text-gray-700">Loading orders...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-yellow-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
                Orders
              </h1>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-medium">
                {orders.length} orders
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-yellow-600 transition-colors duration-200"
              >
                ← Back to Dashboard
              </button>
              <button
                onClick={fetchOrders}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 font-medium flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-yellow-200/50 p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {selectedOrders.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{selectedOrders.length} selected</span>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm">
                    Export Selected
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="w-full pl-10 pr-4 py-2 border border-yellow-200 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="px-4 py-2 border border-yellow-200 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
              className="px-4 py-2 border border-yellow-200 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
              className="px-4 py-2 border border-yellow-200 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            
            <select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-');
                setFilters({...filters, sortBy, sortOrder});
              }}
              className="px-4 py-2 border border-yellow-200 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="total-desc">Highest Amount</option>
              <option value="total-asc">Lowest Amount</option>
            </select>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders found</h3>
            <p className="text-gray-600">Orders will appear here once customers start purchasing.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;