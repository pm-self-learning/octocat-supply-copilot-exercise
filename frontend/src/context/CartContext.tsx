import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// Define the cart item interface
export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imgName: string;
}

// Define the cart context interface
interface CartContextType {
  items: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
}

// Create the cart context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a provider component
export function CartProvider({ children }: { children: ReactNode }) {
  // Initialize cart items from local storage or empty array
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Calculate total items in cart
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  
  // Calculate total price
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // Add a product to the cart
  const addToCart = (product: CartItem) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(item => item.productId === product.productId);
      
      if (existingItemIndex >= 0) {
        // If the item already exists, update its quantity
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + product.quantity
        };
        return updatedItems;
      }
      
      // If it's a new item, add it to the cart
      return [...currentItems, product];
    });
  };

  // Remove a product from the cart
  const removeFromCart = (productId: number) => {
    setItems(currentItems => currentItems.filter(item => item.productId !== productId));
  };

  // Update the quantity of a product
  const updateQuantity = (productId: number, quantity: number) => {
    setItems(currentItems => 
      currentItems.map(item => 
        item.productId === productId 
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0) // Remove items with quantity 0
    );
  };

  // Clear the cart
  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart,
        itemCount,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}