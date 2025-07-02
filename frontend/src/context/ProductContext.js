import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';

const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload.products,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        total: action.payload.total,
        loading: false,
        error: null
      };
    
    case 'SET_PRODUCT':
      return {
        ...state,
        currentProduct: action.payload,
        loading: false,
        error: null
      };
    
    case 'SET_FEATURED_PRODUCTS':
      return {
        ...state,
        featuredProducts: action.payload,
        loading: false,
        error: null
      };
    
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
        loading: false,
        error: null
      };
    
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
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
    
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [action.payload, ...state.products],
        loading: false
      };
    
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product._id === action.payload._id ? action.payload : product
        ),
        currentProduct: state.currentProduct?._id === action.payload._id 
          ? action.payload 
          : state.currentProduct,
        loading: false
      };
    
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product._id !== action.payload),
        loading: false
      };
    
    case 'ADD_REVIEW':
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          reviews: [...(state.currentProduct.reviews || []), action.payload.review],
          rating: action.payload.rating
        }
      };
    
    default:
      return state;
  }
};

const initialState = {
  products: [],
  currentProduct: null,
  featuredProducts: [],
  categories: [],
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
  total: 0,
  filters: {
    category: '',
    search: '',
    sort: 'newest',
    minPrice: 0,
    maxPrice: 10000,
    page: 1,
    limit: 12
  }
};

// ProductProvider component
const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const setFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  // Fetch products with filters
  const fetchProducts = async (filters = state.filters) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key] && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });
      
      const response = await axios.get(`/api/products?${params}`);
      dispatch({ type: 'SET_PRODUCTS', payload: response.data });
      
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch products';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Fetch single product
  const fetchProduct = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await axios.get(`/api/products/${id}`);
      dispatch({ type: 'SET_PRODUCT', payload: response.data });
      
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch product';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Fetch featured products
  const fetchFeaturedProducts = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await axios.get('/api/products?featured=true&limit=8');
      dispatch({ type: 'SET_FEATURED_PRODUCTS', payload: response.data.products });
      
      return { success: true, data: response.data.products };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch featured products';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Fetch categories
  // const fetchCategories = async () => {
  //   try {
  //     const response = await axios.get('/api/products/categories');
  //     dispatch({ type: 'SET_CATEGORIES', payload: response.data });
      
  //     return { success: true, data: response.data };
  //   } catch (error) {
  //     const errorMessage = error.response?.data?.message || 'Failed to fetch categories';
  //     dispatch({ type: 'SET_ERROR', payload: errorMessage });
  //     return { success: false, error: errorMessage };
  //   }
  // };

  // Create product (Admin)
  const createProduct = async (productData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      Object.keys(productData).forEach(key => {
        if (key === 'images') {
          productData[key].forEach(image => {
            formData.append('images', image);
          });
        } else if (typeof productData[key] === 'object') {
          formData.append(key, JSON.stringify(productData[key]));
        } else {
          formData.append(key, productData[key]);
        }
      });
      
      const response = await axios.post('/api/products', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      dispatch({ type: 'ADD_PRODUCT', payload: response.data });
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create product';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Update product (Admin)
  const updateProduct = async (id, productData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      Object.keys(productData).forEach(key => {
        if (key === 'images') {
          productData[key].forEach(image => {
            formData.append('images', image);
          });
        } else if (typeof productData[key] === 'object') {
          formData.append(key, JSON.stringify(productData[key]));
        } else {
          formData.append(key, productData[key]);
        }
      });
      
      const response = await axios.put(`/api/products/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      dispatch({ type: 'UPDATE_PRODUCT', payload: response.data });
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update product';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Delete product (Admin)
  const deleteProduct = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const token = localStorage.getItem('token');
      await axios.delete(`/api/products/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete product';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Add review
  const addReview = async (productId, reviewData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/products/${productId}/reviews`, reviewData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      dispatch({ type: 'ADD_REVIEW', payload: response.data });
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add review';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };
  const fetchCategories = async () => {
  try {
    const response = await axios.get('/api/products/categories');

    // ✅ FIX: Extract the array from the object
    dispatch({ type: 'SET_CATEGORIES', payload: response.data.categories });

    return { success: true, data: response.data.categories };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch categories';
    dispatch({ type: 'SET_ERROR', payload: errorMessage });
    return { success: false, error: errorMessage };
  }
};


  const value = {
    ...state,
    setLoading,
    setError,
    clearError,
    setFilters,
    fetchProducts,
    fetchProduct,
    fetchFeaturedProducts,
    fetchCategories,
    createProduct,
    updateProduct,
    deleteProduct,
    addReview
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook
const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

// Export both as named exports AND as default export
export { ProductProvider, useProducts };
export default { ProductProvider, useProducts };