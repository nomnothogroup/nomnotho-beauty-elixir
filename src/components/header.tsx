'use client';
import Link from 'next/link';
import React from 'react';
import { useCart } from '@/lib/cart-context';

export default function Header() {
  const { totalItems } = useCart();

  return React.createElement('header', { style: { position: 'sticky', top: 0, zIndex: 100 } },
    React.createElement('div', { style: { background: '#1F3D2B', color: '#F5F1E8', textAlign: 'center', fontSize: '13px', padding: '8px 16px' } }, 'Flat R99 delivery | 10% off - Natural + Premium + Healing'),
    React.createElement('div', { style: { background: 'white', borderBottom: '1px solid #e5e7eb' } },
      React.createElement('div', { className: 'max-w-7xl mx-auto px-4' },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' } },
          React.createElement(Link, { href: '/', style: { textDecoration: 'none' } },
            React.createElement('div', { style: { lineHeight: '1.2' } },
              React.createElement('p', { style: { fontSize: '18px', fontWeight: 'bold', color: '#C6A75E', margin: 0, letterSpacing: '2px' } }, 'NOMNOM'),
              React.createElement('p', { style: { fontSize: '11px', color: '#1F3D2B', margin: 0, letterSpacing: '1px' } }, 'Beauty Studio')
            )
          ),
          React.createElement('nav', { style: { display: 'flex', alignItems: 'center', gap: '20px' } },
            React.createElement(Link, { href: '/', style: { color: '#1F3D2B', textDecoration: 'none', fontSize: '13px', fontWeight: '600' } }, 'Home'),
            React.createElement(Link, { href: '/shop', style: { color: '#1F3D2B', textDecoration: 'none', fontSize: '13px', fontWeight: '600' } }, 'Shop'),
            React.createElement(Link, { href: '/about', style: { color: '#1F3D2B', textDecoration: 'none', fontSize: '13px', fontWeight: '600' } }, 'About'),
            React.createElement(Link, { href: '/contact', style: { color: '#1F3D2B', textDecoration: 'none', fontSize: '13px', fontWeight: '600' } }, 'Contact')
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
            React.createElement(Link, { href: '/account', style: { color: '#1F3D2B', textDecoration: 'none', fontSize: '13px', fontWeight: '600' } }, 'Account'),
            React.createElement(Link, { href: '/cart', style: { position: 'relative', background: '#C6A75E', color: 'white', padding: '10px 20px', borderRadius: '25px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' } },
              'Cart',
              totalItems > 0 && React.createElement('span', { style: { background: '#1F3D2B', color: '#C6A75E', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' } }, totalItems)
            )
          )
        )
      )
    )
  );
}
