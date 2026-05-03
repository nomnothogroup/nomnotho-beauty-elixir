'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useCart } from '@/lib/cart-context';

export default function Header() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState('');

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? '' : name);
  };

  const closeAll = () => {
    setActiveDropdown('');
    setMobileOpen(false);
  };

  const linkStyle = { color: '#1F3D2B', textDecoration: 'none', fontSize: '13px', fontWeight: 600, display: 'block', padding: '4px 0' };
  const subLinkStyle = { color: '#666', textDecoration: 'none', fontSize: '12px', display: 'block', padding: '3px 0' };
  const sectionTitle = { fontWeight: 'bold', color: '#C6A75E', fontSize: '11px', textTransform: 'uppercase' as const, letterSpacing: '1px', marginBottom: '8px' };
  const dropdownCard = { background: 'white', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', padding: '24px', minWidth: '700px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', position: 'absolute' as const, top: '100%', left: '50%', transform: 'translateX(-50%)', zIndex: 200 };

  return React.createElement('header', { style: { position: 'sticky', top: 0, zIndex: 100, width: '100%' } },
    React.createElement('div', { style: { background: '#1F3D2B', color: '#F5F1E8', textAlign: 'center', fontSize: 'clamp(10px, 1.3vw, 12px)', padding: '6px 12px' } }, 'Flat R99 delivery | Free over R1000 | 10% off orders over R500'),
    
    React.createElement('div', { style: { background: 'white', borderBottom: '1px solid #e5e7eb', position: 'relative' } },
      React.createElement('div', { style: { maxWidth: '1200px', margin: '0 auto', padding: '0 16px' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' } },
          
          // Logo
          React.createElement(Link, { href: '/', onClick: closeAll, style: { textDecoration: 'none', flexShrink: 0 } },
            React.createElement('div', { style: { lineHeight: '1.2' } },
              React.createElement('p', { style: { fontSize: 'clamp(15px, 2.5vw, 18px)', fontWeight: 'bold', color: '#C6A75E', margin: 0, letterSpacing: '2px' } }, 'NOMNOM'),
              React.createElement('p', { style: { fontSize: 'clamp(9px, 1.2vw, 11px)', color: '#1F3D2B', margin: 0, letterSpacing: '1px' } }, 'Beauty Studio')
            )
          ),

          // Desktop Navigation
          React.createElement('nav', { style: { display: 'flex', alignItems: 'center', gap: '20px' } },
            
            // Shop All - Mega Menu
            React.createElement('div', { style: { position: 'relative' }, onMouseEnter: () => toggleDropdown('shop'), onMouseLeave: () => setActiveDropdown('') },
              React.createElement('span', { style: { ...linkStyle, cursor: 'pointer' } }, '\uD83D\uDED2 Shop All'),
              activeDropdown === 'shop' && React.createElement('div', { style: dropdownCard },
                React.createElement('div', null,
                  React.createElement('p', { style: sectionTitle }, 'Skin Care'),
                  React.createElement(Link, { href: '/shop?category=skincare', style: { ...linkStyle, marginBottom: '6px' } }, 'All Skincare'),
                  React.createElement('p', { style: { ...sectionTitle, marginTop: '12px', fontSize: '10px' } }, 'By Category'),
                  React.createElement(Link, { href: '/shop?category=skincare&sub=cleansers', style: subLinkStyle }, 'Cleansers'),
                  React.createElement(Link, { href: '/shop?category=skincare&sub=serums', style: subLinkStyle }, 'Serums'),
                  React.createElement(Link, { href: '/shop?category=skincare&sub=moisturizers', style: subLinkStyle }, 'Moisturizers'),
                  React.createElement(Link, { href: '/shop?category=skincare&sub=sunscreen', style: subLinkStyle }, 'Sunscreen'),
                  React.createElement(Link, { href: '/shop?category=skincare&sub=toners', style: subLinkStyle }, 'Toners'),
                  React.createElement(Link, { href: '/shop?category=skincare&sub=oils', style: subLinkStyle }, 'Oils')
                ),
                React.createElement('div', null,
                  React.createElement('p', { style: sectionTitle }, 'By Concern'),
                  React.createElement(Link, { href: '/shop?concern=acne', style: subLinkStyle }, 'Acne & Oily Skin'),
                  React.createElement(Link, { href: '/shop?concern=aging', style: subLinkStyle }, 'Aging & Wrinkles'),
                  React.createElement(Link, { href: '/shop?concern=dryness', style: subLinkStyle }, 'Dryness & Hydration'),
                  React.createElement(Link, { href: '/shop?concern=sensitive', style: subLinkStyle }, 'Sensitivity & Redness'),
                  React.createElement(Link, { href: '/shop?concern=darkspots', style: subLinkStyle }, 'Dark Spots'),
                  React.createElement('p', { style: { ...sectionTitle, marginTop: '16px' } }, 'Hair Care'),
                  React.createElement(Link, { href: '/shop?category=haircare', style: { ...linkStyle, marginBottom: '6px' } }, 'All Haircare'),
                  React.createElement(Link, { href: '/shop?category=haircare&sub=shampoos', style: subLinkStyle }, 'Shampoos'),
                  React.createElement(Link, { href: '/shop?category=haircare&sub=conditioners', style: subLinkStyle }, 'Conditioners'),
                  React.createElement(Link, { href: '/shop?category=haircare&sub=oils', style: subLinkStyle }, 'Oils & Serums'),
                  React.createElement(Link, { href: '/shop?category=haircare&sub=treatments', style: subLinkStyle }, 'Treatments')
                ),
                React.createElement('div', null,
                  React.createElement('p', { style: sectionTitle }, 'More'),
                  React.createElement(Link, { href: '/shop?category=makeup', style: { ...linkStyle, marginBottom: '6px' } }, 'Makeup'),
                  React.createElement(Link, { href: '/shop?category=soaps', style: { ...linkStyle, marginBottom: '6px' } }, 'Organic Soaps'),
                  React.createElement(Link, { href: '/shop?category=solutions', style: { ...linkStyle, marginBottom: '6px' } }, 'Skin Solutions'),
                  React.createElement(Link, { href: '/shop?category=perfumes', style: { ...linkStyle, marginBottom: '6px' } }, 'Perfumes'),
                  React.createElement(Link, { href: '/shop?category=manuals', style: { ...linkStyle, marginBottom: '6px' } }, 'Digital Manuals'),
                  React.createElement('p', { style: { ...sectionTitle, marginTop: '16px' } }, 'Routines & Sets'),
                  React.createElement(Link, { href: '/shop?category=bundles', style: subLinkStyle }, 'Bundles'),
                  React.createElement(Link, { href: '/shop?featured=best', style: subLinkStyle }, 'Best Sellers')
                )
              )
            ),

            // Quick Links
            React.createElement(Link, { href: '/shop?category=skincare', style: linkStyle }, 'Skin Care'),
            React.createElement(Link, { href: '/shop?category=haircare', style: linkStyle }, 'Hair Care'),
            React.createElement(Link, { href: '/shop?category=makeup', style: linkStyle }, 'Makeup'),
            React.createElement(Link, { href: '/about', style: linkStyle }, 'About'),
            React.createElement(Link, { href: '/contact', style: linkStyle }, 'Contact')
          ),

          // Right Side
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
            React.createElement(Link, { href: '/account', style: { color: '#1F3D2B', textDecoration: 'none', fontSize: '13px', fontWeight: '600' } }, 'Login'),
            React.createElement(Link, { href: '/cart', style: { background: '#C6A75E', color: 'white', padding: '10px 20px', borderRadius: '25px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' } },
              'Cart',
              totalItems > 0 && React.createElement('span', { style: { background: '#1F3D2B', color: '#C6A75E', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' } }, totalItems)
            ),
            // Mobile hamburger
            React.createElement('button', { onClick: () => setMobileOpen(!mobileOpen), style: { display: 'none', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#1F3D2B' } }, '\u2630')
          )
        ),

        // Mobile Menu
        mobileOpen && React.createElement('div', { style: { background: 'white', borderTop: '1px solid #e5e7eb', padding: '12px 0' } },
          React.createElement(Link, { href: '/shop', onClick: closeAll, style: { display: 'block', padding: '10px 16px', color: '#1F3D2B', textDecoration: 'none', fontSize: '15px', fontWeight: '600' } }, '\uD83D\uDED2 Shop All'),
          React.createElement(Link, { href: '/shop?category=skincare', onClick: closeAll, style: { display: 'block', padding: '10px 16px', color: '#1F3D2B', textDecoration: 'none', fontSize: '14px' } }, '\u2728 Skin Care'),
          React.createElement(Link, { href: '/shop?category=haircare', onClick: closeAll, style: { display: 'block', padding: '10px 16px', color: '#1F3D2B', textDecoration: 'none', fontSize: '14px' } }, '\uD83D\uDC87 Hair Care'),
          React.createElement(Link, { href: '/shop?category=makeup', onClick: closeAll, style: { display: 'block', padding: '10px 16px', color: '#1F3D2B', textDecoration: 'none', fontSize: '14px' } }, '\uD83D\uDC84 Makeup'),
          React.createElement(Link, { href: '/about', onClick: closeAll, style: { display: 'block', padding: '10px 16px', color: '#1F3D2B', textDecoration: 'none', fontSize: '14px' } }, '\uD83C\uDF3F About'),
          React.createElement(Link, { href: '/contact', onClick: closeAll, style: { display: 'block', padding: '10px 16px', color: '#1F3D2B', textDecoration: 'none', fontSize: '14px' } }, '\uD83D\uDCDE Contact')
        )
      )
    )
  );
}
