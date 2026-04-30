'use client';
import React, { useState, useEffect } from 'react';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

export default function CheckoutPage() {
  const { state, subtotal, dispatch } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', province: '' });
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => { setOrderNumber('NOM-' + Date.now().toString(36).toUpperCase()); }, []);

  const delivery = 99;
  const discount = subtotal * 0.10;
  const total = subtotal - discount + delivery;
  const qrCodeValue = 'bank:standardbank|acc:251443574|name:Nomnotho|ref:' + orderNumber + '|amount:' + total.toFixed(2);

  const sendWhatsApp = () => {
    const itemsList = state.items.map(i => i.name + ' x' + i.quantity).join(', ');
    window.open('https://wa.me/27761286545?text=' + encodeURIComponent('Order: ' + orderNumber + ' | Total: R' + total.toFixed(2) + ' | Items: ' + itemsList), '_blank');
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === 'paypal') window.open('https://paypal.me/godfreysiwela/' + total.toFixed(2), '_blank');
    sendWhatsApp();
    dispatch({ type: 'CLEAR_CART' });
    window.location.href = '/thank-you?ref=' + orderNumber;
  };

  if (state.items.length === 0) {
    return React.createElement('div', { className: 'min-h-screen bg-[#F5F1E8] flex items-center justify-center' },
      React.createElement('div', { className: 'text-center bg-white p-12 rounded-2xl shadow-lg max-w-md' },
        React.createElement('span', { className: 'text-6xl mb-4 block' }, '\uD83D\uDED2'),
        React.createElement('h1', { className: 'text-2xl font-bold text-[#1F3D2B] mb-4' }, 'Your cart is empty'),
        React.createElement(Link, { href: '/shop', className: 'inline-block bg-[#C6A75E] text-white px-8 py-3 rounded-full font-semibold' }, 'Shop Now')
      )
    );
  }

  return React.createElement('div', { className: 'min-h-screen bg-[#F5F1E8]' },
    React.createElement('section', { className: 'bg-gradient-to-br from-[#1F3D2B] to-[#2d5a3f] py-16 text-center text-white' },
      React.createElement('h1', { className: 'text-4xl font-bold' }, 'Checkout'),
      React.createElement('p', { className: 'text-[#C6A75E] mt-2' }, 'Complete your order')
    ),
    React.createElement('div', { className: 'max-w-3xl mx-auto px-4 py-12' },
      React.createElement('div', { className: 'flex justify-center gap-2 mb-10' },
        ['Shipping', 'Payment', 'Confirm'].map((label, i) =>
          React.createElement('div', { key: label, className: 'px-6 py-2 rounded-full text-sm font-semibold ' + (step >= i+1 ? 'bg-[#1F3D2B] text-[#C6A75E]' : 'bg-gray-200 text-gray-500') }, (i+1) + '. ' + label)
        )
      ),
      step === 1 && React.createElement('div', { className: 'bg-white rounded-2xl p-8 shadow-lg' },
        React.createElement('h2', { className: 'text-2xl font-bold text-[#1F3D2B] mb-6' }, 'Shipping Information'),
        React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
          React.createElement('input', { placeholder: 'First Name', className: 'border-2 p-3 rounded-xl', onChange: (e: any) => setForm({...form, firstName: e.target.value}) }),
          React.createElement('input', { placeholder: 'Last Name', className: 'border-2 p-3 rounded-xl', onChange: (e: any) => setForm({...form, lastName: e.target.value}) }),
          React.createElement('input', { placeholder: 'Email', className: 'border-2 p-3 rounded-xl col-span-2', onChange: (e: any) => setForm({...form, email: e.target.value}) }),
          React.createElement('input', { placeholder: 'Phone', className: 'border-2 p-3 rounded-xl col-span-2', onChange: (e: any) => setForm({...form, phone: e.target.value}) }),
          React.createElement('input', { placeholder: 'Address', className: 'border-2 p-3 rounded-xl col-span-2', onChange: (e: any) => setForm({...form, address: e.target.value}) }),
          React.createElement('input', { placeholder: 'City', className: 'border-2 p-3 rounded-xl', onChange: (e: any) => setForm({...form, city: e.target.value}) }),
          React.createElement('input', { placeholder: 'Province', className: 'border-2 p-3 rounded-xl', onChange: (e: any) => setForm({...form, province: e.target.value}) })
        ),
        React.createElement('button', { onClick: () => setStep(2), className: 'mt-8 w-full bg-[#1F3D2B] text-[#C6A75E] py-4 rounded-xl font-bold text-lg' }, 'Continue to Payment')
      ),
      step === 2 && React.createElement('div', { className: 'bg-white rounded-2xl p-8 shadow-lg' },
        React.createElement('h2', { className: 'text-2xl font-bold text-[#1F3D2B] mb-6' }, 'Payment Method'),
        React.createElement('div', { className: 'space-y-4' },
          React.createElement('div', { onClick: () => setPaymentMethod('yoco'), className: 'p-4 border-2 rounded-xl cursor-pointer flex items-center gap-4 ' + (paymentMethod === 'yoco' ? 'border-[#C6A75E] bg-[#FFFDF5]' : '') },
            React.createElement('div', { className: 'w-12 h-12 bg-[#1F3D2B] rounded-xl flex items-center justify-center text-white font-bold' }, 'Y'),
            React.createElement('div', null, React.createElement('h3', { className: 'font-bold' }, 'Yoco Card Payment'), React.createElement('p', { className: 'text-sm text-gray-500' }, 'Debit/Credit Card'))
          ),
          React.createElement('div', { onClick: () => setPaymentMethod('paypal'), className: 'p-4 border-2 rounded-xl cursor-pointer flex items-center gap-4 ' + (paymentMethod === 'paypal' ? 'border-[#C6A75E] bg-[#FFFDF5]' : '') },
            React.createElement('div', { className: 'w-12 h-12 bg-[#0070BA] rounded-xl flex items-center justify-center text-white font-bold' }, 'P'),
            React.createElement('div', null, React.createElement('h3', { className: 'font-bold' }, 'PayPal'), React.createElement('p', { className: 'text-sm text-gray-500' }, 'paypal.me/godfreysiwela'))
          ),
          React.createElement('div', { onClick: () => setPaymentMethod('bank'), className: 'p-4 border-2 rounded-xl cursor-pointer flex items-center gap-4 ' + (paymentMethod === 'bank' ? 'border-[#C6A75E] bg-[#FFFDF5]' : '') },
            React.createElement('div', { className: 'w-12 h-12 bg-[#0033A0] rounded-xl flex items-center justify-center text-white font-bold' }, 'SB'),
            React.createElement('div', null, React.createElement('h3', { className: 'font-bold' }, 'Standard Bank EFT + QR'), React.createElement('p', { className: 'text-sm text-gray-500' }, 'Acc: 251443574'))
          )
        ),
        paymentMethod === 'bank' && React.createElement('div', { className: 'mt-6 p-6 bg-[#F5F1E8] rounded-xl text-center' },
          React.createElement('h4', { className: 'font-bold mb-4' }, 'Scan to Pay'),
          React.createElement(QRCodeSVG, { value: qrCodeValue, size: 150 }),
          React.createElement('p', { className: 'text-sm mt-4' }, 'Bank: Standard Bank | Acc: 251443574 | Ref: ' + orderNumber)
        ),
        React.createElement('div', { className: 'flex gap-4 mt-8' },
          React.createElement('button', { onClick: () => setStep(1), className: 'flex-1 bg-white border-2 border-[#1F3D2B] py-3 rounded-xl font-bold' }, 'Back'),
          React.createElement('button', { onClick: () => setStep(3), disabled: !paymentMethod, className: 'flex-1 py-3 rounded-xl font-bold ' + (paymentMethod ? 'bg-[#1F3D2B] text-[#C6A75E]' : 'bg-gray-300') }, 'Review Order')
        )
      ),
      step === 3 && React.createElement('div', { className: 'bg-white rounded-2xl p-8 shadow-lg' },
        React.createElement('h2', { className: 'text-2xl font-bold text-[#1F3D2B] mb-6 text-center' }, 'Order Summary'),
        ...state.items.map((item: any) =>
          React.createElement('div', { key: item.id, className: 'flex justify-between border-b pb-2 mb-2' },
            React.createElement('span', null, item.name + ' x' + item.quantity),
            React.createElement('span', null, 'R' + (item.price * item.quantity).toFixed(2))
          )
        ),
        React.createElement('div', { className: 'bg-[#F5F1E8] rounded-xl p-4 mt-4' },
          React.createElement('div', { className: 'flex justify-between mb-2' }, React.createElement('span', null, 'Subtotal'), React.createElement('span', null, 'R' + subtotal.toFixed(2))),
          React.createElement('div', { className: 'flex justify-between mb-2 text-green-600' }, React.createElement('span', null, '10% Discount'), React.createElement('span', null, '-R' + discount.toFixed(2))),
          React.createElement('div', { className: 'flex justify-between mb-2' }, React.createElement('span', null, 'Delivery'), React.createElement('span', null, 'R' + delivery.toFixed(2))),
          React.createElement('div', { className: 'flex justify-between text-xl font-bold border-t-2 border-[#C6A75E] pt-2' }, React.createElement('span', null, 'Total'), React.createElement('span', null, 'R' + total.toFixed(2)))
        ),
        React.createElement('div', { className: 'flex gap-4 mt-8' },
          React.createElement('button', { onClick: () => setStep(2), className: 'flex-1 bg-white border-2 border-[#1F3D2B] py-3 rounded-xl font-bold' }, 'Back'),
          React.createElement('button', { onClick: handlePlaceOrder, className: 'flex-1 bg-[#C6A75E] text-white py-3 rounded-xl font-bold' }, 'Place Order')
        )
      )
    )
  );
}
