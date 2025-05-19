import React, { useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity } = useCart();
  const discount = 5; // 5% discount for demonstration

  useEffect(() => {
    console.log('CartPage rendered with items:', items);
  }, [items]);

  const subtotal = items.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const shippingCost = 10; // Fixed shipping cost
  const grandTotal = subtotal - discountAmount + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-dark pt-20 px-4 text-light">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-400 mb-6">Start shopping to add products to your cart.</p>
        <Link 
          to="/products" 
          className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark pt-20 px-4 pb-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-light mb-6">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-4 py-3 text-left text-light">Product</th>
                    <th className="px-4 py-3 text-left text-light">Price</th>
                    <th className="px-4 py-3 text-left text-light">Quantity</th>
                    <th className="px-4 py-3 text-left text-light">Total</th>
                    <th className="px-4 py-3 text-left text-light">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item: { productId: number; name: string; price: number; quantity: number; image?: string }) => (
                    <tr key={item.productId} className="border-b border-gray-700">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          {item.image && (
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-16 h-16 mr-4 object-cover"
                            />
                          )}
                          <span className="text-light">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-light">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value) || 1;
                            console.log('Updating quantity:', item.productId, newQuantity);
                            updateQuantity(item.productId, newQuantity);
                          }}
                          className="w-16 text-center bg-gray-700 border border-gray-600 text-light p-1 rounded"
                        />
                      </td>
                      <td className="px-4 py-3 text-light">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => {
                            console.log('Removing item:', item.productId);
                            removeItem(item.productId);
                          }}
                          className="text-red-500 hover:text-red-400"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-fit">
            <h2 className="text-xl font-bold text-light mb-4">Order Summary</h2>
            <div className="mb-3 flex justify-between">
              <span className="text-gray-300">Subtotal:</span>
              <span className="text-light">${subtotal.toFixed(2)}</span>
            </div>
            <div className="mb-3 flex justify-between">
              <span className="text-gray-300">Discount ({discount}%):</span>
              <span className="text-light">-${discountAmount.toFixed(2)}</span>
            </div>
            <div className="mb-3 flex justify-between">
              <span className="text-gray-300">Shipping:</span>
              <span className="text-light">${shippingCost.toFixed(2)}</span>
            </div>
            <div className="pt-3 border-t border-gray-700 mb-4">
              <div className="flex justify-between font-bold">
                <span className="text-gray-300">Grand Total:</span>
                <span className="text-light">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-primary hover:bg-accent text-white py-3 rounded font-medium transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
