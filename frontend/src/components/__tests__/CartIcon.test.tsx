import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CartIcon from '../CartIcon';
import { CartContext } from '../../context/CartContext';

// Mock the CartContext
const createMockCartContext = (itemCount = 0) => ({
  items: [],
  addToCart: vi.fn(),
  removeFromCart: vi.fn(),
  updateQuantity: vi.fn(),
  clearCart: vi.fn(),
  itemCount,
  total: 0,
});

// Helper function to render CartIcon with context
const renderCartIcon = (itemCount = 0) => {
  const mockCartContext = createMockCartContext(itemCount);
  return render(
    <CartContext.Provider value={mockCartContext}>
      <BrowserRouter>
        <CartIcon />
      </BrowserRouter>
    </CartContext.Provider>
  );
};

describe('CartIcon Component', () => {
  it('should render the cart icon', () => {
    renderCartIcon();
    
    // Check if the link to cart is rendered
    const cartLink = screen.getByRole('link');
    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute('href', '/cart');
    
    // Check if the cart icon (svg) is rendered
    const cartIcon = screen.getByRole('link').querySelector('svg');
    expect(cartIcon).toBeInTheDocument();
  });

  it('should not show item count badge when cart is empty', () => {
    renderCartIcon(0);
    
    // There should be no element with text content of a number
    const badges = screen.queryByText(/\d+/);
    expect(badges).not.toBeInTheDocument();
  });

  it('should show the correct item count when cart has items', () => {
    renderCartIcon(5);
    
    // Check if the badge with the correct count is shown
    const badge = screen.getByText('5');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-primary');
  });

  it('should display 99+ when item count exceeds 99', () => {
    renderCartIcon(100);
    
    // Check if the badge shows 99+ instead of the actual count
    const badge = screen.getByText('99+');
    expect(badge).toBeInTheDocument();
  });
});