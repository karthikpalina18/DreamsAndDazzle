import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';

const OrderContext = createContext();

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    
    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.payload.orders,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        total: action.payload.total,
        loading: false,
        error: null
      };
    
    case 'SET_ORDER':
      return {
        ...state,
        currentOrder: action.payload,
        loading: false,
        error: null
      };
    
    case 'SET_MY_ORDERS':
      return {
        ...state,
        myOrders: action.payload,
        loading: false,
        error: null
      };
    
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...(state.orders || [])],
        myOrders: [action.payload, ...(state.myOrders || [])],
        loading: false
      };
    
    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders?.map(order =>
          order._id === action.payload._id ? action.payload : order
        ),
        myOrders: state.myOrders?.map(order =>
          order._id === action.payload._id ? action.payload : order
        ),
        currentOrder: state.currentOrder?._id === action.payload._id 
          ? action.payload 
          : state.currentOrder,
        loading: false
      };
    
    case 'SET_ORDER_STATS':
      return {
        ...state,
        orderStats: action.payload,
        loading: false
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

const initialState = {
  orders: [],
  myOrders: [],
  currentOrder: null,
  orderStats: null,
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
  total: 0
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Create order
  // In your OrderContext.js, update the createOrder function:
const createOrder = async (orderData) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    const token = localStorage.getItem('token');
    const response = await axios.post('/api/orders', orderData, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

dispatch({ type: 'ADD_ORDER', payload: response.data.order });
 // Note: backend returns { message, order }
    return { success: true, data: response.data.order };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to create order';
    dispatch({ type: 'SET_ERROR', payload: errorMessage });
    return { success: false, error: errorMessage };
  }
};

  // Get user's orders
  const fetchMyOrders = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/orders/my-orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      dispatch({ type: 'SET_MY_ORDERS', payload: response.data });
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch orders';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Get single order
  const fetchOrder = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/orders/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      dispatch({ type: 'SET_ORDER', payload: response.data });
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch order';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Get all orders (Admin)
  const fetchAllOrders = async (filters = {}) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key] && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });
      
      const response = await axios.get(`/api/orders?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      dispatch({ type: 'SET_ORDERS', payload: response.data });
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch orders';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Update order status (Admin)
  const updateOrderStatus = async (id, statusData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const token = localStorage.getItem('token');
      const response = await axios.put(`/api/orders/${id}/status`, statusData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      dispatch({ type: 'UPDATE_ORDER', payload: response.data });
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update order status';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Cancel order
  const cancelOrder = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const token = localStorage.getItem('token');
      const response = await axios.put(`/api/orders/${id}/cancel`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      dispatch({ type: 'UPDATE_ORDER', payload: response.data });
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to cancel order';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Get order statistics (Admin)
  const fetchOrderStats = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/orders/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      dispatch({ type: 'SET_ORDER_STATS', payload: response.data });
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch order statistics';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Helper functions
  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'confirmed':
        return 'text-blue-600 bg-blue-100';
      case 'processing':
        return 'text-purple-600 bg-purple-100';
      case 'shipped':
        return 'text-indigo-600 bg-indigo-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'paid':
        return 'text-green-600 bg-green-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatOrderStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const calculateOrderTotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value = {
    ...state,
    setLoading,
    setError,
    clearError,
    createOrder,
    fetchMyOrders,
    fetchOrder,
    fetchAllOrders,
    updateOrderStatus,
    cancelOrder,
    fetchOrderStats,
    getOrderStatusColor,
    getPaymentStatusColor,
    formatOrderStatus,
    calculateOrderTotal
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};