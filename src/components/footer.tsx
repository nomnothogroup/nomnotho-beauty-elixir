'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert('Thank you for joining the Glow Club! Check your email for your 10% discount code.');
      setEmail('');
    }
  };

  return (
    <footer style={{ background: '#1F3D2B', color: '#F5F1E8', padding: '64px 0 24px' }}>
      <div className='max-w-7xl mx-auto px-4'>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginBottom: '48px' }}>
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#C6A75E', marginBottom: '16px' }}>Nomnotho Beauty Studio</h3>
            <p style={{ color: '#F5F1E8', opacity: 0.8, fontSize: '14px', marginBottom: '24px', lineHeight: '1.6' }}>
              Premium African botanical skincare and haircare. Natural + Premium + Healing.
            </p>
            
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontWeight: '600', color: '#C6A75E', marginBottom: '12px', fontSize: '14px' }}>
                Join the Glow Club
              </h4>
              <p style={{ color: '#F5F1E8', opacity: 0.7, fontSize: '12px', marginBottom: '12px' }}>
                Get 10% off your first order
              </p>
              <form onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '13px',
                    marginBottom: '8px',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: '#C6A75E',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '6px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  Subscribe
                </button>
              </form>
            </div>

            <div>
              <h4 style={{ fontWeight: '600', color: '#C6A75E', marginBottom: '12px', fontSize: '14px' }}>
                Follow Us
              </h4>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a
                  href="https://instagram.com/nomnothobeautystudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(198, 167, 94, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    textDecoration: 'none',
                    color: '#C6A75E'
                  }}
                >
                  📷
                </a>
                <a
                  href="https://tiktok.com/@nomnothobeautystudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(198, 167, 94, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    textDecoration: 'none',
                    color: '#C6A75E'
                  }}
                >
                  🎵
                </a>
                <a
                  href="https://facebook.com/nomnothobeautystudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(198, 167, 94, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    textDecoration: 'none',
                    color: '#C6A75E'
                  }}
                >
                  📘
                </a>
                <a
                  href="https://pinterest.com/nomnothobeautystudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(198, 167, 94, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    textDecoration: 'none',
                    color: '#C6A75E'
                  }}
                >
                  📌
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: '600', color: '#C6A75E', marginBottom: '16px', fontSize: '16px' }}>Shop</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/shop" style={{ color: '#F5F1E8', opacity: 0.7, fontSize: '14px', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}>
                  All Products
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/shop?category=skincare" style={{ color: '#F5F1E8', opacity: 0.7, fontSize: '14px', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}>
                  Skincare
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/shop?category=haircare" style={{ color: '#F5F1E8', opacity: 0.7, fontSize: '14px', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}>
                  Haircare
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/shop?category=makeup" style={{ color: '#F5F1E8', opacity: 0.7, fontSize: '14px', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}>
                  Makeup
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/shop?category=soaps" style={{ color: '#F5F1E8', opacity: 0.7, fontSize: '14px', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}>
                  Organic Soaps
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontWeight: '600', color: '#C6A75E', marginBottom: '16px', fontSize: '16px' }}>Information</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/about" style={{ color: '#F5F1E8', opacity: 0.7, fontSize: '14px', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}>
                  About Us
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/delivery" style={{ color: '#F5F1E8', opacity: 0.7, fontSize: '14px', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}>
                  Delivery Information
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/privacy" style={{ color: '#F5F1E8', opacity: 0.7, fontSize: '14px', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}>
                  Privacy Policy
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/popia" style={{ color: '#F5F1E8', opacity: 0.7, fontSize: '14px', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}>
                  POPIA Compliance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontWeight: '600', color: '#C6A75E', marginBottom: '16px', fontSize: '16px' }}>Contact</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '24px' }}>
              <li style={{ marginBottom: '12px' }}>
                <a
                  href="mailto:info@nomnothobeautystudio.co.za"
                  style={{ color: '#F5F1E8', opacity: 0.7, fontSize: '14px', textDecoration: 'none', transition: 'opacity 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
                >
                  info@nomnothobeautystudio.co.za
                </a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a
                  href="tel:0761286545"
                  style={{ color: '#F5F1E8', opacity: 0.7, fontSize: '14px', textDecoration: 'none', transition: 'opacity 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
                >
                  076 128 6545
                </a>
              </li>
            </ul>

            <h4 style={{ fontWeight: '600', color: '#C6A75E', marginBottom: '12px', fontSize: '14px' }}>
              Payment Methods
            </h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ 
                background: 'white', 
                padding: '8px 12px', 
                borderRadius: '4px', 
                fontSize: '11px', 
                fontWeight: '600', 
                color: '#1F3D2B' 
              }}>
                Yoco
              </div>
              <div style={{ 
                background: 'white', 
                padding: '8px 12px', 
                borderRadius: '4px', 
                fontSize: '11px', 
                fontWeight: '600', 
                color: '#1F3D2B' 
              }}>
                Ozow
              </div>
              <div style={{ 
                background: 'white', 
                padding: '8px 12px', 
                borderRadius: '4px', 
                fontSize: '11px', 
                fontWeight: '600', 
                color: '#1F3D2B' 
              }}>
                EFT
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(245,241,232,0.1)', paddingTop: '24px', textAlign: 'center' }}>
          <p style={{ color: '#F5F1E8', opacity: 0.6, fontSize: '13px' }}>
            © 2026 Nomnotho Beauty Studio. All rights reserved. Part of Nomnotho Group of Companies.
          </p>
        </div>
      </div>
    </footer>
  );
}
