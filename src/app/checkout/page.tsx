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
  const bankQRValue = 'bank:standardbank|acc:251443574|name:Nomnotho+Group+of+Companies|branch:051001|ref:' + orderNumber + '|amount:' + total.toFixed(2);

  const sendWhatsApp = () => {
    const itemsList = state.items.map(i => i.name + ' x' + i.quantity).join(', ');
    window.open('https://wa.me/27761286545?text=' + encodeURIComponent('Order: ' + orderNumber + ' | Total: R' + total.toFixed(2) + ' | Items: ' + itemsList), '_blank');
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === 'paypal') {
      window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=godfreysiwela@gmail.com&amount=' + total.toFixed(2) + '&currency_code=ZAR&item_name=Nomnotho+Order+' + orderNumber, '_blank');
    }
    if (paymentMethod === 'yoco') {
      window.open('https://pay.yoco.com/?amount=' + Math.round(total * 100) + '&currency=ZAR&reference=' + orderNumber, '_blank');
    }
    sendWhatsApp();
    dispatch({ type: 'CLEAR_CART' });
    window.location.href = '/thank-you?ref=' + orderNumber + '&total=' + total.toFixed(2);
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
          React.createElement('input', { placeholder: 'First Name', className: 'border-2 border-gray-300 p-3 rounded-xl text-gray-900 bg-white', onChange: (e: any) => setForm({...form, firstName: e.target.value}) }),
          React.createElement('input', { placeholder: 'Last Name', className: 'border-2 border-gray-300 p-3 rounded-xl text-gray-900 bg-white', onChange: (e: any) => setForm({...form, lastName: e.target.value}) }),
          React.createElement('input', { placeholder: 'Email', className: 'border-2 border-gray-300 p-3 rounded-xl col-span-2 text-gray-900 bg-white', onChange: (e: any) => setForm({...form, email: e.target.value}) }),
          React.createElement('input', { placeholder: 'Phone', className: 'border-2 border-gray-300 p-3 rounded-xl col-span-2 text-gray-900 bg-white', onChange: (e: any) => setForm({...form, phone: e.target.value}) }),
          React.createElement('input', { placeholder: 'Address', className: 'border-2 border-gray-300 p-3 rounded-xl col-span-2 text-gray-900 bg-white', onChange: (e: any) => setForm({...form, address: e.target.value}) }),
          React.createElement('input', { placeholder: 'City', className: 'border-2 border-gray-300 p-3 rounded-xl text-gray-900 bg-white', onChange: (e: any) => setForm({...form, city: e.target.value}) }),
          React.createElement('input', { placeholder: 'Province', className: 'border-2 border-gray-300 p-3 rounded-xl text-gray-900 bg-white', onChange: (e: any) => setForm({...form, province: e.target.value}) })
        ),
        React.createElement('button', { onClick: () => setStep(2), className: 'mt-8 w-full bg-[#1F3D2B] text-[#C6A75E] py-4 rounded-xl font-bold text-lg' }, 'Continue to Payment')
      ),

      step === 2 && React.createElement('div', { className: 'bg-white rounded-2xl p-8 shadow-lg' },
        React.createElement('h2', { className: 'text-2xl font-bold text-[#1F3D2B] mb-6' }, 'Payment Method'),
        React.createElement('div', { className: 'space-y-4' },
          React.createElement('div', { onClick: () => setPaymentMethod('yoco'), className: 'p-5 border-2 rounded-xl cursor-pointer ' + (paymentMethod === 'yoco' ? 'border-[#C6A75E] bg-[#FFFDF5]' : 'border-gray-200') },
            React.createElement('div', { className: 'flex items-center gap-4' },
              React.createElement('div', { className: 'w-12 h-12 bg-[#1F3D2B] rounded-xl flex items-center justify-center text-white font-bold text-lg' }, 'Y'),
              React.createElement('div', null,
                React.createElement('h3', { className: 'font-bold text-gray-900 text-lg' }, 'Yoco Card Payment'),
                React.createElement('p', { className: 'text-gray-600 text-sm' }, 'Pay securely with debit or credit card via Yoco')
              ),
              paymentMethod === 'yoco' && React.createElement('span', { className: 'ml-auto text-green-500 text-2xl font-bold' }, '\u2713')
            )
          ),
          paymentMethod === 'yoco' && React.createElement('div', { className: 'mt-4 p-4 bg-[#F5F1E8] rounded-xl text-center' },
            React.createElement('p', { className: 'text-gray-900 font-semibold' }, 'You will be redirected to the Yoco secure payment page'),
            React.createElement('p', { className: 'text-gray-600 text-sm mt-1' }, 'Amount: R' + total.toFixed(2) + ' | Ref: ' + orderNumber)
          ),
          React.createElement('div', { onClick: () => setPaymentMethod('paypal'), className: 'p-5 border-2 rounded-xl cursor-pointer ' + (paymentMethod === 'paypal' ? 'border-[#C6A75E] bg-[#FFFDF5]' : 'border-gray-200') },
            React.createElement('div', { className: 'flex items-center gap-4' },
              React.createElement('div', { className: 'w-12 h-12 bg-[#0070BA] rounded-xl flex items-center justify-center text-white font-bold text-lg' }, 'P'),
              React.createElement('div', null,
                React.createElement('h3', { className: 'font-bold text-gray-900 text-lg' }, 'PayPal'),
                React.createElement('p', { className: 'text-gray-600 text-sm' }, 'Pay with PayPal balance or card via godfreysiwela@gmail.com')
              ),
              paymentMethod === 'paypal' && React.createElement('span', { className: 'ml-auto text-green-500 text-2xl font-bold' }, '\u2713')
            )
          ),
          paymentMethod === 'paypal' && React.createElement('div', { className: 'mt-4 p-4 bg-[#F5F1E8] rounded-xl text-center' },
            React.createElement('p', { className: 'text-gray-900 font-semibold' }, 'You will be redirected to PayPal to complete payment'),
            React.createElement('p', { className: 'text-gray-600 text-sm mt-1' }, 'Amount: R' + total.toFixed(2))
          ),
          React.createElement('div', { onClick: () => setPaymentMethod('bank'), className: 'p-5 border-2 rounded-xl cursor-pointer ' + (paymentMethod === 'bank' ? 'border-[#C6A75E] bg-[#FFFDF5]' : 'border-gray-200') },
            React.createElement('div', { className: 'flex items-center gap-4' },
              React.createElement('div', { className: 'w-12 h-12 bg-[#0033A0] rounded-xl flex items-center justify-center text-white font-bold text-sm' }, 'SB'),
              React.createElement('div', null,
                React.createElement('h3', { className: 'font-bold text-gray-900 text-lg' }, 'Standard Bank EFT / QR Code'),
                React.createElement('p', { className: 'text-gray-600 text-sm' }, 'Direct bank transfer with QR code')
              ),
              paymentMethod === 'bank' && React.createElement('span', { className: 'ml-auto text-green-500 text-2xl font-bold' }, '\u2713')
            )
          ),
          paymentMethod === 'bank' && React.createElement('div', { className: 'mt-6 p-6 bg-[#F5F1E8] rounded-xl' },
            React.createElement('h4', { className: 'font-bold text-gray-900 mb-4 text-center text-lg' }, 'Scan QR Code to Pay'),
            React.createElement('div', { className: 'flex justify-center mb-4' },
              React.createElement('div', { className: 'bg-white p-4 rounded-xl inline-block' },
                React.createElement(QRCodeSVG, { value: bankQRValue, size: 160, level: 'H', fgColor: '#1F3D2B' })
              )
            ),
            React.createElement('p', { className: 'text-center text-sm text-gray-600 mb-4' }, 'Scan with any SA banking app or use details below'),
            React.createElement('div', { className: 'grid grid-cols-2 gap-3 text-gray-900 bg-white p-4 rounded-lg' },
              React.createElement('div', null, React.createElement('strong', null, 'Bank:'), ' Standard Bank'),
              React.createElement('div', null, React.createElement('strong', null, 'Account:'), ' 251443574'),
              React.createElement('div', null, React.createElement('strong', null, 'Name:'), ' Nomnotho Group of Companies'),
              React.createElement('div', null, React.createElement('strong', null, 'Branch:'), ' 051001'),
              React.createElement('div', { className: 'col-span-2' }, React.createElement('strong', null, 'Reference: '), orderNumber)
            ),
            React.createElement('p', { className: 'text-sm text-gray-600 mt-4 text-center' }, 'Send proof of payment to info@nomnothobeautystudio.co.za or WhatsApp 0761286545')
          )
        ),
        React.createElement('div', { className: 'flex gap-4 mt-8' },
          React.createElement('button', { onClick: () => setStep(1), className: 'flex-1 bg-white border-2 border-[#1F3D2B] text-[#1F3D2B] py-3 rounded-xl font-bold' }, 'Back'),
          React.createElement('button', { onClick: () => setStep(3), disabled: !paymentMethod, className: 'flex-1 py-3 rounded-xl font-bold ' + (paymentMethod ? 'bg-[#1F3D2B] text-[#C6A75E]' : 'bg-gray-300 text-gray-500') }, 'Review Order')
        )
      ),

      step === 3 && React.createElement('div', { className: 'bg-white rounded-2xl p-8 shadow-lg' },
        React.createElement('h2', { className: 'text-2xl font-bold text-[#1F3D2B] mb-6 text-center' }, 'Order Summary'),
        ...state.items.map((item: any) =>
          React.createElement('div', { key: item.id, className: 'flex justify-between border-b pb-2 mb-2 text-gray-900' },
            React.createElement('span', null, item.name + ' x' + item.quantity),
            React.createElement('span', null, 'R' + (item.price * item.quantity).toFixed(2))
          )
        ),
        React.createElement('div', { className: 'bg-[#F5F1E8] rounded-xl p-4 mt-4 text-gray-900' },
          React.createElement('div', { className: 'flex justify-between mb-2' }, React.createElement('span', null, 'Subtotal'), React.createElement('span', null, 'R' + subtotal.toFixed(2))),
          React.createElement('div', { className: 'flex justify-between mb-2 text-green-600 font-semibold' }, React.createElement('span', null, '10% Discount'), React.createElement('span', null, '-R' + discount.toFixed(2))),
          React.createElement('div', { className: 'flex justify-between mb-2' }, React.createElement('span', null, 'Delivery'), React.createElement('span', null, 'R99')),
          React.createElement('div', { className: 'flex justify-between text-xl font-bold border-t-2 border-[#C6A75E] pt-2' }, React.createElement('span', null, 'Total'), React.createElement('span', null, 'R' + total.toFixed(2)))
        ),
        React.createElement('div', { className: 'flex gap-4 mt-8' },
          React.createElement('button', { onClick: () => setStep(2), className: 'flex-1 bg-white border-2 border-[#1F3D2B] text-[#1F3D2B] py-3 rounded-xl font-bold' }, 'Back'),
          React.createElement('button', { onClick: handlePlaceOrder, className: 'flex-1 bg-[#C6A75E] text-white py-3 rounded-xl font-bold' }, 'Place Order')
        )
      )
    )
  );
}
