import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-dark pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-light mb-6">Your Cart</h1>
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-light text-xl mb-6">Your cart is empty</p>
            <Link 
              to="/products" 
              className="bg-primary hover:bg-accent text-white px-6 py-2 rounded-md font-medium transition-colors"
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
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-light mb-6">Your Cart</h1>
        
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-6">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-light uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-light uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-light uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-light uppercase tracking-wider">Total</th>
                <th className="px-4 py-3 text-xs font-medium text-light uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {items.map(item => (
                <tr key={item.productId}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <img 
                          src={`/${item.imgName}`} 
                          alt={item.name}
                          className="h-12 w-12 rounded object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-light">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-light text-right">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center space-x-3 bg-gray-700 rounded-lg p-1 mx-auto w-32">
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
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-light text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-red-400 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-900">
              <tr>
                <td colSpan={3} className="px-4 py-4 text-right text-light font-semibold">
                  Subtotal:
                </td>
                <td className="px-4 py-4 text-right text-primary font-bold">
                  ${totalPrice.toFixed(2)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        <div className="flex justify-between">
          <Link 
            to="/products" 
            className="bg-gray-700 hover:bg-gray-600 text-light px-6 py-2 rounded-md font-medium transition-colors"
          >
            Continue Shopping
          </Link>
          <button 
            className="bg-primary hover:bg-accent text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
