import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Package, User, MapPin, Calendar, CreditCard, ArrowLeft, CheckCircle, XCircle, Clock, Truck } from 'lucide-react';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`/api/orders/${id}`);
      setOrder(res.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-6 h-6 text-red-500" />;
      case 'shipped':
        return <Truck className="w-6 h-6 text-blue-500" />;
      default:
        return <Clock className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      case 'shipped':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-yellow-200/50 p-8">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg font-semibold text-gray-700">Loading order details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex items-center justify-center p-4">
        <div className={`w-full max-w-md transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-yellow-200/50 overflow-hidden">
            <div className="bg-gradient-to-r from-red-400 to-red-500 p-8 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/80 to-red-500/80"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <XCircle className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Order Not Found</h2>
                <p className="text-red-100">We couldn't locate this order</p>
              </div>
            </div>
            <div className="p-8 text-center">
              <Link 
                to="/my-orders" 
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to My Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const {
    _id,
    items,
    user,
    shippingAddress,
    subtotal,
    tax,
    shippingCost,
    total,
    orderStatus,
    paymentStatus,
    createdAt,
    deliveredAt,
    cancelledAt,
    cancellationReason
  } = order;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-1/4 right-16 w-16 h-16 bg-yellow-300 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-400 rounded-full opacity-50 animate-ping"></div>
        <div className="absolute bottom-1/3 right-20 w-24 h-24 bg-yellow-200 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute top-1/2 left-8 w-8 h-8 bg-yellow-500 rounded-full opacity-60 animate-bounce"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-yellow-200/50 overflow-hidden mb-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-8 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/80 to-yellow-500/80"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg animate-bounce">
                  <Package className="w-10 h-10 text-yellow-500" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2 animate-fade-in">Order Details</h2>
                <p className="text-yellow-100 animate-slide-up">Track your order and view details</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="bg-gray-50/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Package className="w-5 h-5 text-yellow-500" />
                      Order Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Order ID:</span> {_id}</p>
                      <p><span className="font-medium">Placed On:</span> {new Date(createdAt).toLocaleString()}</p>
                      {deliveredAt && <p><span className="font-medium">Delivered On:</span> {new Date(deliveredAt).toLocaleString()}</p>}
                      {cancelledAt && (
                        <>
                          <p className="text-red-600"><span className="font-medium">Cancelled On:</span> {new Date(cancelledAt).toLocaleString()}</p>
                          <p><span className="font-medium">Reason:</span> {cancellationReason}</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <User className="w-5 h-5 text-yellow-500" />
                      Customer Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Name:</span> {shippingAddress?.name}</p>
                      <p><span className="font-medium">Email:</span> {user?.email}</p>
                      <p><span className="font-medium">Phone:</span> {shippingAddress?.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(orderStatus)}
                        Order Status
                      </div>
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(orderStatus)}`}>
                        {orderStatus}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(paymentStatus)}`}>
                        Payment: {paymentStatus || 'pending'}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-yellow-500" />
                      Shipping Address
                    </h3>
                    <p className="text-sm text-gray-600">
                      {shippingAddress?.street}, {shippingAddress?.city}, {shippingAddress?.state} - {shippingAddress?.zipCode}, {shippingAddress?.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-gray-50/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 mb-6">
                <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-yellow-500" />
                  Order Items
                </h3>
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow duration-200">
                      <div>
                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-600">₹{item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total */}
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
                <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-yellow-500" />
                  Order Summary
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax:</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span>₹{shippingCost.toFixed(2)}</span>
                  </div>
                  <hr className="border-yellow-300" />
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total:</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Back Button */}
              <div className="mt-8">
                <Link 
                  to="/my-orders" 
                  className="inline-flex items-center gap-3 group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                  Back to My Orders
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full opacity-70 animate-pulse"></div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
};

export default OrderDetails;