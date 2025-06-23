import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Products from '../Products';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import axios from 'axios';

// Mock axios
vi.mock('axios');

// Create a new QueryClient for each test
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
      staleTime: 0,
    },
  },
});

// Mock products data
const mockProducts = [
  { 
    productId: 1, 
    name: 'Cheap Product', 
    description: 'A cheap product', 
    price: 10, 
    imgName: 'product1.jpg',
    sku: 'SKU1',
    unit: 'pc',
    supplierId: 1
  },
  { 
    productId: 2, 
    name: 'Medium Product', 
    description: 'A medium priced product', 
    price: 50, 
    imgName: 'product2.jpg',
    sku: 'SKU2',
    unit: 'pc',
    supplierId: 1
  },
  { 
    productId: 3, 
    name: 'Expensive Product', 
    description: 'An expensive product', 
    price: 100, 
    imgName: 'product3.jpg',
    sku: 'SKU3',
    unit: 'pc',
    supplierId: 1
  }
];

// Wrapper component with react-query provider
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('Products', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock successful axios response
    (axios.get as any).mockResolvedValue({ data: mockProducts });
  });
  it('renders loading state initially', async () => {
    render(<Products />, { wrapper: TestWrapper });
    
    // Loading state should show spinner
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders products after loading', async () => {
    render(<Products />, { wrapper: TestWrapper });
    
    // Wait for products to load
    await screen.findByText('Cheap Product');
    
    // All products should be visible
    expect(screen.getByText('Cheap Product')).toBeInTheDocument();
    expect(screen.getByText('Medium Product')).toBeInTheDocument();
    expect(screen.getByText('Expensive Product')).toBeInTheDocument();
    
    // Price filter should be visible
    expect(screen.getByText('Filter by Price')).toBeInTheDocument();
  });

  it('filters products by price', async () => {
    render(<Products />, { wrapper: TestWrapper });
    
    // Wait for products to load
    await screen.findByText('Cheap Product');
    
    // Get min and max price inputs
    const minInput = screen.getByLabelText('Minimum price input');
    const maxInput = screen.getByLabelText('Maximum price input');
    
    // Set min price to 40
    fireEvent.change(minInput, { target: { value: '40' } });
    
    // Apply filter
    const applyButton = screen.getByText('Apply');
    fireEvent.click(applyButton);
    
    // Cheap product should be filtered out
    expect(screen.queryByText('Cheap Product')).not.toBeInTheDocument();
    expect(screen.getByText('Medium Product')).toBeInTheDocument();
    expect(screen.getByText('Expensive Product')).toBeInTheDocument();
    
    // Set max price to 60
    fireEvent.change(maxInput, { target: { value: '60' } });
    fireEvent.click(applyButton);
    
    // Now only medium product should be visible
    expect(screen.queryByText('Cheap Product')).not.toBeInTheDocument();
    expect(screen.getByText('Medium Product')).toBeInTheDocument();
    expect(screen.queryByText('Expensive Product')).not.toBeInTheDocument();
    
    // Reset filter
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    
    // All products should be visible again
    expect(screen.getByText('Cheap Product')).toBeInTheDocument();
    expect(screen.getByText('Medium Product')).toBeInTheDocument();
    expect(screen.getByText('Expensive Product')).toBeInTheDocument();
  });
});
