import Link from 'next/link';

export default function DeliveryPage() {
  return (
    <div style={{ background: '#F5F1E8', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg, #1F3D2B, #2d5a3f)', padding: '80px 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#F5F1E8', marginBottom: '16px' }}>Delivery Information</h1>
        <p style={{ color: '#C6A75E', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          Nationwide shipping across South Africa
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(31,61,43,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '64px', display: 'block', marginBottom: '16px' }}>🚚</span>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '12px' }}>
              Flat Rate Delivery
            </h2>
            <p style={{ fontSize: '48px', fontWeight: 'bold', color: '#C6A75E', marginBottom: '8px' }}>R99</p>
            <p style={{ color: '#8B5E3C', fontSize: '16px' }}>On all orders, nationwide</p>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(31,61,43,0.1)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '24px' }}>
            Delivery Time
          </h2>
          <div style={{ display: 'grid', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '24px', color: '#C6A75E' }}>📦</span>
              <div>
                <h3 style={{ fontWeight: '600', color: '#1F3D2B', fontSize: '18px', marginBottom: '8px' }}>
                  Processing Time
                </h3>
                <p style={{ color: '#4a5568', fontSize: '15px', lineHeight: '1.6' }}>
                  Orders are processed within 1-2 business days
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '24px', color: '#C6A75E' }}>🚛</span>
              <div>
                <h3 style={{ fontWeight: '600', color: '#1F3D2B', fontSize: '18px', marginBottom: '8px' }}>
                  Shipping Time
                </h3>
                <p style={{ color: '#4a5568', fontSize: '15px', lineHeight: '1.6' }}>
                  3-7 working days for nationwide delivery
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link 
            href="/shop" 
            style={{ 
              display: 'inline-block',
              background: '#C6A75E', 
              color: 'white', 
              padding: '16px 40px', 
              borderRadius: '50px', 
              textDecoration: 'none', 
              fontSize: '16px', 
              fontWeight: 'bold' 
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
