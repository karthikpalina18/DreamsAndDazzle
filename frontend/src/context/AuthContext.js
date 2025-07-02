import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

// Action types
const AUTH_ACTIONS = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Auth provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set axios default headers
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      loadUser();
    } else {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  // Load user
  const loadUser = async () => {
    try {
      const res = await axios.get('/api/auth/me');
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: res.data.user });
    } catch (error) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      const res = await axios.post('/api/auth/login', { email, password });
      
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: res.data.user });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: message });
      return { success: false, error: message };
    }
  };

  // Register
  const register = async (name, email, password, phone, address) => {
  try {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });

    const res = await axios.post('/api/auth/register', {
      name,
      email,
      password,
      phone,
      address
    });

    localStorage.setItem('token', res.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

    dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: res.data.user });
    return { success: true };
  } catch (error) {
    const message = error.response?.data?.message || 'Registration failed';
    dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: message });
    return { success: false, error: message };
  }
};

const updateProfile = async (profileData) => {
  try {
    const res = await axios.put('/api/auth/profile', profileData); // Adjust this endpoint if your backend is different
    dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: res.data.user });
    return { success: true };
  } catch (error) {
    const message = error.response?.data?.message || 'Profile update failed';
    dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: message });
    return { success: false, error: message };
  }
};

const changePassword = async (currentPassword, newPassword) => {
  try {
    const res = await axios.put('/api/auth/change-password', {
      currentPassword,
      newPassword
    });

    return { success: true, message: res.data.message };
  } catch (error) {
    const message = error.response?.data?.message || 'Password change failed';
    dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: message });
    return { success: false, error: message };
  }
};

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
    updateProfile,
    changePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;