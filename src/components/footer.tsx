import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#1F3D2B', color: '#F5F1E8', padding: '64px 0 24px' }}>
      <div className='max-w-7xl mx-auto px-4'>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginBottom: '48px' }}>
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#C6A75E', marginBottom: '16px' }}>Nomnotho Beauty Studio</h3>
            <p style={{ color: '#F5F1E8', opacity: 0.8, fontSize: '14px', marginBottom: '12px' }}>Premium African botanical skincare and haircare.</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <a href="https://www.facebook.com/share/1AgjSsbcUe/" target="_blank" rel="noopener noreferrer" style={{ background: '#1877F2', color: 'white', width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>f</a>
              <a href="https://www.instagram.com/nomnothoonline" target="_blank" rel="noopener noreferrer" style={{ background: '#E4405F', color: 'white', width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>ig</a>
              <a href="https://tiktok.com/@nomnotho_beauty_studio" target="_blank" rel="noopener noreferrer" style={{ background: '#000', color: 'white', width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px' }}>TT</a>
            </div>
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
          </div>
          <div>
            <h4 style={{ fontWeight: '600', color: '#C6A75E', marginBottom: '12px' }}>Contact</h4>
            <p style={{ color: '#F5F1E8', opacity: 0.7, fontSize: '14px' }}>info@nomnothobeautystudio.co.za</p>
            <p style={{ color: '#F5F1E8', opacity: 0.7, fontSize: '14px' }}>076 128 6545</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(245,241,232,0.1)', paddingTop: '24px', textAlign: 'center' }}>
          <p style={{ color: '#F5F1E8', opacity: 0.5, fontSize: '13px' }}>2026 Nomnotho Beauty Studio. Part of Nomnotho Group of Companies.</p>
        </div>
      </div>
    </footer>
  );
}
