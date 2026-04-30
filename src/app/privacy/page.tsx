import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div style={{ background: '#F5F1E8', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg, #1F3D2B, #2d5a3f)', padding: '80px 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#F5F1E8', marginBottom: '16px' }}>Privacy Policy</h1>
        <p style={{ color: '#C6A75E', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          How we collect, use, and protect your personal information
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(31,61,43,0.1)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '20px' }}>
            Introduction
          </h2>
          <p style={{ color: '#4a5568', fontSize: '16px', lineHeight: '1.8', marginBottom: '16px' }}>
            Nomnotho Beauty Studio, a division of Nomnotho Group of Companies, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information in compliance with South Africa's Protection of Personal Information Act (POPIA).
          </p>
          <p style={{ color: '#4a5568', fontSize: '16px', lineHeight: '1.8' }}>
            By using our website and services, you agree to the collection and use of information in accordance with this policy.
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(31,61,43,0.1)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '24px' }}>
            We Never Sell Your Data
          </h2>
          <p style={{ color: '#4a5568', fontSize: '16px', lineHeight: '1.8', marginBottom: '16px' }}>
            <strong>We do not sell, rent, or trade your personal information to third parties for marketing purposes.</strong> Your data is used exclusively to provide you with our products and services.
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(31,61,43,0.1)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '24px' }}>
            Contact Us
          </h2>
          <p style={{ color: '#4a5568', fontSize: '16px', marginBottom: '24px', lineHeight: '1.6' }}>
            For any privacy-related inquiries, data access requests, or to exercise your rights under POPIA, please contact us.
          </p>
          <div style={{ background: 'rgba(31,61,43,0.05)', borderRadius: '12px', padding: '24px', maxWidth: '400px' }}>
            <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#1F3D2B' }}>
              Email: info@nomnothobeautystudio.co.za
            </p>
            <p style={{ fontSize: '16px', color: '#8B5E3C', marginBottom: '8px' }}>
              Phone: 076 128 6545
            </p>
            <p style={{ fontSize: '14px', color: '#8B5E3C' }}>
              WhatsApp: <a href="https://wa.me/27761286545" style={{ color: '#C6A75E', textDecoration: 'underline' }}>+27 76 128 6545</a>
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link 
            href="/" 
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
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
