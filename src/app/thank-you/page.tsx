'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import React, { Suspense } from 'react';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref') || '';
  const total = searchParams.get('total') || '0';

  return React.createElement('div', { className: 'bg-white rounded-3xl p-12 text-center max-w-lg shadow-xl' },
    React.createElement('div', { className: 'text-7xl mb-6' }, '\uD83D\uDE0A'),
    React.createElement('h1', { className: 'text-3xl font-bold text-[#1F3D2B] mb-2' }, 'Thank You!'),
    React.createElement('p', { className: 'text-lg text-[#C6A75E] font-semibold mb-4' }, 'Nomnotho Beauty Studio'),
    React.createElement('p', { className: 'text-gray-600 mb-6' }, 'Your order has been placed successfully. A confirmation has been sent to your WhatsApp.'),
    React.createElement('div', { className: 'bg-[#F5F1E8] rounded-xl p-6 mb-6' },
      React.createElement('p', { className: 'text-sm text-[#8B5E3C] mb-1' }, 'Order Reference'),
      React.createElement('p', { className: 'text-xl font-bold text-[#1F3D2B]' }, ref),
      total !== '0' && React.createElement('p', { className: 'text-lg font-bold text-[#C6A75E] mt-2' }, 'R' + total)
    ),
    React.createElement('p', { className: 'text-sm text-gray-500 mb-8' }, 'For queries, WhatsApp 0761286545 or email info@nomnothobeautystudio.co.za'),
    React.createElement(Link, { href: '/shop', className: 'inline-block bg-[#C6A75E] text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-[#b09045] transition' }, 'Continue Shopping')
  );
}

export default function ThankYouPage() {
  return React.createElement('div', { className: 'min-h-screen bg-[#F5F1E8] flex items-center justify-center px-4' },
    React.createElement(Suspense, { fallback: React.createElement('div', null, 'Loading...') },
      React.createElement(ThankYouContent)
    )
  );
}
