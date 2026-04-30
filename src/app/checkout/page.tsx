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

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
      if (data.user) setForm(prev => ({ ...prev, email: data.user.email || '', firstName: data.user.user_metadata?.name || '' }));
    });
    setOrderNumber('NOM-' + Date.now().toString(36).toUpperCase());
  }, []);

  const delivery = subtotal >= 1000 ? 0 : 99;
  const discount = subtotal * 0.10;
  const total = subtotal - discount + delivery;
  const bankQRValue = 'bank:standardbank|acc:251443574|name:Nomnotho+Group+of+Companies|branch:051001|ref:' + orderNumber + '|amount:' + total.toFixed(2);

  const sendWhatsApp = () => {
    const itemsList = state.items.map(i => i.name + ' x' + i.quantity).join(', ');
    window.open('https://wa.me/27761286545?text=' + encodeURIComponent(
      'NEW ORDER%0A%0ARef: ' + orderNumber + '%0ACustomer: ' + form.firstName + ' ' + form.lastName + '%0APhone: ' + form.phone + '%0ATotal: R' + total.toFixed(2) + '%0APayment: ' + paymentMethod.toUpperCase() + '%0A%0AItems:%0A' + itemsList
    ), '_blank');
  };

  const handlePlaceOrder = () => {
    sendWhatsApp();
    dispatch({ type: 'CLEAR_CART' });
    window.location.href = '/thank-you?ref=' + orderNumber + '&total=' + total.toFixed(2);
  };

  if (loading) return React.createElement('div', { className: 'min-h-screen bg-[#F5F1E8] flex items-center justify-center' }, React.createElement('p', { className: 'text-gray-900' }, 'Loading...'));

  if (!user) {
    return React.createElement('div', { className: 'min-h-screen bg-[#F5F1E8] flex items-center justify-center' },
      React.createElement('div', { className: 'text-center bg-white p-12 rounded-2xl shadow-lg max-w-md' },
        React.createElement('span', { className: 'text-6xl mb-4 block' }, '\uD83D\uDD12'),
        React.createElement('h1', { className: 'text-2xl font-bold text-[#1F3D2B] mb-4' }, 'Login Required'),
        React.createElement(Link, { href: '/account', className: 'inline-block bg-[#C6A75E] text-white px-8 py-3 rounded-full font-bold text-lg' }, 'Login / Sign Up')
      )
    );
  }

  if (state.items.length === 0) {
    return React.createElement('div', { className: 'min-h-screen bg-[#F5F1E8] flex items-center justify-center' },
      React.createElement('div', { className: 'text-center bg-white p-12 rounded-2xl shadow-lg max-w-md' },
        React.createElement('span', { className: 'text-6xl mb-4 block' }, '\uD83D\uDED2'),
        React.createElement('h1', { className: 'text-2xl font-bold text-[#1F3D2B] mb-4' }, 'Your cart is empty'),
        React.createElement(Link, { href: '/shop', className: 'inline-block bg-[#C6A75E] text-white px-8 py-3 rounded-full font-semibold' }, 'Continue Shopping')
      )
    );
  }

  return React.createElement('div', { className: 'min-h-screen bg-[#F5F1E8]' },
    React.createElement('section', { className: 'bg-gradient-to-br from-[#1F3D2B] to-[#2d5a3f] py-16 text-center text-white' },
      React.createElement('h1', { className: 'text-4xl font-bold' }, 'Checkout'),
      React.createElement('p', { className: 'text-[#C6A75E] mt-2' }, 'Welcome, ' + (user?.user_metadata?.name || user?.email))
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
          React.createElement('input', { placeholder: 'First Name', value: form.firstName, className: 'border-2 border-gray-300 p-3 rounded-xl text-gray-900 bg-white', onChange: (e: any) => setForm({...form, firstName: e.target.value}) }),
          React.createElement('input', { placeholder: 'Last Name', value: form.lastName, className: 'border-2 border-gray-300 p-3 rounded-xl text-gray-900 bg-white', onChange: (e: any) => setForm({...form, lastName: e.target.value}) }),
          React.createElement('input', { placeholder: 'Email', value: form.email, className: 'border-2 border-gray-300 p-3 rounded-xl col-span-2 text-gray-900 bg-white', onChange: (e: any) => setForm({...form, email: e.target.value}) }),
          React.createElement('input', { placeholder: 'Phone', className: 'border-2 border-gray-300 p-3 rounded-xl col-span-2 text-gray-900 bg-white', onChange: (e: any) => setForm({...form, phone: e.target.value}) }),
          React.createElement('input', { placeholder: 'Address', className: 'border-2 border-gray-300 p-3 rounded-xl col-span-2 text-gray-900 bg-white', onChange: (e: any) => setForm({...form, address: e.target.value}) }),
          React.createElement('input', { placeholder: 'City', className: 'border-2 border-gray-300 p-3 rounded-xl text-gray-900 bg-white', onChange: (e: any) => setForm({...form, city: e.target.value}) }),
          React.createElement('input', { placeholder: 'Province', className: 'border-2 border-gray-300 p-3 rounded-xl text-gray-900 bg-white', onChange: (e: any) => setForm({...form, province: e.target.value}) })
        ),
        delivery === 0
          ? React.createElement('div', { className: 'mt-4 bg-green-100 border-2 border-green-500 rounded-xl p-3 text-center' }, React.createElement('p', { className: 'text-green-800 font-bold' }, '\uD83C\uDF89 Free Delivery! Your order is over R1000'))
          : React.createElement('div', { className: 'mt-4 bg-[#FFFDF5] border-2 border-[#C6A75E] rounded-xl p-3 text-center' },
              React.createElement('p', { className: 'text-[#1F3D2B] font-semibold' }, 'Delivery: R99'),
              React.createElement('p', { className: 'text-sm text-gray-600' }, 'Add R' + (1000 - subtotal).toFixed(2) + ' more for FREE delivery! Shop more and save.')
            ),
        React.createElement('button', { onClick: () => setStep(2), className: 'mt-6 w-full bg-[#1F3D2B] text-[#C6A75E] py-4 rounded-xl font-bold text-lg' }, 'Continue to Payment')
      ),

      step === 2 && React.createElement('div', { className: 'bg-white rounded-2xl p-8 shadow-lg' },
        React.createElement('h2', { className: 'text-2xl font-bold text-[#1F3D2B] mb-6' }, 'Payment Method'),
        ['yoco', 'paypal', 'bank'].map(method =>
          React.createElement('div', { key: method, onClick: () => setPaymentMethod(method), className: 'p-5 border-2 rounded-xl cursor-pointer mb-3 ' + (paymentMethod === method ? 'border-[#C6A75E] bg-[#FFFDF5]' : 'border-gray-200') },
            React.createElement('div', { className: 'flex items-center gap-4' },
              React.createElement('div', { className: 'w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg', style: { background: method === 'yoco' ? '#1F3D2B' : method === 'paypal' ? '#0070BA' : '#0033A0' } }, method === 'yoco' ? 'Y' : method === 'paypal' ? 'P' : 'SB'),
              React.createElement('div', null,
                React.createElement('h3', { className: 'font-bold text-gray-900 text-lg' }, method === 'yoco' ? 'Yoco Card Payment' : method === 'paypal' ? 'PayPal' : 'Standard Bank EFT + QR Code'),
                React.createElement('p', { className: 'text-gray-600 text-sm' }, method === 'yoco' ? 'Pay securely with debit/credit card' : method === 'paypal' ? 'paypal.me/godfreysiwela' : 'Direct bank transfer with QR code')
              ),
              paymentMethod === method && React.createElement('span', { className: 'ml-auto text-green-500 text-2xl font-bold' }, '\u2713')
            )
          )
        ),
        paymentMethod === 'yoco' && React.createElement('div', { className: 'p-5 bg-[#F5F1E8] rounded-xl mb-3' },
          React.createElement('p', { className: 'text-gray-900 font-semibold mb-3 text-center' }, 'Amount to pay: R' + total.toFixed(2)),
          React.createElement('input', { type: 'text', placeholder: 'Card Number', className: 'w-full border-2 border-gray-300 p-3 rounded-xl bg-white text-gray-900 mb-3' }),
          React.createElement('div', { className: 'grid grid-cols-2 gap-3 mb-3' },
            React.createElement('input', { type: 'text', placeholder: 'MM/YY', className: 'border-2 border-gray-300 p-3 rounded-xl bg-white text-gray-900' }),
            React.createElement('input', { type: 'text', placeholder: 'CVV', className: 'border-2 border-gray-300 p-3 rounded-xl bg-white text-gray-900' })
          ),
          React.createElement('button', { onClick: () => { setStep(3); }, className: 'w-full bg-[#C6A75E] text-white py-3 rounded-xl font-bold' }, 'Process Payment & Review Order')
        ),
        paymentMethod === 'paypal' && React.createElement('div', { className: 'p-5 bg-[#F5F1E8] rounded-xl mb-3 text-center' },
          React.createElement('p', { className: 'text-gray-900 font-semibold mb-3' }, 'Amount to pay: R' + total.toFixed(2)),
          React.createElement('button', { onClick: () => { window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=godfreysiwela@gmail.com&amount=' + total.toFixed(2) + '&currency_code=ZAR&item_name=Nomnotho+Order+' + orderNumber, '_blank'); setStep(3); }, className: 'bg-[#0070BA] text-white py-3 px-6 rounded-xl font-bold' }, 'Pay via PayPal & Review Order')
        ),
        paymentMethod === 'bank' && React.createElement('div', { className: 'p-5 bg-[#F5F1E8] rounded-xl mb-3' },
          React.createElement('h4', { className: 'font-bold text-gray-900 mb-3 text-center text-lg' }, 'Scan QR Code or Use Details Below'),
          React.createElement('div', { className: 'text-center mb-4' },
            React.createElement(QRCodeSVG, { value: bankQRValue, size: 160, level: 'H', fgColor: '#1F3D2B' })
          ),
          React.createElement('div', { className: 'grid grid-cols-2 gap-2 text-gray-900 text-sm bg-white p-4 rounded-lg mb-3' },
            React.createElement('div', null, React.createElement('strong', null, 'Bank:'), ' Standard Bank'),
            React.createElement('div', null, React.createElement('strong', null, 'Account:'), ' 251443574'),
            React.createElement('div', null, React.createElement('strong', null, 'Name:'), ' Nomnotho Group of Companies'),
            React.createElement('div', null, React.createElement('strong', null, 'Branch:'), ' 051001'),
            React.createElement('div', { className: 'col-span-2' }, React.createElement('strong', null, 'Reference: '), orderNumber),
            React.createElement('div', { className: 'col-span-2' }, React.createElement('strong', null, 'Amount: R'), total.toFixed(2))
          ),
          React.createElement('div', { className: 'bg-[#FFFDF5] border border-[#C6A75E] p-3 rounded-lg text-center' },
            React.createElement('p', { className: 'text-[#1F3D2B] font-semibold text-sm mb-1' }, '\uD83D\uDCE7 Send proof of payment to:'),
            React.createElement('p', { className: 'text-gray-900 text-sm' }, 'Email: info@nomnothobeautystudio.co.za'),
            React.createElement('p', { className: 'text-gray-900 text-sm' }, 'WhatsApp: 076 128 6545')
          ),
          React.createElement('button', { onClick: () => { setStep(3); }, className: 'mt-4 w-full bg-[#C6A75E] text-white py-3 rounded-xl font-bold' }, 'Continue to Review Order')
        ),
        React.createElement('div', { className: 'flex gap-4 mt-6' },
          React.createElement('button', { onClick: () => setStep(1), className: 'flex-1 bg-white border-2 border-[#1F3D2B] text-[#1F3D2B] py-3 rounded-xl font-bold' }, 'Back'),
          React.createElement('button', { onClick: () => { if (!paymentMethod) { alert('Please select a payment method first.'); return; } setStep(3); }, disabled: !paymentMethod, className: 'flex-1 py-3 rounded-xl font-bold ' + (paymentMethod ? 'bg-[#1F3D2B] text-[#C6A75E]' : 'bg-gray-300 text-gray-500') }, 'Review Order')
        )
      ),

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
          React.createElement('div', { className: 'flex justify-between mb-2 ' + (delivery === 0 ? 'text-green-600 font-bold' : '') }, React.createElement('span', null, 'Delivery'), React.createElement('span', null, delivery === 0 ? 'FREE' : 'R99')),
          React.createElement('div', { className: 'flex justify-between text-xl font-bold border-t-2 border-[#C6A75E] pt-2' }, React.createElement('span', null, 'Total'), React.createElement('span', null, 'R' + total.toFixed(2))),
          React.createElement('div', { className: 'flex justify-between mt-2 text-[#C6A75E] font-semibold' }, React.createElement('span', null, 'Points Earned'), React.createElement('span', null, Math.floor(total / 10) + ' pts'))
        ),
        React.createElement('div', { className: 'bg-[#FFFDF5] border border-[#C6A75E] rounded-xl p-3 mt-4 text-center' },
          React.createElement('p', { className: 'text-[#1F3D2B] font-semibold' }, 'Payment: ' + (paymentMethod === 'yoco' ? 'Yoco Card' : paymentMethod === 'paypal' ? 'PayPal' : 'Standard Bank EFT')),
          React.createElement('p', { className: 'text-sm text-gray-600' }, 'Ref: ' + orderNumber)
        ),
        paymentMethod === 'bank' && React.createElement('div', { className: 'bg-red-50 border-2 border-red-300 rounded-xl p-3 mt-3 text-center' },
          React.createElement('p', { className: 'text-red-800 font-bold text-sm' }, '\u26A0\uFE0F Please complete your EFT payment and send proof to WhatsApp 0761286545'),
          React.createElement('p', { className: 'text-red-700 text-xs mt-1' }, 'Your order will be processed once payment is confirmed')
        ),
        React.createElement('div', { className: 'flex gap-4 mt-6' },
          React.createElement('button', { onClick: () => setStep(2), className: 'flex-1 bg-white border-2 border-[#1F3D2B] text-[#1F3D2B] py-3 rounded-xl font-bold' }, 'Back'),
          React.createElement('button', { onClick: handlePlaceOrder, className: 'flex-1 bg-[#C6A75E] text-white py-3 rounded-xl font-bold' }, 'Place Order')
        )
      )
    )
  );
}
