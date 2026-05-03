'use client';
import React, { useState, useEffect } from 'react';
import { useCart } from '@/lib/cart-context';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

export default function CheckoutPage() {
  const { state, subtotal, dispatch } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', province: '' });
  const [orderNumber, setOrderNumber] = useState('');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => { setUser(data.user); setLoading(false); });
    setOrderNumber('NOM-' + Date.now().toString(36).toUpperCase());
  }, []);

  const delivery = subtotal >= 1000 ? 0 : 99;
  const discount = subtotal * 0.10;
  const total = subtotal - discount + delivery;

  const sendWhatsApp = () => {
    const itemsList = state.items.map(i => i.name + ' x' + i.quantity).join(', ');
    window.open('https://wa.me/27761286545?text=' + encodeURIComponent('ORDER: ' + orderNumber + ' | Total: R' + total.toFixed(2) + ' | Payment: ' + paymentMethod.toUpperCase() + ' | Items: ' + itemsList), '_blank');
  };

  const handleConfirmPayment = () => {
    setPaymentConfirmed(true);
    sendWhatsApp();
    dispatch({ type: 'CLEAR_CART' });
    window.location.href = '/thank-you?ref=' + orderNumber + '&total=' + total.toFixed(2);
  };

  const handleMakePayment = () => {
    if (!paymentMethod) { alert('Please select a payment method'); return; }
    
    if (paymentMethod === 'paypal') {
      window.open('https://www.paypal.com/ncp/payment/Z2GWBQ28XQ4BS', '_blank');
    } else if (paymentMethod === 'snapscan') {
      window.open('https://pos.snapscan.io/qr/F3qZGjuq', '_blank');
    }
    // For bank transfer, customer must pay manually
    if (paymentMethod === 'bank') {
      alert('Please complete your EFT payment using the banking details shown. Reference: ' + orderNumber + '\nAmount: R' + total.toFixed(2) + '\n\nSend proof of payment to WhatsApp: 0761286545');
    }
    setStep(4); // Go to confirmation step
  };

  if (loading) return React.createElement('div', { className: 'min-h-screen bg-[#F5F1E8] flex items-center justify-center' }, React.createElement('p', { className: 'text-gray-900' }, 'Loading...'));

  if (!user) {
    return React.createElement('div', { className: 'min-h-screen bg-[#F5F1E8] flex items-center justify-center' },
      React.createElement('div', { className: 'bg-white p-12 rounded-2xl shadow-lg max-w-md text-center' },
        React.createElement('span', { className: 'text-6xl mb-4 block' }, '\uD83D\uDD12'),
        React.createElement('h1', { className: 'text-2xl font-bold text-[#1F3D2B] mb-4' }, 'Login Required'),
        React.createElement(Link, { href: '/account', className: 'inline-block bg-[#C6A75E] text-white px-8 py-3 rounded-full font-bold' }, 'Login / Sign Up')
      )
    );
  }

  if (state.items.length === 0) {
    return React.createElement('div', { className: 'min-h-screen bg-[#F5F1E8] flex items-center justify-center' },
      React.createElement('div', { className: 'bg-white p-12 rounded-2xl shadow-lg max-w-md text-center' },
        React.createElement('h1', { className: 'text-2xl font-bold text-[#1F3D2B] mb-4' }, 'Cart is empty'),
        React.createElement(Link, { href: '/shop', className: 'inline-block bg-[#C6A75E] text-white px-8 py-3 rounded-full font-semibold' }, 'Continue Shopping')
      )
    );
  }

  const paymentMethods = [
    { id: 'paypal', name: 'PayPal', icon: 'P', bg: '#0070BA', desc: 'Pay securely with PayPal' },
    { id: 'snapscan', name: 'SnapScan', icon: 'S', bg: '#FF5722', desc: 'Scan & Pay instantly' },
    { id: 'bank', name: 'Standard Bank EFT', icon: 'SB', bg: '#0033A0', desc: 'Direct bank transfer' }
  ];

  const bankQRValue = 'bank:standardbank|acc:251443574|name:Nomnotho+Group+of+Companies|branch:051001|ref:' + orderNumber + '|amount:' + total.toFixed(2);

  return React.createElement('div', { className: 'min-h-screen bg-[#F5F1E8]' },
    React.createElement('section', { className: 'bg-gradient-to-br from-[#1F3D2B] to-[#2d5a3f] py-16 text-center text-white' },
      React.createElement('h1', { className: 'text-4xl font-bold' }, 'Checkout'),
      React.createElement('p', { className: 'text-[#C6A75E] mt-2' }, 'Complete your order')
    ),
    React.createElement('div', { className: 'max-w-3xl mx-auto px-4 py-12' },
      ['Shipping', 'Payment', 'Review', 'Confirm'].map((label, i) =>
        React.createElement('div', { key: label, className: 'inline-block px-6 py-2 rounded-full text-sm font-semibold mx-1 ' + (step >= i+1 ? 'bg-[#1F3D2B] text-[#C6A75E]' : 'bg-gray-200 text-gray-500') }, (i+1) + '. ' + label)
      ),
      React.createElement('div', { className: 'mt-8' },

        // Step 1: Shipping
        step === 1 && React.createElement('div', { className: 'bg-white rounded-2xl p-8 shadow-lg' },
          React.createElement('h2', { className: 'text-2xl font-bold text-[#1F3D2B] mb-6' }, 'Shipping Information'),
          ['First Name', 'Last Name', 'Email', 'Phone', 'Address', 'City', 'Province'].map(f =>
            React.createElement('input', { key: f, placeholder: f, className: 'border-2 border-gray-300 p-3 rounded-xl text-gray-900 bg-white w-full mb-3', onChange: (e: any) => setForm(prev => ({...prev, [f.toLowerCase().replace(' ', '')]: e.target.value})) })
          ),
          delivery === 0
            ? React.createElement('div', { className: 'mt-4 bg-green-100 border-2 border-green-500 rounded-xl p-3 text-center' }, React.createElement('p', { className: 'text-green-800 font-bold' }, '\uD83C\uDF89 Free Delivery!'))
            : React.createElement('div', { className: 'mt-4 bg-[#FFFDF5] border-2 border-[#C6A75E] rounded-xl p-3 text-center' }, React.createElement('p', { className: 'font-semibold text-gray-900' }, 'Delivery: R99 | Add R' + (1000 - subtotal).toFixed(2) + ' for FREE!')),
          React.createElement('button', { onClick: () => setStep(2), className: 'mt-6 w-full bg-[#1F3D2B] text-[#C6A75E] py-4 rounded-xl font-bold text-lg' }, 'Continue to Payment')
        ),

        // Step 2: Payment Method
        step === 2 && React.createElement('div', { className: 'bg-white rounded-2xl p-8 shadow-lg' },
          React.createElement('h2', { className: 'text-2xl font-bold text-[#1F3D2B] mb-2' }, 'Select Payment Method'),
          React.createElement('p', { className: 'text-red-600 text-sm mb-6 font-semibold' }, '\u26A0\uFE0F Payment is required before order can be placed'),
          paymentMethods.map(m =>
            React.createElement('div', { key: m.id, onClick: () => setPaymentMethod(m.id), className: 'p-5 border-2 rounded-xl cursor-pointer mb-3 ' + (paymentMethod === m.id ? 'border-[#C6A75E] bg-[#FFFDF5]' : 'border-gray-200') },
              React.createElement('div', { className: 'flex items-center gap-4' },
                React.createElement('div', { className: 'w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg', style: { background: m.bg } }, m.icon),
                React.createElement('div', null, React.createElement('h3', { className: 'font-bold text-gray-900 text-lg' }, m.name), React.createElement('p', { className: 'text-gray-600 text-sm' }, m.desc)),
                paymentMethod === m.id && React.createElement('span', { className: 'ml-auto text-green-500 text-2xl' }, '\u2713')
              )
            )
          ),
          paymentMethod === 'bank' && React.createElement('div', { className: 'p-5 bg-[#F5F1E8] rounded-xl mt-4 text-center' },
            React.createElement('p', { className: 'font-bold text-gray-900 mb-3' }, 'Scan QR or use banking details'),
            React.createElement(QRCodeSVG, { value: bankQRValue, size: 150, level: 'H', fgColor: '#1F3D2B' }),
            React.createElement('div', { className: 'grid grid-cols-2 gap-2 mt-3 text-sm text-gray-900 text-left' },
              React.createElement('div', null, React.createElement('strong', null, 'Bank:'), ' Standard Bank'),
              React.createElement('div', null, React.createElement('strong', null, 'Acc:'), ' 251443574'),
              React.createElement('div', null, React.createElement('strong', null, 'Name:'), ' Nomnotho Group'),
              React.createElement('div', { className: 'col-span-2' }, React.createElement('strong', null, 'Ref: '), orderNumber)
            ),
            React.createElement('p', { className: 'text-xs text-gray-600 mt-3' }, 'Send POP to WhatsApp: 0761286545')
          ),
          React.createElement('div', { className: 'flex gap-4 mt-6' },
            React.createElement('button', { onClick: () => setStep(1), className: 'flex-1 bg-white border-2 border-[#1F3D2B] text-[#1F3D2B] py-3 rounded-xl font-bold' }, 'Back'),
            React.createElement('button', { onClick: () => { if (!paymentMethod) alert('Select payment method'); else setStep(3); }, className: 'flex-1 py-3 rounded-xl font-bold bg-[#1F3D2B] text-[#C6A75E]' }, 'Review Order')
          )
        ),

        // Step 3: Review & Pay
        step === 3 && React.createElement('div', { className: 'bg-white rounded-2xl p-8 shadow-lg' },
          React.createElement('h2', { className: 'text-2xl font-bold text-[#1F3D2B] mb-4 text-center' }, 'Order Summary'),
          ...state.items.map((item: any) =>
            React.createElement('div', { key: item.id, className: 'flex justify-between border-b pb-2 mb-2 text-gray-900' },
              React.createElement('span', null, item.name + ' x' + item.quantity),
              React.createElement('span', null, 'R' + (item.price * item.quantity).toFixed(2))
            )
          ),
          React.createElement('div', { className: 'bg-[#F5F1E8] rounded-xl p-4 mt-4 text-gray-900' },
            React.createElement('div', { className: 'flex justify-between mb-2' }, React.createElement('span', null, 'Subtotal'), React.createElement('span', null, 'R' + subtotal.toFixed(2))),
            React.createElement('div', { className: 'flex justify-between mb-2 text-green-600 font-semibold' }, React.createElement('span', null, '10% Discount'), React.createElement('span', null, '-R' + discount.toFixed(2))),
            React.createElement('div', { className: 'flex justify-between mb-2' }, React.createElement('span', null, 'Delivery'), React.createElement('span', null, delivery === 0 ? 'FREE' : 'R99')),
            React.createElement('div', { className: 'flex justify-between text-xl font-bold border-t-2 border-[#C6A75E] pt-2' }, React.createElement('span', null, 'Total'), React.createElement('span', null, 'R' + total.toFixed(2)))
          ),
          React.createElement('div', { className: 'bg-[#FFFDF5] border border-[#C6A75E] rounded-xl p-3 mt-3 text-center' },
            React.createElement('p', { className: 'font-semibold text-[#1F3D2B]' }, 'Payment: ' + paymentMethods.find(m => m.id === paymentMethod)?.name)
          ),
          React.createElement('div', { className: 'flex gap-4 mt-6' },
            React.createElement('button', { onClick: () => setStep(2), className: 'flex-1 bg-white border-2 border-[#1F3D2B] text-[#1F3D2B] py-3 rounded-xl font-bold' }, 'Back'),
            React.createElement('button', { onClick: handleMakePayment, className: 'flex-1 py-3 rounded-xl font-bold bg-[#C6A75E] text-white' }, 'Make Payment')
          )
        ),

        // Step 4: Confirm Payment
        step === 4 && React.createElement('div', { className: 'bg-white rounded-2xl p-8 shadow-lg text-center' },
          React.createElement('div', { className: 'text-6xl mb-4' }, '\uD83D\uDCB3'),
          React.createElement('h2', { className: 'text-2xl font-bold text-[#1F3D2B] mb-4' }, 'Complete Your Payment'),
          React.createElement('p', { className: 'text-gray-600 mb-2' }, 'Amount: R' + total.toFixed(2)),
          React.createElement('p', { className: 'text-[#8B5E3C] text-sm mb-6' }, 'Ref: ' + orderNumber),
          paymentMethod === 'paypal' && React.createElement('div', { className: 'bg-[#F5F1E8] rounded-xl p-4 mb-6' },
            React.createElement('p', { className: 'text-gray-900 font-semibold mb-3' }, 'PayPal payment page has been opened'),
            React.createElement('p', { className: 'text-sm text-gray-600' }, 'Complete your payment on PayPal, then return and click Confirm Payment below.')
          ),
          paymentMethod === 'snapscan' && React.createElement('div', { className: 'bg-[#F5F1E8] rounded-xl p-4 mb-6' },
            React.createElement('p', { className: 'text-gray-900 font-semibold mb-3' }, 'SnapScan page has been opened'),
            React.createElement('p', { className: 'text-sm text-gray-600' }, 'Scan the QR code with your banking app to complete payment.')
          ),
          paymentMethod === 'bank' && React.createElement('div', { className: 'bg-[#F5F1E8] rounded-xl p-4 mb-6' },
            React.createElement('p', { className: 'text-gray-900 font-semibold mb-2' }, 'Standard Bank EFT'),
            React.createElement('p', { className: 'text-sm text-gray-600' }, 'Use the banking details provided. Send POP to WhatsApp 0761286545.')
          ),
          React.createElement('div', { className: 'flex gap-4' },
            React.createElement('button', { onClick: () => setStep(3), className: 'flex-1 bg-white border-2 border-[#1F3D2B] text-[#1F3D2B] py-3 rounded-xl font-bold' }, 'Back'),
            React.createElement('button', { onClick: handleConfirmPayment, className: 'flex-1 py-3 rounded-xl font-bold bg-green-600 text-white' }, 'I Have Paid - Confirm Order')
          )
        )
      )
    )
  );
}
