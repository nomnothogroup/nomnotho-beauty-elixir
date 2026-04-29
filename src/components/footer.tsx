export default function Footer() {
  return (
    <footer style={{ background: '#1F3D2B', color: '#F5F1E8', padding: '48px 0 24px' }}>
      <div className='max-w-7xl mx-auto px-4'>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', marginBottom: '48px' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#C6A75E', marginBottom: '16px' }}>Nomnotho Beauty Studio</h3>
            <p style={{ color: '#F5F1E8', opacity: 0.8, fontSize: '14px' }}>Premium African botanical skincare and haircare.</p>
          </div>
          <div>
            <h4 style={{ fontWeight: '600', color: '#C6A75E', marginBottom: '12px' }}>Shop</h4>
            <p style={{ color: '#F5F1E8', opacity: 0.7, fontSize: '14px' }}>Skincare</p>
            <p style={{ color: '#F5F1E8', opacity: 0.7, fontSize: '14px' }}>Haircare</p>
          </div>
          <div>
            <h4 style={{ fontWeight: '600', color: '#C6A75E', marginBottom: '12px' }}>Info</h4>
            <p style={{ color: '#F5F1E8', opacity: 0.7, fontSize: '14px' }}>About</p>
            <p style={{ color: '#F5F1E8', opacity: 0.7, fontSize: '14px' }}>Delivery</p>
          </div>
          <div>
            <h4 style={{ fontWeight: '600', color: '#C6A75E', marginBottom: '12px' }}>Contact</h4>
            <p style={{ color: '#F5F1E8', opacity: 0.7, fontSize: '14px' }}>info@nomnothobeautystudio.co.za</p>
            <p style={{ color: '#F5F1E8', opacity: 0.7, fontSize: '14px' }}>076 128 6545</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(245,241,232,0.1)', paddingTop: '24px', textAlign: 'center' }}>
          <p style={{ color: '#F5F1E8', opacity: 0.5, fontSize: '14px' }}> 2025 Nomnotho Group of Companies</p>
        </div>
      </div>
    </footer>
  );
}
