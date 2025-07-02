import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
        loading: false
      };

    case 'ADD_TO_CART':
      const existingItem = state.items.find(
        item =>
          item.product._id === action.payload.product._id &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product._id === action.payload.product._id &&
            item.color === action.payload.color &&
            item.size === action.payload.size
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload]
        };
      }

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items
          .map(item =>
            item.product._id === action.payload.productId &&
            item.color === action.payload.color &&
            item.size === action.payload.size
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
          .filter(item => item.quantity > 0)
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(
          item =>
            !(
              item.product._id === action.payload.productId &&
              item.color === action.payload.color &&
              item.size === action.payload.size
            )
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
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
  items: [],
  loading: false,
  error: null
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    dispatch({ type: 'LOAD_CART', payload: savedCart });
  }, []);

  useEffect(() => {
    if (!state.loading) {
      localStorage.setItem('cart', JSON.stringify(state.items));
    }
  }, [state.items, state.loading]);

  const addToCart = (product, quantity = 1, color = '', size = '') => {
    try {
      const price = product.price * (1 - (product.discount || 0) / 100);

      const cartItem = {
        product,
        quantity,
        color,
        size,
        price
      };

      dispatch({ type: 'ADD_TO_CART', payload: cartItem });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const updateQuantity = (productId, quantity, color = '', size = '') => {
    try {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { productId, quantity, color, size }
      });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const removeFromCart = (productId, color = '', size = '') => {
    try {
      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: { productId, color, size }
      });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const clearCart = () => {
    try {
      dispatch({ type: 'CLEAR_CART' });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const getTaxAmount = (subtotal = getCartTotal()) => {
    return subtotal * 0.1; // 10% tax
  };

  const getShippingCost = (subtotal = getCartTotal()) => {
    return subtotal > 500 ? 0 : 50;
  };

  const getFinalTotal = () => {
    const subtotal = getCartTotal();
    const tax = getTaxAmount(subtotal);
    const shipping = getShippingCost(subtotal);
    return subtotal + tax + shipping;
  };

  // ✅ New helper: format items for order creation
  const getOrderFormattedItems = () => {
    return state.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity
    }));
  };

  const value = {
    ...state,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    clearError,
    getCartTotal,
    getCartItemsCount,
    getTaxAmount,
    getShippingCost,
    getFinalTotal,
    getOrderFormattedItems
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
