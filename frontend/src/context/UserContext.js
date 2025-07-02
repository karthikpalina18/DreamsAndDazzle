import React, { createContext, useContext, useReducer, useEffect } from 'react';

const UserContext = createContext();

// Initial state
const initialState = {
  users: [],
  currentUser: null,
  userStats: {
    totalUsers: 0,
    activeUsers: 0,
    newUsersThisMonth: 0,
    premiumUsers: 0
  },
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    limit: 10
  }
};

// Action types
const USER_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_USERS: 'SET_USERS',
  SET_USER: 'SET_USER',
  ADD_USER: 'ADD_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  SET_USER_STATS: 'SET_USER_STATS',
  SET_PAGINATION: 'SET_PAGINATION',
  CLEAR_CURRENT_USER: 'CLEAR_CURRENT_USER'
};

// Reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case USER_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case USER_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case USER_ACTIONS.SET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null
      };

    case USER_ACTIONS.SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
        error: null
      };

    case USER_ACTIONS.ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
        loading: false,
        error: null
      };

    case USER_ACTIONS.UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user =>
          user._id === action.payload._id ? action.payload : user
        ),
        currentUser: state.currentUser?._id === action.payload._id ? action.payload : state.currentUser,
        loading: false,
        error: null
      };

    case USER_ACTIONS.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload),
        currentUser: state.currentUser?._id === action.payload ? null : state.currentUser,
        loading: false,
        error: null
      };

    case USER_ACTIONS.SET_USER_STATS:
      return {
        ...state,
        userStats: action.payload,
        loading: false,
        error: null
      };

    case USER_ACTIONS.SET_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload }
      };

    case USER_ACTIONS.CLEAR_CURRENT_USER:
      return {
        ...state,
        currentUser: null
      };

    default:
      return state;
  }
};

// Provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

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

  // Get all users (Admin only)
  const getUsers = async (page = 1, limit = 10, search = '') => {
    try {
      dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
      
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search })
      });

      const data = await apiCall(`/users?${queryParams}`);
      
      dispatch({ type: USER_ACTIONS.SET_USERS, payload: data.users });
      dispatch({ 
        type: USER_ACTIONS.SET_PAGINATION, 
        payload: {
          currentPage: data.pagination.currentPage,
          totalPages: data.pagination.totalPages,
          totalUsers: data.pagination.total,
          limit: data.pagination.limit
        }
      });

      return { success: true, data };
    } catch (error) {
      dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Get single user (Admin only)
  const getUser = async (userId) => {
    try {
      dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
      
      const data = await apiCall(`/users/${userId}`);
      
      dispatch({ type: USER_ACTIONS.SET_USER, payload: data.user });
      return { success: true, data: data.user };
    } catch (error) {
      dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Update user (Admin only)
  const updateUser = async (userId, userData) => {
    try {
      dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
      
      const data = await apiCall(`/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(userData)
      });
      
      dispatch({ type: USER_ACTIONS.UPDATE_USER, payload: data.user });
      return { success: true, data: data.user };
    } catch (error) {
      dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Delete user (Admin only)
  const deleteUser = async (userId) => {
    try {
      dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
      
      await apiCall(`/users/${userId}`, {
        method: 'DELETE'
      });
      
      dispatch({ type: USER_ACTIONS.DELETE_USER, payload: userId });
      return { success: true };
    } catch (error) {
      dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Get user statistics (Admin only)
  const getUserStats = async () => {
    try {
      dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
      
      const data = await apiCall('/users/stats');
      
      dispatch({ type: USER_ACTIONS.SET_USER_STATS, payload: data.stats });
      return { success: true, data: data.stats };
    } catch (error) {
      dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: USER_ACTIONS.CLEAR_ERROR });
  };

  // Clear current user
  const clearCurrentUser = () => {
    dispatch({ type: USER_ACTIONS.CLEAR_CURRENT_USER });
  };

  // Context value
  const value = {
    // State
    users: state.users,
    currentUser: state.currentUser,
    userStats: state.userStats,
    loading: state.loading,
    error: state.error,
    pagination: state.pagination,

    // Actions
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getUserStats,
    clearError,
    clearCurrentUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the User context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;