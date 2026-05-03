'use client';
import React from 'react';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';

export default function CartPage() {
  const { state, dispatch, subtotal } = useCart();
  const delivery = 99;
  const discount = subtotal >= 500 ? subtotal * 0.10 : 0;
  const total = subtotal - discount + delivery;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-2xl shadow-lg max-w-md">
          <span className="text-6xl mb-4 block"></span>
          <h1 className="text-2xl font-bold text-[#1F3D2B] mb-4">Your cart is empty</h1>
          <Link href="/shop" className="inline-block bg-[#C6A75E] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#b09045] transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <section className="bg-gradient-to-br from-[#1F3D2B] to-[#2d5a3f] py-16 text-center text-white">
        <h1 className="text-4xl font-bold">Shopping Cart</h1>
        <p className="text-[#C6A75E] mt-2">{state.items.length} item{state.items.length > 1 ? 's' : ''}</p>
      </section>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="space-y-4">
          {state.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-md">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-semibold text-[#1F3D2B] text-lg">{item.name}</h3>
                <p className="text-[#8B5E3C] font-bold">{'R' + item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })}
                  className="w-8 h-8 rounded-full border-2 border-[#1F3D2B] text-[#1F3D2B] font-bold hover:bg-gray-100"
                >-</button>
                <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                <button 
                  onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}
                  className="w-8 h-8 rounded-full border-2 border-[#1F3D2B] text-[#1F3D2B] font-bold hover:bg-gray-100"
                >+</button>
              </div>
              <p className="font-bold text-[#1F3D2B] text-lg w-24 text-right">{'R' + (item.price * item.quantity).toFixed(2)}</p>
              <button 
                onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                className="text-red-500 hover:text-red-700 ml-4 text-2xl"
              >&#10005;</button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-6 mt-8 shadow-md">
          <div className="flex justify-between text-lg mb-3">
            <span className="text-gray-600">Subtotal</span>
            <span>{'R' + subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg mb-3 text-green-600 font-semibold">
            <span>10% Discount</span>
            <span>{'-R' + discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg mb-3">
            <span className="text-gray-600">Delivery</span>
            <span>R{delivery.toFixed(2)}</span>
          </div>
          <div className="border-t-2 border-[#C6A75E] pt-4 flex justify-between text-2xl font-bold text-[#1F3D2B]">
            <span>Total</span>
            <span>{'R' + total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button 
            onClick={() => dispatch({ type: 'CLEAR_CART' })}
            className="flex-1 bg-white border-2 border-red-500 text-red-500 py-3 rounded-xl font-bold hover:bg-red-50 transition"
          >
            Clear Cart
          </button>
          <Link 
            href="/checkout"
            className="flex-[2] bg-[#C6A75E] text-white py-3 rounded-xl font-bold text-center hover:bg-[#b09045] transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

