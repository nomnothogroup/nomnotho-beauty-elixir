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
  const [paid, setPaid] = useState(false);

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
    window.open('https://wa.me/27761286545?text=' + encodeURIComponent('Order: ' + orderNumber + ' | Total: R' + total.toFixed(2) + ' | Items: ' + itemsList), '_blank');
  };

  const handlePlaceOrder = () => {
    if (!paid) { alert('Please complete payment first.'); return; }
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
        React.createElement('p', { className: 'text-gray-600 mb-2' }, 'Items added via Buy Now should appear here.'),
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
        delivery === 0 && React.createElement('div', { className: 'mt-4 bg-green-100 border-2 border-green-500 rounded-xl p-3 text-center' },
          React.createElement('p', { className: 'text-green-800 font-bold' }, '\uD83C\uDF89 Free Delivery! Your order is over R1000')
        ),
        delivery > 0 && React.createElement('div', { className: 'mt-4 bg-[#FFFDF5] border-2 border-[#C6A75E] rounded-xl p-3 text-center' },
          React.createElement('p', { className: 'text-[#1F3D2B] font-semibold' }, 'Delivery: R' + delivery),
          React.createElement('p', { className: 'text-sm text-gray-600' }, 'Add R' + (1000 - subtotal).toFixed(2) + ' more for FREE delivery!')
        ),
        React.createElement('button', { onClick: () => setStep(2), className: 'mt-6 w-full bg-[#1F3D2B] text-[#C6A75E] py-4 rounded-xl font-bold text-lg' }, 'Continue to Payment')
      ),

      step === 2 && React.createElement('div', { className: 'bg-white rounded-2xl p-8 shadow-lg' },
        React.createElement('h2', { className: 'text-2xl font-bold text-[#1F3D2B] mb-4' }, 'Payment Method'),
        React.createElement('p', { className: 'text-sm text-red-600 mb-4 font-semibold' }, '\u26A0 Payment required before placing order'),
        ['yoco', 'paypal', 'bank'].map(method =>
          React.createElement('div', { key: method, onClick: () => setPaymentMethod(method), className: 'p-5 border-2 rounded-xl cursor-pointer mb-3 ' + (paymentMethod === method ? 'border-[#C6A75E] bg-[#FFFDF5]' : 'border-gray-200') },
            React.createElement('div', { className: 'flex items-center gap-4' },
              React.createElement('div', { className: 'w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg', style: { background: method === 'yoco' ? '#1F3D2B' : method === 'paypal' ? '#0070BA' : '#0033A0' } }, method === 'yoco' ? 'Y' : method === 'paypal' ? 'P' : 'SB'),
              React.createElement('div', null,
                React.createElement('h3', { className: 'font-bold text-gray-900 text-lg' }, method === 'yoco' ? 'Yoco Card Payment' : method === 'paypal' ? 'PayPal' : 'Standard Bank EFT + QR'),
                React.createElement('p', { className: 'text-gray-600 text-sm' }, method === 'yoco' ? 'Card details' : method === 'paypal' ? 'godfreysiwela@gmail.com' : 'Acc: 251443574')
              ),
              paymentMethod === method && React.createElement('span', { className: 'ml-auto text-green-500 text-2xl font-bold' }, '\u2713')
            )
          )
        ),
        paymentMethod === 'yoco' && React.createElement('div', { className: 'p-4 bg-[#F5F1E8] rounded-xl mb-3' },
          React.createElement('input', { type: 'text', placeholder: 'Card Number', className: 'w-full border-2 border-gray-300 p-3 rounded-xl bg-white text-gray-900 mb-3' }),
          React.createElement('div', { className: 'grid grid-cols-2 gap-3 mb-3' },
            React.createElement('input', { type: 'text', placeholder: 'MM/YY', className: 'border-2 border-gray-300 p-3 rounded-xl bg-white text-gray-900' }),
            React.createElement('input', { type: 'text', placeholder: 'CVV', className: 'border-2 border-gray-300 p-3 rounded-xl bg-white text-gray-900' })
          ),
          React.createElement('button', { onClick: () => { setPaid(true); alert('Payment processed!'); }, className: 'w-full bg-[#C6A75E] text-white py-3 rounded-xl font-bold' }, 'Pay R' + total.toFixed(2))
        ),
        paymentMethod === 'paypal' && React.createElement('div', { className: 'p-4 bg-[#F5F1E8] rounded-xl mb-3 text-center' },
          React.createElement('button', { onClick: () => { window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=godfreysiwela@gmail.com&amount=' + total.toFixed(2) + '&currency_code=ZAR', '_blank'); setPaid(true); }, className: 'bg-[#0070BA] text-white py-3 px-6 rounded-xl font-bold' }, 'Pay R' + total.toFixed(2) + ' via PayPal')
        ),
        paymentMethod === 'bank' && React.createElement('div', { className: 'p-4 bg-[#F5F1E8] rounded-xl mb-3 text-center' },
          React.createElement(QRCodeSVG, { value: bankQRValue, size: 150, level: 'H', fgColor: '#1F3D2B' }),
          React.createElement('div', { className: 'grid grid-cols-2 gap-2 text-left text-gray-900 text-sm mt-3' },
            React.createElement('div', null, React.createElement('strong', null, 'Bank:'), ' Standard Bank'),
            React.createElement('div', null, React.createElement('strong', null, 'Acc:'), ' 251443574'),
            React.createElement('div', null, React.createElement('strong', null, 'Name:'), ' Nomnotho Group'),
            React.createElement('div', null, React.createElement('strong', null, 'Branch:'), ' 051001'),
            React.createElement('div', { className: 'col-span-2' }, React.createElement('strong', null, 'Ref: '), orderNumber)
          ),
          React.createElement('button', { onClick: () => { setPaid(true); alert('Send POP to WhatsApp 0761286545'); }, className: 'mt-3 bg-[#C6A75E] text-white py-2 px-6 rounded-xl font-bold' }, 'I Have Paid via EFT')
        ),
        React.createElement('div', { className: 'flex gap-4 mt-6' },
          React.createElement('button', { onClick: () => setStep(1), className: 'flex-1 bg-white border-2 border-[#1F3D2B] text-[#1F3D2B] py-3 rounded-xl font-bold' }, 'Back'),
          React.createElement('button', { onClick: () => { if (!paymentMethod) { alert('Select payment method'); return; } setStep(3); }, disabled: !paymentMethod, className: 'flex-1 py-3 rounded-xl font-bold ' + (paymentMethod ? 'bg-[#1F3D2B] text-[#C6A75E]' : 'bg-gray-300 text-gray-500') }, 'Review Order')
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
          delivery === 0
            ? React.createElement('div', { className: 'flex justify-between mb-2 text-green-600 font-bold' }, React.createElement('span', null, 'Delivery'), React.createElement('span', null, 'FREE'))
            : React.createElement('div', { className: 'flex justify-between mb-2' }, React.createElement('span', null, 'Delivery'), React.createElement('span', null, 'R99')),
          React.createElement('div', { className: 'flex justify-between text-xl font-bold border-t-2 border-[#C6A75E] pt-2' }, React.createElement('span', null, 'Total'), React.createElement('span', null, 'R' + total.toFixed(2)))
        ),
        paid
          ? React.createElement('div', { className: 'bg-green-100 border-2 border-green-500 rounded-xl p-3 text-center mt-4' }, React.createElement('p', { className: 'text-green-800 font-bold' }, '\u2705 Payment Confirmed'))
          : React.createElement('div', { className: 'bg-red-100 border-2 border-red-500 rounded-xl p-3 text-center mt-4' }, React.createElement('p', { className: 'text-red-800 font-bold' }, '\u26A0 Payment required')),
        React.createElement('div', { className: 'flex gap-4 mt-6' },
          React.createElement('button', { onClick: () => setStep(2), className: 'flex-1 bg-white border-2 border-[#1F3D2B] text-[#1F3D2B] py-3 rounded-xl font-bold' }, 'Back'),
          React.createElement('button', { onClick: handlePlaceOrder, disabled: !paid, className: 'flex-1 py-3 rounded-xl font-bold ' + (paid ? 'bg-[#C6A75E] text-white' : 'bg-gray-300 text-gray-500') }, 'Place Order')
        )
      )
    )
  );
}
