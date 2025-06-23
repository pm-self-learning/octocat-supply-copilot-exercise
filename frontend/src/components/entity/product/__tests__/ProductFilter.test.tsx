import { render, screen, fireEvent } from '@testing-library/react';
import ProductFilter from '../ProductFilter';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('ProductFilter', () => {
  const mockProducts = [
    { price: 10 },
    { price: 20 },
    { price: 30 },
    { price: 40 },
    { price: 50 }
  ];
  
  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it('renders with correct initial values', () => {
    render(<ProductFilter products={mockProducts} onFilterChange={mockOnFilterChange} />);
    
    // Check if component title is rendered
    expect(screen.getByText('Filter by Price')).toBeInTheDocument();
    
    // Check if min and max prices are displayed
    expect(screen.getByText('Min Price: $10')).toBeInTheDocument();
    expect(screen.getByText('Max Price: $50')).toBeInTheDocument();
    
    // Check if input fields are rendered with correct values
    const minInput = screen.getByLabelText('Minimum price input') as HTMLInputElement;
    const maxInput = screen.getByLabelText('Maximum price input') as HTMLInputElement;
    expect(minInput.value).toBe('10');
    expect(maxInput.value).toBe('50');
  });

  it('applies filter when Apply button is clicked', () => {
    render(<ProductFilter products={mockProducts} onFilterChange={mockOnFilterChange} />);
    
    // Change min and max values
    const minInput = screen.getByLabelText('Minimum price input') as HTMLInputElement;
    const maxInput = screen.getByLabelText('Maximum price input') as HTMLInputElement;
    
    fireEvent.change(minInput, { target: { value: '20' } });
    fireEvent.change(maxInput, { target: { value: '40' } });
    
    // Click Apply button
    const applyButton = screen.getByText('Apply');
    fireEvent.click(applyButton);
    
    // Check if onFilterChange was called with correct values
    expect(mockOnFilterChange).toHaveBeenCalledWith({ min: 20, max: 40 });
  });

  it('resets filter when Reset button is clicked', () => {
    render(<ProductFilter products={mockProducts} onFilterChange={mockOnFilterChange} />);
    
    // Change min and max values
    const minInput = screen.getByLabelText('Minimum price input') as HTMLInputElement;
    const maxInput = screen.getByLabelText('Maximum price input') as HTMLInputElement;
    
    fireEvent.change(minInput, { target: { value: '20' } });
    fireEvent.change(maxInput, { target: { value: '40' } });
    
    // Click Reset button
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    
    // Check if onFilterChange was called with initial values
    expect(mockOnFilterChange).toHaveBeenCalledWith({ min: 10, max: 50 });
    
    // Check if input fields were reset
    expect(minInput.value).toBe('10');
    expect(maxInput.value).toBe('50');
  });
  it('prevents min price from exceeding max price', () => {
    render(<ProductFilter products={mockProducts} onFilterChange={mockOnFilterChange} />);
    
    const minInput = screen.getByLabelText('Minimum price input') as HTMLInputElement;
    
    // Try to set min price higher than max price
    fireEvent.change(minInput, { target: { value: '60' } });
    
    // Apply the filter
    const applyButton = screen.getByText('Apply');
    fireEvent.click(applyButton);
    
    // Min price should be clamped to max price
    expect(minInput.value).toBe('50');
  });

  it('prevents max price from being less than min price', () => {
    render(<ProductFilter products={mockProducts} onFilterChange={mockOnFilterChange} />);
    
    const maxInput = screen.getByLabelText('Maximum price input') as HTMLInputElement;
    
    // Try to set max price lower than min price
    fireEvent.change(maxInput, { target: { value: '5' } });
    
    // Apply the filter
    const applyButton = screen.getByText('Apply');
    fireEvent.click(applyButton);
    
    // Max price should be clamped to min price
    expect(maxInput.value).toBe('10');
  });
});
