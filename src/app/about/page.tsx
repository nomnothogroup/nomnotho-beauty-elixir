import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F5F1E8' }}>
      <section style={{ background: 'linear-gradient(to bottom right, #1F3D2B, #2d5a3f)', padding: '80px 0' }}>
        <div className='max-w-4xl mx-auto text-center px-4'>
          <span style={{ fontSize: '56px', display: 'block', marginBottom: '16px' }}></span>
          <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#F5F1E8', marginBottom: '12px' }}>About Nomnotho Beauty Studio</h1>
          <p style={{ color: '#C6A75E', fontSize: '20px' }}>Part of Nomnotho Group of Companies</p>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className='max-w-4xl mx-auto px-4'>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', marginBottom: '64px' }}>
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '20px' }}>Our Story</h2>
              <p style={{ color: '#4a5568', lineHeight: '1.8', fontSize: '16px', marginBottom: '16px' }}>
                Nomnotho Beauty Studio was born from a deep passion for natural African beauty and wellness. 
                We believe that true radiance comes from nature, which is why our Nomnotho Elixir products are 
                crafted with the finest African botanicals, sourced ethically and sustainably  from the marula 
                groves of Limpopo to the healing plants of the Kalahari.
              </p>
              <p style={{ color: '#4a5568', lineHeight: '1.8', fontSize: '16px' }}>
                Every product is carefully formulated to nourish, protect, and enhance your natural beauty. 
                From our signature face creams to restorative hair oils, each Nomnotho Elixir is a celebration 
                of African heritage combined with modern science.
              </p>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #1F3D2B, #2d5a3f)', borderRadius: '24px', padding: '48px', textAlign: 'center', color: 'white' }}>
              <span style={{ fontSize: '80px', display: 'block', marginBottom: '16px' }}></span>
              <p style={{ fontSize: '18px', color: '#C6A75E', fontStyle: 'italic' }}>"A Woman-Owned African Herbal Concept"</p>
            </div>
          </div>

          <div style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '32px', textAlign: 'center' }}>Our Mission</h2>
            <p style={{ color: '#4a5568', fontSize: '16px', lineHeight: '1.8', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
              To provide premium, natural skincare and haircare solutions that unlock every person's natural beauty. 
              We are committed to quality, sustainability, and celebrating African botanical wisdom.
            </p>
          </div>

          <div style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '32px', textAlign: 'center' }}>Why Choose Nomnotho?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {[
                { icon: '', title: '100% Natural', desc: 'African botanical ingredients sourced sustainably' },
                { icon: '', title: 'Quality Tested', desc: 'Dermatologically approved and tested' },
                { icon: '', title: 'Proudly South African', desc: 'Locally made with love and care' },
                { icon: '', title: 'Cruelty Free', desc: 'Never tested on animals' }
              ].map((item, i) => (
                <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '32px', textAlign: 'center', boxShadow: '0 4px 16px rgba(31,61,43,0.06)' }}>
                  <span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>{item.icon}</span>
                  <h3 style={{ fontWeight: 'bold', color: '#1F3D2B', marginBottom: '8px', fontSize: '17px' }}>{item.title}</h3>
                  <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/shop" style={{ background: '#C6A75E', color: 'white', padding: '16px 48px', borderRadius: '50px', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold', display: 'inline-block' }}>
              Shop the Collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
