import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.product, qty: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'DECREMENT': {
      const item = state.items.find(i => i.id === action.id);
      if (item.qty === 1) {
        return { ...state, items: state.items.filter(i => i.id !== action.id) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.id ? { ...i, qty: i.qty - 1 } : i
        ),
      };
    }
    case 'INCREMENT':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.id ? { ...i, qty: i.qty + 1 } : i
        ),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
};

const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem('cart');
    return saved ? { items: JSON.parse(saved) } : { items: [] };
  } catch {
    return { items: [] };
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadFromStorage);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = state.items.reduce((sum, i) => sum + i.qty, 0);

  const addItem = (product) => dispatch({ type: 'ADD_ITEM', product });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', id });
  const decrement = (id) => dispatch({ type: 'DECREMENT', id });
  const increment = (id) => dispatch({ type: 'INCREMENT', id });
  const clearCart = () => dispatch({ type: 'CLEAR' });
  const getQty = (id) => state.items.find(i => i.id === id)?.qty || 0;

  return (
    <CartContext.Provider value={{ items: state.items, total, count, addItem, removeItem, decrement, increment, clearCart, getQty }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
