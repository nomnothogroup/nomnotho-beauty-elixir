'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useCart } from '@/lib/cart-context';

export default function Header() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return React.createElement('header', { style: { position: 'sticky', top: 0, zIndex: 100, width: '100%' } },
    React.createElement('div', { style: { background: '#1F3D2B', color: '#F5F1E8', textAlign: 'center', fontSize: 'clamp(10px, 1.5vw, 12px)', padding: '6px 12px' } }, 'Flat R99 delivery | 10% off - Natural + Premium + Healing'),
    React.createElement('div', { style: { background: 'white', borderBottom: '1px solid #e5e7eb' } },
      React.createElement('div', { style: { maxWidth: '1200px', margin: '0 auto', padding: '0 12px' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' } },
          React.createElement(Link, { href: '/', style: { textDecoration: 'none', flexShrink: 0 } },
            React.createElement('div', { style: { lineHeight: '1.2' } },
              React.createElement('p', { style: { fontSize: 'clamp(15px, 2.5vw, 18px)', fontWeight: 'bold', color: '#C6A75E', margin: 0, letterSpacing: '2px' } }, 'NOMNOM'),
              React.createElement('p', { style: { fontSize: 'clamp(9px, 1.2vw, 11px)', color: '#1F3D2B', margin: 0, letterSpacing: '1px' } }, 'Beauty Studio')
            )
          ),
          React.createElement('div', { style: { display: 'none' } }, // Desktop nav hidden for simplicity, mobile-first
            React.createElement('nav', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
              React.createElement(Link, { href: '/', style: { color: '#1F3D2B', textDecoration: 'none', fontSize: '13px', fontWeight: '600' } }, 'Home'),
              React.createElement(Link, { href: '/shop', style: { color: '#1F3D2B', textDecoration: 'none', fontSize: '13px', fontWeight: '600' } }, 'Shop'),
              React.createElement(Link, { href: '/about', style: { color: '#1F3D2B', textDecoration: 'none', fontSize: '13px', fontWeight: '600' } }, 'About'),
              React.createElement(Link, { href: '/contact', style: { color: '#1F3D2B', textDecoration: 'none', fontSize: '13px', fontWeight: '600' } }, 'Contact')
            )
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
            React.createElement(Link, { href: '/shop', style: { color: '#1F3D2B', textDecoration: 'none', fontSize: 'clamp(11px, 1.5vw, 13px)', fontWeight: '600', whiteSpace: 'nowrap' } }, 'Shop'),
            React.createElement(Link, { href: '/account', style: { color: '#1F3D2B', textDecoration: 'none', fontSize: 'clamp(11px, 1.5vw, 13px)', fontWeight: '600', whiteSpace: 'nowrap' } }, 'Account'),
            React.createElement(Link, { href: '/cart', style: { position: 'relative', background: '#C6A75E', color: 'white', padding: 'clamp(8px, 1.5vw, 10px) clamp(14px, 2vw, 20px)', borderRadius: '25px', textDecoration: 'none', fontSize: 'clamp(11px, 1.5vw, 13px)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap', flexShrink: 0 } },
              'Cart',
              totalItems > 0 && React.createElement('span', { style: { background: '#1F3D2B', color: '#C6A75E', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' } }, totalItems)
            )
          )
        )
      )
    )
  );
}
