import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Cart from '../Cart';
import { CartContext } from '../../context/CartContext';

// Sample cart items for testing
const sampleCartItems = [
  {
    productId: 1,
    name: 'Test Product 1',
    price: 19.99,
    quantity: 2,
    imgName: 'test-image-1.png'
  },
  {
    productId: 2,
    name: 'Test Product 2',
    price: 29.99,
    quantity: 1,
    imgName: 'test-image-2.png'
  }
];

// Mock functions
const mockUpdateQuantity = vi.fn();
const mockRemoveFromCart = vi.fn();

// Helper function to render Cart with context
const renderCart = (items = [], total = 0) => {
  const mockCartContext = {
    items,
    addToCart: vi.fn(),
    removeFromCart: mockRemoveFromCart,
    updateQuantity: mockUpdateQuantity,
    clearCart: vi.fn(),
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    total
  };

  return render(
    <CartContext.Provider value={mockCartContext}>
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    </CartContext.Provider>
  );
};

describe('Cart Component', () => {
  it('should display empty cart message when cart is empty', () => {
    renderCart();
    
    // Check for empty cart message
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    
    // Check for continue shopping link
    const continueShoppingLink = screen.getByText('Continue Shopping');
    expect(continueShoppingLink).toBeInTheDocument();
    expect(continueShoppingLink).toHaveAttribute('href', '/products');
  });

  it('should display cart items when cart has items', () => {
    const total = sampleCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    renderCart(sampleCartItems, total);
    
    // Check if product names are displayed
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    
    // Check if prices are displayed correctly
    expect(screen.getByText('$19.99')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    
    // Check if quantities are displayed correctly
    const quantities = screen.getAllByText(/\d+/).filter(el => el.textContent === '2' || el.textContent === '1');
    expect(quantities.length).toBeGreaterThan(0);
    
    // Check if total is displayed correctly (19.99 * 2 + 29.99 * 1 = 69.97)
    expect(screen.getByText('$69.97')).toBeInTheDocument();
    
    // Check if checkout button exists
    expect(screen.getByText('Checkout')).toBeInTheDocument();
  });

  it('should call updateQuantity when increasing quantity', () => {
    renderCart(sampleCartItems);
    
    // Get all increase buttons (there should be one for each product)
    const increaseButtons = screen.getAllByText('+');
    
    // Click the increase button for the first product
    fireEvent.click(increaseButtons[0]);
    
    // Check if updateQuantity was called with correct arguments
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3); // productId=1, new quantity=2+1=3
  });

  it('should call updateQuantity when decreasing quantity', () => {
    renderCart(sampleCartItems);
    
    // Get all decrease buttons (there should be one for each product)
    const decreaseButtons = screen.getAllByText('-');
    
    // Click the decrease button for the first product
    fireEvent.click(decreaseButtons[0]);
    
    // Check if updateQuantity was called with correct arguments
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1); // productId=1, new quantity=2-1=1
  });

  it('should call removeFromCart when remove button is clicked', () => {
    renderCart(sampleCartItems);
    
    // Get all remove buttons (should be one per product, but we need to find them by their SVG icon)
    const removeButtons = screen.getAllByRole('button').filter(button => 
      button.getAttribute('aria-label')?.includes('Remove')
    );
    
    // Click the remove button for the first product
    fireEvent.click(removeButtons[0]);
    
    // Check if removeFromCart was called with the correct product ID
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });

  it('should display correct total items count', () => {
    renderCart(sampleCartItems);
    
    // Total items should be 3 (2 + 1)
    expect(screen.getByText('Total Items:')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should show alert when checkout button is clicked', () => {
    // Mock the alert function
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    renderCart(sampleCartItems);
    
    // Click the checkout button
    const checkoutButton = screen.getByText('Checkout');
    fireEvent.click(checkoutButton);
    
    // Check if alert was called with the correct message
    expect(alertMock).toHaveBeenCalledWith('Checkout functionality coming soon!');
    
    // Clean up the mock
    alertMock.mockRestore();
  });
});