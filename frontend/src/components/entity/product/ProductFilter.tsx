import { useState } from 'react';

interface ProductFilterProps {
  onFilterChange: (minPrice: number | null, maxPrice: number | null) => void;
}

export default function ProductFilter({ onFilterChange }: ProductFilterProps) {
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const handleMinPriceChange = (value: string) => {
    setMinPrice(value);
    const minValue = value === '' ? null : parseFloat(value);
    const maxValue = maxPrice === '' ? null : parseFloat(maxPrice);
    onFilterChange(minValue, maxValue);
  };

  const handleMaxPriceChange = (value: string) => {
    setMaxPrice(value);
    const minValue = minPrice === '' ? null : parseFloat(minPrice);
    const maxValue = value === '' ? null : parseFloat(value);
    onFilterChange(minValue, maxValue);
  };

  const handleClearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    onFilterChange(null, null);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      <h3 className="text-light font-semibold mb-3">Filter by Price</h3>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex items-center gap-2">
          <label htmlFor="min-price" className="text-light text-sm">Min:</label>
          <input
            id="min-price"
            type="number"
            value={minPrice}
            onChange={(e) => handleMinPriceChange(e.target.value)}
            placeholder="0"
            min="0"
            step="0.01"
            className="w-24 px-2 py-1 bg-gray-700 text-light rounded border border-gray-600 focus:border-primary focus:outline-none"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <label htmlFor="max-price" className="text-light text-sm">Max:</label>
          <input
            id="max-price"
            type="number"
            value={maxPrice}
            onChange={(e) => handleMaxPriceChange(e.target.value)}
            placeholder="∞"
            min="0"
            step="0.01"
            className="w-24 px-2 py-1 bg-gray-700 text-light rounded border border-gray-600 focus:border-primary focus:outline-none"
          />
        </div>

        <button
          onClick={handleClearFilters}
          className="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-light text-sm rounded transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
}