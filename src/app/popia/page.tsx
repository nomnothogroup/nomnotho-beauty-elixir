import Link from 'next/link';

export default function PopiaPage() {
  return (
    <div style={{ background: '#F5F1E8', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg, #1F3D2B, #2d5a3f)', padding: '80px 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#F5F1E8', marginBottom: '16px' }}>POPIA Compliance</h1>
        <p style={{ color: '#C6A75E', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          Protection of Personal Information Act
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(31,61,43,0.1)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '20px' }}>
            Our Commitment to POPIA
          </h2>
          <p style={{ color: '#4a5568', fontSize: '16px', lineHeight: '1.8', marginBottom: '16px' }}>
            Nomnotho Beauty Studio, a division of Nomnotho Group of Companies, is fully committed to complying with South Africa's Protection of Personal Information Act (POPIA). We take the protection of your personal information seriously and implement appropriate measures to safeguard your data.
          </p>
          <p style={{ color: '#4a5568', fontSize: '16px', lineHeight: '1.8' }}>
            POPIA regulates the processing of personal information by public and private bodies. It aims to protect individuals from harm by protecting their personal information, and to regulate the processing of personal information in a manner that gives effect to the right to privacy.
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(31,61,43,0.1)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '24px' }}>
            Your Rights Under POPIA
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '16px' }}>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: '#C6A75E', fontWeight: 'bold' }}>•</span>
              <span style={{ color: '#4a5568', fontSize: '15px', lineHeight: '1.6' }}>
                Right to access your personal information
              </span>
            </li>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: '#C6A75E', fontWeight: 'bold' }}>•</span>
              <span style={{ color: '#4a5568', fontSize: '15px', lineHeight: '1.6' }}>
                Right to correction of your personal information
              </span>
            </li>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: '#C6A75E', fontWeight: 'bold' }}>•</span>
              <span style={{ color: '#4a5568', fontSize: '15px', lineHeight: '1.6' }}>
                Right to deletion of your personal information
              </span>
            </li>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: '#C6A75E', fontWeight: 'bold' }}>•</span>
              <span style={{ color: '#4a5568', fontSize: '15px', lineHeight: '1.6' }}>
                Right to object to processing of your personal information
              </span>
            </li>
          </ul>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1F3D2B, #2d5a3f)', borderRadius: '16px', padding: '40px', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>
            Data Protection Officer
          </h2>
          <p style={{ color: '#C6A75E', fontSize: '16px', marginBottom: '24px', lineHeight: '1.6' }}>
            For any data protection requests, access requests, or POPIA-related inquiries, please contact our Data Protection Officer.
          </p>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '24px', maxWidth: '400px', margin: '0 auto' }}>
            <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              Email: info@nomnothobeautystudio.co.za
            </p>
            <p style={{ fontSize: '16px', color: '#C6A75E' }}>
              Phone: 076 128 6545
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
