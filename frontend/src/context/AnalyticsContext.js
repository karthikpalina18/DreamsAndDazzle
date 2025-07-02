import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AnalyticsContext = createContext();

// Initial state
const initialState = {
  dashboardStats: {
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    revenueGrowth: 0,
    ordersGrowth: 0,
    productsGrowth: 0,
    usersGrowth: 0
  },
  salesData: [],
  topProducts: [],
  recentOrders: [],
  userActivity: [],
  categoryStats: [],
  monthlyRevenue: [],
  orderStatusStats: {
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0
  },
  loading: false,
  error: null,
  dateRange: {
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    endDate: new Date()
  }
};

// Action types
const ANALYTICS_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_DASHBOARD_STATS: 'SET_DASHBOARD_STATS',
  SET_SALES_DATA: 'SET_SALES_DATA',
  SET_TOP_PRODUCTS: 'SET_TOP_PRODUCTS',
  SET_RECENT_ORDERS: 'SET_RECENT_ORDERS',
  SET_USER_ACTIVITY: 'SET_USER_ACTIVITY',
  SET_CATEGORY_STATS: 'SET_CATEGORY_STATS',
  SET_MONTHLY_REVENUE: 'SET_MONTHLY_REVENUE',
  SET_ORDER_STATUS_STATS: 'SET_ORDER_STATUS_STATS',
  SET_DATE_RANGE: 'SET_DATE_RANGE'
};

// Reducer
const analyticsReducer = (state, action) => {
  switch (action.type) {
    case ANALYTICS_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case ANALYTICS_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case ANALYTICS_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case ANALYTICS_ACTIONS.SET_DASHBOARD_STATS:
      return {
        ...state,
        dashboardStats: action.payload,
        loading: false,
        error: null
      };

    case ANALYTICS_ACTIONS.SET_SALES_DATA:
      return {
        ...state,
        salesData: action.payload,
        loading: false,
        error: null
      };

    case ANALYTICS_ACTIONS.SET_TOP_PRODUCTS:
      return {
        ...state,
        topProducts: action.payload,
        loading: false,
        error: null
      };

    case ANALYTICS_ACTIONS.SET_RECENT_ORDERS:
      return {
        ...state,
        recentOrders: action.payload,
        loading: false,
        error: null
      };

    case ANALYTICS_ACTIONS.SET_USER_ACTIVITY:
      return {
        ...state,
        userActivity: action.payload,
        loading: false,
        error: null
      };

    case ANALYTICS_ACTIONS.SET_CATEGORY_STATS:
      return {
        ...state,
        categoryStats: action.payload,
        loading: false,
        error: null
      };

    case ANALYTICS_ACTIONS.SET_MONTHLY_REVENUE:
      return {
        ...state,
        monthlyRevenue: action.payload,
        loading: false,
        error: null
      };

    case ANALYTICS_ACTIONS.SET_ORDER_STATUS_STATS:
      return {
        ...state,
        orderStatusStats: action.payload,
        loading: false,
        error: null
      };

    case ANALYTICS_ACTIONS.SET_DATE_RANGE:
      return {
        ...state,
        dateRange: action.payload
      };

    default:
      return state;
  }
};

// Provider component
export const AnalyticsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(analyticsReducer, initialState);

  // Get auth token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // API call helper
  const apiCall = async (url, options = {}) => {
    const token = getAuthToken();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'x-auth-token': token }),
        ...options.headers
      },
      ...options
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api${url}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  };

  // Get dashboard statistics
  const getDashboardStats = async (startDate, endDate) => {
    try {
      dispatch({ type: ANALYTICS_ACTIONS.SET_LOADING, payload: true });
      
      const queryParams = new URLSearchParams({
        startDate: startDate?.toISOString() || state.dateRange.startDate.toISOString(),
        endDate: endDate?.toISOString() || state.dateRange.endDate.toISOString()
      });

      // Since we don't have a specific analytics endpoint, we'll aggregate data from existing endpoints
      const [ordersResponse, productsResponse, usersResponse] = await Promise.all([
        apiCall('/orders'),
        apiCall('/products'),
        apiCall('/users')
      ]);

      // Calculate stats from the responses
      const totalOrders = ordersResponse.orders?.length || 0;
      const totalRevenue = ordersResponse.orders?.reduce((sum, order) => sum + (order.totalAmount || 0), 0) || 0;
      const totalProducts = productsResponse.products?.length || 0;
      const totalUsers = usersResponse.users?.length || 0;

      // Mock growth calculations (in real app, you'd compare with previous period)
      const dashboardStats = {
        totalRevenue,
        totalOrders,
        totalProducts,
        totalUsers,
        revenueGrowth: Math.floor(Math.random() * 20) - 10, // Random growth between -10% and 10%
        ordersGrowth: Math.floor(Math.random() * 15) - 5,
        productsGrowth: Math.floor(Math.random() * 10),
        usersGrowth: Math.floor(Math.random() * 25)
      };

      dispatch({ type: ANALYTICS_ACTIONS.SET_DASHBOARD_STATS, payload: dashboardStats });
      return { success: true, data: dashboardStats };
    } catch (error) {
      dispatch({ type: ANALYTICS_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Get sales data for charts
  const getSalesData = async (period = '30d') => {
    try {
      dispatch({ type: ANALYTICS_ACTIONS.SET_LOADING, payload: true });
      
      // Mock sales data - in real app, this would come from your analytics endpoint
      const generateMockSalesData = () => {
        const data = [];
        const days = period === '7d' ? 7 : period === '30d' ? 30 : 365;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        for (let i = 0; i < days; i++) {
          const date = new Date(startDate);
          date.setDate(date.getDate() + i);
          
          data.push({
            date: date.toISOString().split('T')[0],
            sales: Math.floor(Math.random() * 5000) + 1000,
            orders: Math.floor(Math.random() * 50) + 10,
            revenue: Math.floor(Math.random() * 10000) + 2000
          });
        }
        return data;
      };

      const salesData = generateMockSalesData();
      dispatch({ type: ANALYTICS_ACTIONS.SET_SALES_DATA, payload: salesData });
      return { success: true, data: salesData };
    } catch (error) {
      dispatch({ type: ANALYTICS_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Get top selling products
  const getTopProducts = async (limit = 10) => {
    try {
      dispatch({ type: ANALYTICS_ACTIONS.SET_LOADING, payload: true });
      
      const response = await apiCall('/products');
      
      // Mock top products with sales data
      const topProducts = response.products?.slice(0, limit).map(product => ({
        ...product,
        salesCount: Math.floor(Math.random() * 500) + 50,
        revenue: Math.floor(Math.random() * 10000) + 1000
      })) || [];

      // Sort by sales count
      topProducts.sort((a, b) => b.salesCount - a.salesCount);

      dispatch({ type: ANALYTICS_ACTIONS.SET_TOP_PRODUCTS, payload: topProducts });
      return { success: true, data: topProducts };
    } catch (error) {
      dispatch({ type: ANALYTICS_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Get recent orders
  const getRecentOrders = async (limit = 10) => {
    try {
      dispatch({ type: ANALYTICS_ACTIONS.SET_LOADING, payload: true });
      
      const response = await apiCall('/orders');
      const recentOrders = response.orders?.slice(0, limit) || [];

      dispatch({ type: ANALYTICS_ACTIONS.SET_RECENT_ORDERS, payload: recentOrders });
      return { success: true, data: recentOrders };
    } catch (error) {
      dispatch({ type: ANALYTICS_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Get user activity data
  const getUserActivity = async () => {
    try {
      dispatch({ type: ANALYTICS_ACTIONS.SET_LOADING, payload: true });
      
      // Mock user activity data
      const userActivity = [
        { hour: '00:00', users: Math.floor(Math.random() * 50) + 10 },
        { hour: '01:00', users: Math.floor(Math.random() * 30) + 5 },
        { hour: '02:00', users: Math.floor(Math.random() * 20) + 2 },
        { hour: '03:00', users: Math.floor(Math.random() * 15) + 1 },
        { hour: '04:00', users: Math.floor(Math.random() * 20) + 2 },
        { hour: '05:00', users: Math.floor(Math.random() * 30) + 5 },
        { hour: '06:00', users: Math.floor(Math.random() * 60) + 20 },
        { hour: '07:00', users: Math.floor(Math.random() * 80) + 30 },
        { hour: '08:00', users: Math.floor(Math.random() * 100) + 50 },
        { hour: '09:00', users: Math.floor(Math.random() * 120) + 60 },
        { hour: '10:00', users: Math.floor(Math.random() * 130) + 70 },
        { hour: '11:00', users: Math.floor(Math.random() * 140) + 80 },
        { hour: '12:00', users: Math.floor(Math.random() * 150) + 90 },
        { hour: '13:00', users: Math.floor(Math.random() * 140) + 80 },
        { hour: '14:00', users: Math.floor(Math.random() * 130) + 70 },
        { hour: '15:00', users: Math.floor(Math.random() * 120) + 60 },
        { hour: '16:00', users: Math.floor(Math.random() * 110) + 50 },
        { hour: '17:00', users: Math.floor(Math.random() * 100) + 45 },
        { hour: '18:00', users: Math.floor(Math.random() * 90) + 40 },
        { hour: '19:00', users: Math.floor(Math.random() * 80) + 35 },
        { hour: '20:00', users: Math.floor(Math.random() * 70) + 30 },
        { hour: '21:00', users: Math.floor(Math.random() * 60) + 25 },
        { hour: '22:00', users: Math.floor(Math.random() * 50) + 20 },
        { hour: '23:00', users: Math.floor(Math.random() * 40) + 15 }
      ];

      dispatch({ type: ANALYTICS_ACTIONS.SET_USER_ACTIVITY, payload: userActivity });
      return { success: true, data: userActivity };
    } catch (error) {
      dispatch({ type: ANALYTICS_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Get category statistics
  const getCategoryStats = async () => {
    try {
      dispatch({ type: ANALYTICS_ACTIONS.SET_LOADING, payload: true });
      
      const response = await apiCall('/products/categories');
      
      // Mock category stats
      const categoryStats = response.categories?.map(category => ({
        name: category,
        value: Math.floor(Math.random() * 1000) + 100,
        percentage: Math.floor(Math.random() * 30) + 5
      })) || [];

      dispatch({ type: ANALYTICS_ACTIONS.SET_CATEGORY_STATS, payload: categoryStats });
      return { success: true, data: categoryStats };
    } catch (error) {
      dispatch({ type: ANALYTICS_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Get monthly revenue data
  const getMonthlyRevenue = async () => {
    try {
      dispatch({ type: ANALYTICS_ACTIONS.SET_LOADING, payload: true });
      
      // Mock monthly revenue data for the last 12 months
      const monthlyRevenue = [];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      for (let i = 0; i < 12; i++) {
        monthlyRevenue.push({
          month: months[i],
          revenue: Math.floor(Math.random() * 50000) + 20000,
          orders: Math.floor(Math.random() * 500) + 100,
          growth: Math.floor(Math.random() * 40) - 20 // -20% to +20%
        });
      }

      dispatch({ type: ANALYTICS_ACTIONS.SET_MONTHLY_REVENUE, payload: monthlyRevenue });
      return { success: true, data: monthlyRevenue };
    } catch (error) {
      dispatch({ type: ANALYTICS_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Get order status statistics
  const getOrderStatusStats = async () => {
    try {
      dispatch({ type: ANALYTICS_ACTIONS.SET_LOADING, payload: true });
      
      const response = await apiCall('/orders');
      
      // Calculate order status stats
      const orderStatusStats = {
        pending: 0,
        processing: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0
      };

      response.orders?.forEach(order => {
        if (orderStatusStats.hasOwnProperty(order.status)) {
          orderStatusStats[order.status]++;
        }
      });

      dispatch({ type: ANALYTICS_ACTIONS.SET_ORDER_STATUS_STATS, payload: orderStatusStats });
      return { success: true, data: orderStatusStats };
    } catch (error) {
      dispatch({ type: ANALYTICS_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Set date range
  const setDateRange = (startDate, endDate) => {
    dispatch({ 
      type: ANALYTICS_ACTIONS.SET_DATE_RANGE, 
      payload: { startDate, endDate } 
    });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: ANALYTICS_ACTIONS.CLEAR_ERROR });
  };

  // Load all analytics data
  const loadAllAnalytics = async () => {
    await Promise.all([
      getDashboardStats(),
      getSalesData(),
      getTopProducts(),
      getRecentOrders(),
      getUserActivity(),
      getCategoryStats(),
      getMonthlyRevenue(),
      getOrderStatusStats()
    ]);
  };

  // Context value
  const value = {
    // State
    dashboardStats: state.dashboardStats,
    salesData: state.salesData,
    topProducts: state.topProducts,
    recentOrders: state.recentOrders,
    userActivity: state.userActivity,
    categoryStats: state.categoryStats,
    monthlyRevenue: state.monthlyRevenue,
    orderStatusStats: state.orderStatusStats,
    loading: state.loading,
    error: state.error,
    dateRange: state.dateRange,

    // Actions
    getDashboardStats,
    getSalesData,
    getTopProducts,
    getRecentOrders,
    getUserActivity,
    getCategoryStats,
    getMonthlyRevenue,
    getOrderStatusStats,
    setDateRange,
    clearError,
    loadAllAnalytics
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// Custom hook to use the Analytics context
export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

export default AnalyticsContext;