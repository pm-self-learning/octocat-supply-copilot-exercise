import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-dark pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-light mb-6">Shopping Cart</h1>
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-xl text-gray-300 mb-6">Your cart is empty</p>
            <Link 
              to="/products" 
              className="inline-block px-6 py-3 bg-primary hover:bg-accent text-white rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-light mb-6">Shopping Cart</h1>
        
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <div className="p-4 md:p-6">
            {items.map(item => (
              <div key={item.productId} className="flex flex-col md:flex-row items-center py-6 border-b border-gray-700">
                <div className="w-24 h-24 flex-shrink-0 mb-4 md:mb-0">
                  <img 
                    src={`/${item.imgName}`} 
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                
                <div className="flex-grow md:ml-6">
                  <h3 className="text-lg font-semibold text-light">{item.name}</h3>
                  <p className="text-primary font-bold mt-1">${item.price.toFixed(2)}</p>
                </div>
                
                <div className="flex items-center mt-4 md:mt-0">
                  <div className="flex items-center space-x-3 bg-gray-700 rounded-lg p-1 mr-4">
                    <button 
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-light hover:text-primary transition-colors"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      <span aria-hidden="true">-</span>
                    </button>
                    <span className="text-light min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-light hover:text-primary transition-colors"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <span aria-hidden="true">+</span>
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-500 hover:text-red-400"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-900 p-6 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-300">Total Items: <span className="text-light font-semibold">{items.reduce((sum, item) => sum + item.quantity, 0)}</span></p>
              <p className="text-xl font-bold text-primary mt-1">Total: ${total.toFixed(2)}</p>
            </div>
            
            <div className="flex space-x-4">
              <Link 
                to="/products" 
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-light rounded-lg transition-colors"
              >
                Continue Shopping
              </Link>
              <button 
                className="px-6 py-2 bg-primary hover:bg-accent text-white rounded-lg transition-colors"
                onClick={() => alert('Checkout functionality coming soon!')}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}