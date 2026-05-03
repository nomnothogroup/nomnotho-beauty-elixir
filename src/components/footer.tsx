import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#1F3D2B', color: '#F5F1E8', padding: '64px 0 24px' }}>
      <div className='max-w-7xl mx-auto px-4'>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginBottom: '48px' }}>
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#C6A75E', marginBottom: '16px' }}>Nomnotho Beauty Studio</h3>
            <p style={{ color: '#F5F1E8', opacity: 0.8, fontSize: '14px', marginBottom: '12px' }}>Premium African botanical skincare and haircare.</p>
            <p style={{ color: '#C6A75E', fontSize: '14px', fontWeight: '600' }}>Flat R99 delivery on all orders</p>
          </div>
          <div>
            <h4 style={{ fontWeight: '600', color: '#C6A75E', marginBottom: '12px' }}>Shop</h4>
            <Link href='/shop' style={{ display: 'block', color: '#F5F1E8', opacity: 0.7, fontSize: '14px', textDecoration: 'none', marginBottom: '8px' }}>All Products</Link>
            <Link href='/shop?category=skincare' style={{ display: 'block', color: '#F5F1E8', opacity: 0.7, fontSize: '14px', textDecoration: 'none', marginBottom: '8px' }}>Skincare</Link>
            <Link href='/shop?category=haircare' style={{ display: 'block', color: '#F5F1E8', opacity: 0.7, fontSize: '14px', textDecoration: 'none', marginBottom: '8px' }}>Haircare</Link>
          </div>
          <div>
            <h4 style={{ fontWeight: '600', color: '#C6A75E', marginBottom: '12px' }}>Info</h4>
            <Link href='/about' style={{ display: 'block', color: '#F5F1E8', opacity: 0.7, fontSize: '14px', textDecoration: 'none', marginBottom: '8px' }}>About Us</Link>
            <Link href='/delivery' style={{ display: 'block', color: '#F5F1E8', opacity: 0.7, fontSize: '14px', textDecoration: 'none', marginBottom: '8px' }}>Delivery</Link>
            <Link href='/privacy' style={{ display: 'block', color: '#F5F1E8', opacity: 0.7, fontSize: '14px', textDecoration: 'none', marginBottom: '8px' }}>Privacy Policy</Link>
            <Link href='/popia' style={{ display: 'block', color: '#F5F1E8', opacity: 0.7, fontSize: '14px', textDecoration: 'none', marginBottom: '8px' }}>POPIA</Link>
          </div>
          <div>
            <h4 style={{ fontWeight: '600', color: '#C6A75E', marginBottom: '12px' }}>Contact</h4>
            <p style={{ color: '#F5F1E8', opacity: 0.7, fontSize: '14px', marginBottom: '8px' }}>info@nomnothobeautystudio.co.za</p>
            <p style={{ color: '#F5F1E8', opacity: 0.7, fontSize: '14px', marginBottom: '12px' }}>076 128 6545</p>
            <h4 style={{ fontWeight: '600', color: '#C6A75E', marginBottom: '8px', fontSize: '13px' }}>Payment Methods</h4>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ background: 'white', color: '#1F3D2B', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>SnapScan</span>
              <span style={{ background: 'white', color: '#1F3D2B', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>PayPal</span>
              <span style={{ background: 'white', color: '#1F3D2B', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>EFT</span>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(245,241,232,0.1)', paddingTop: '24px', textAlign: 'center' }}>
          <p style={{ color: '#F5F1E8', opacity: 0.5, fontSize: '13px' }}>2026 Nomnotho Beauty Studio. Part of Nomnotho Group of Companies.</p>
        </div>
      </div>
    </footer>
  );
}
