import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  unit: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getItemCount: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log('Loaded cart from localStorage:', parsedCart);
        setItems(parsedCart);
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    console.log('Cart updated, saving to localStorage:', items);
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: CartItem) => {
    console.log('Adding item to cart:', newItem);
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(item => item.productId === newItem.productId);
      
      if (existingItemIndex >= 0) {
        console.log('Item already exists in cart, updating quantity');
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity
        };
        return updatedItems;
      } else {
        console.log('Adding new item to cart');
        return [...currentItems, newItem];
      }
    });
  };

  const removeItem = (productId: number) => {
    console.log('Removing item from cart:', productId);
    setItems(currentItems => currentItems.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    console.log('Updating item quantity in cart:', { productId, quantity });
    setItems(currentItems => 
      currentItems.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const getItemCount = () => {
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);
    console.log('Total item count in cart:', itemCount);
    return itemCount;
  };

  const clearCart = () => {
    console.log('Clearing cart');
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, getItemCount, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};