import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';
import { ReactNode } from 'react';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Sample cart item for testing
const sampleCartItem = {
  productId: 1,
  name: 'Test Product',
  price: 19.99,
  quantity: 1,
  imgName: 'test-image.png'
};

// Wrapper component for hooks testing
const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  beforeEach(() => {
    // Clear localStorage and reset mocks before each test
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    expect(result.current.items).toEqual([]);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.total).toBe(0);
  });

  it('should load cart from localStorage', () => {
    // Setup localStorage with a saved cart
    const savedCart = [sampleCartItem];
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(savedCart));
    
    const { result } = renderHook(() => useCart(), { wrapper });
    
    expect(result.current.items).toEqual(savedCart);
    expect(result.current.itemCount).toBe(1);
    expect(result.current.total).toBe(19.99);
  });

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addToCart(sampleCartItem);
    });
    
    expect(result.current.items).toEqual([sampleCartItem]);
    expect(result.current.itemCount).toBe(1);
    expect(result.current.total).toBe(19.99);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('cart', JSON.stringify([sampleCartItem]));
  });

  it('should update quantity for existing item', () => {
    // Setup initial cart with an item
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([sampleCartItem]));
    
    const { result } = renderHook(() => useCart(), { wrapper });
    
    // Add same product again (should update quantity)
    act(() => {
      result.current.addToCart(sampleCartItem);
    });
    
    const expectedItem = { ...sampleCartItem, quantity: 2 };
    expect(result.current.items).toEqual([expectedItem]);
    expect(result.current.itemCount).toBe(2);
    expect(result.current.total).toBe(39.98);
  });

  it('should remove item from cart', () => {
    // Setup initial cart with an item
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([sampleCartItem]));
    
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.removeFromCart(sampleCartItem.productId);
    });
    
    expect(result.current.items).toEqual([]);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.total).toBe(0);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
  });

  it('should update item quantity', () => {
    // Setup initial cart with an item
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([sampleCartItem]));
    
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.updateQuantity(sampleCartItem.productId, 3);
    });
    
    const expectedItem = { ...sampleCartItem, quantity: 3 };
    expect(result.current.items).toEqual([expectedItem]);
    expect(result.current.itemCount).toBe(3);
    expect(result.current.total).toBe(59.97);
  });
  
  it('should remove item when quantity is updated to 0', () => {
    // Setup initial cart with an item
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([sampleCartItem]));
    
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.updateQuantity(sampleCartItem.productId, 0);
    });
    
    expect(result.current.items).toEqual([]);
    expect(result.current.itemCount).toBe(0);
  });

  it('should clear cart', () => {
    // Setup initial cart with an item
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([sampleCartItem]));
    
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.clearCart();
    });
    
    expect(result.current.items).toEqual([]);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.total).toBe(0);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
  });

  it('should calculate correct total price', () => {
    // Setup initial cart with multiple items
    const multipleItems = [
      sampleCartItem,
      { ...sampleCartItem, productId: 2, name: 'Test Product 2', price: 29.99, quantity: 2 }
    ];
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(multipleItems));
    
    const { result } = renderHook(() => useCart(), { wrapper });
    
    // Total should be 19.99 + (29.99 * 2) = 79.97
    expect(result.current.total).toBe(79.97);
  });
});