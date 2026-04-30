'use client';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ background: '#1F3D2B', color: '#F5F1E8', textAlign: 'center', fontSize: '13px', padding: '8px 16px' }}>
        Flat R99 delivery on all orders | 10% off - Natural + Premium + Healing
      </div>
      <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div className='max-w-7xl mx-auto px-4'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
            <Link href='/' style={{ textDecoration: 'none' }}>
              <div style={{ lineHeight: '1.2' }}>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#C6A75E', margin: 0, letterSpacing: '2px' }}>NOMNOM</p>
                <p style={{ fontSize: '11px', color: '#1F3D2B', margin: 0, letterSpacing: '1px' }}>Beauty Studio</p>
              </div>
            </Link>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Link href='/' style={{ color: '#1F3D2B', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>Home</Link>
              <Link href='/shop' style={{ color: '#1F3D2B', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>Shop</Link>
              <Link href='/about' style={{ color: '#1F3D2B', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>About</Link>
              <Link href='/contact' style={{ color: '#1F3D2B', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>Contact</Link>
            </nav>
            <Link href='/account' style={{ color: '#1F3D2B', textDecoration: 'none', fontSize: '13px', fontWeight: '600', marginRight: '12px' }}>Account</Link> style={{ background: '#C6A75E', color: 'white', padding: '10px 20px', borderRadius: '25px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold', position: 'relative' }}>
              Cart
              {totalItems > 0 && (
                <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#1F3D2B', color: '#C6A75E', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}


