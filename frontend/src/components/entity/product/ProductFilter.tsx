import { useState, useEffect } from 'react';

interface PriceRange {
  min: number;
  max: number;
}

interface ProductFilterProps {
  products: { price: number }[];
  onFilterChange: (range: PriceRange) => void;
}

export default function ProductFilter({ products, onFilterChange }: ProductFilterProps) {
  // Determine initial min and max price from products
  const initialPriceRange = products?.length
    ? {
        min: Math.floor(Math.min(...products.map(p => p.price))),
        max: Math.ceil(Math.max(...products.map(p => p.price)))
      }
    : { min: 0, max: 1000 };
  const [priceRange, setPriceRange] = useState<PriceRange>(initialPriceRange);
  const [currentRange, setCurrentRange] = useState<PriceRange>(initialPriceRange);
  // Update initial range when products change
  useEffect(() => {
    if (products?.length) {
      const newInitialRange = {
        min: Math.floor(Math.min(...products.map(p => p.price))),
        max: Math.ceil(Math.max(...products.map(p => p.price)))
      };
      setPriceRange(newInitialRange);
      setCurrentRange(newInitialRange);
    }
  }, [products]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    if (newMin <= currentRange.max) {
      setCurrentRange(prev => ({ ...prev, min: newMin }));
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    if (newMax >= currentRange.min) {
      setCurrentRange(prev => ({ ...prev, max: newMax }));
    }
  };
  const handleApplyFilter = () => {
    onFilterChange(currentRange);
  };

  const handleResetFilter = () => {
    setCurrentRange(priceRange);
    onFilterChange(priceRange);
  };  return (
    <div className="bg-gray-800 rounded-lg shadow-lg mb-4">
      <div className="px-4 py-2">
        <div className="flex items-center">
          <h2 className="text-light font-medium">Filter by Price</h2>
          <span className="text-light ml-3">
            ${currentRange.min} - ${currentRange.max}
          </span>
        </div>
      </div>
      
      <div className="px-4 pb-3 pt-1">
        <div className="mb-3">
          <div className="relative pt-5">
            <div className="absolute left-0 right-0 h-1 bg-gray-700 rounded"></div>
            <div 
              className="absolute h-1 bg-primary rounded" 
              style={{
                left: `${((currentRange.min - priceRange.min) / (priceRange.max - priceRange.min)) * 100}%`,
                right: `${100 - ((currentRange.max - priceRange.min) / (priceRange.max - priceRange.min)) * 100}%`
              }}            ></div>

            <input
              type="range"
              id="minPrice"
              min={priceRange.min}
              max={priceRange.max}
              step="1"
              value={currentRange.min}
              onChange={handleMinChange}
              className="absolute w-full h-1 opacity-0 cursor-pointer z-10"
              aria-label="Minimum price"
            />
            
            <input
              type="range"
              id="maxPrice"
              min={priceRange.min}
              max={priceRange.max}
              step="1"
              value={currentRange.max}
              onChange={handleMaxChange}
              className="absolute w-full h-1 opacity-0 cursor-pointer z-10"
              aria-label="Maximum price"
            />
            
            <div 
              className="absolute w-3 h-3 bg-primary rounded-full -mt-1 shadow-md z-0 cursor-pointer"
              style={{ left: `${((currentRange.min - priceRange.min) / (priceRange.max - priceRange.min)) * 100}%` }}
            ></div>
            
            <div 
              className="absolute w-3 h-3 bg-primary rounded-full -mt-1 shadow-md z-0 cursor-pointer"
              style={{ left: `${((currentRange.max - priceRange.min) / (priceRange.max - priceRange.min)) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-2 items-center">
            <input
              type="number"
              value={currentRange.min}
              onChange={handleMinChange}
              className="w-16 bg-gray-700 text-light p-1 rounded text-sm"
              min={priceRange.min}
              max={currentRange.max}
              aria-label="Minimum price input"
            />
            <span className="text-light text-sm">to</span>
            <input
              type="number"
              value={currentRange.max}
              onChange={handleMaxChange}
              className="w-16 bg-gray-700 text-light p-1 rounded text-sm"
              min={currentRange.min}
              max={priceRange.max}
              aria-label="Maximum price input"
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleResetFilter}
              className="px-2 py-1 bg-gray-700 text-light rounded text-sm hover:bg-gray-600 transition-colors"
              aria-label="Reset price filter"
            >
              Reset
            </button>
            <button
              onClick={handleApplyFilter}
              className="px-2 py-1 bg-primary hover:bg-accent text-white rounded text-sm transition-colors"
              aria-label="Apply price filter"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
