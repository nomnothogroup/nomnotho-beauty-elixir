import React from 'react';

export default function ContactPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F5F1E8' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(to bottom right, #1F3D2B, #2d5a3f)', padding: '80px 0' }}>
        <div className='max-w-4xl mx-auto text-center px-4'>
          <span style={{ fontSize: '56px', display: 'block', marginBottom: '16px' }}></span>
          <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#F5F1E8', marginBottom: '12px' }}>Get in Touch</h1>
          <p style={{ color: '#C6A75E', fontSize: '20px' }}>We'd love to hear from you</p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section style={{ padding: '80px 0' }}>
        <div className='max-w-6xl mx-auto px-4'>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
            {/* Left - Contact Info */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '32px' }}>Contact Information</h2>
              
              <div style={{ display: 'grid', gap: '16px', marginBottom: '32px' }}>
                <div style={{ background: 'white', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 2px 8px rgba(31,61,43,0.06)' }}>
                  <div style={{ width: '48px', height: '48px', background: '#1F3D2B', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}></div>
                  <div>
                    <h3 style={{ fontWeight: 'bold', color: '#1F3D2B', fontSize: '15px' }}>Email</h3>
                    <a href="mailto:admin@nomnombeautystudio.co.za" style={{ color: '#C6A75E', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>admin@nomnombeautystudio.co.za</a>
                  </div>
                </div>

                <div style={{ background: 'white', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 2px 8px rgba(31,61,43,0.06)' }}>
                  <div style={{ width: '48px', height: '48px', background: '#25D366', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}></div>
                  <div>
                    <h3 style={{ fontWeight: 'bold', color: '#1F3D2B', fontSize: '15px' }}>WhatsApp</h3>
                    <a href="https://wa.me/27761286545" style={{ color: '#25D366', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>076 128 6545</a>
                  </div>
                </div>

                <div style={{ background: 'white', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 2px 8px rgba(31,61,43,0.06)' }}>
                  <div style={{ width: '48px', height: '48px', background: '#1F3D2B', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}></div>
                  <div>
                    <h3 style={{ fontWeight: 'bold', color: '#1F3D2B', fontSize: '15px' }}>Phone</h3>
                    <a href="tel:0761286545" style={{ color: '#C6A75E', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>076 128 6545</a>
                  </div>
                </div>

                <div style={{ background: 'white', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 2px 8px rgba(31,61,43,0.06)' }}>
                  <div style={{ width: '48px', height: '48px', background: '#1F3D2B', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}></div>
                  <div>
                    <h3 style={{ fontWeight: 'bold', color: '#1F3D2B', fontSize: '15px' }}>Location</h3>
                    <p style={{ color: '#8B5E3C', fontWeight: '600', fontSize: '14px' }}>Pretoria, Gauteng, South Africa</p>
                  </div>
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(31,61,43,0.06)', marginBottom: '16px' }}>
                <h3 style={{ fontWeight: 'bold', color: '#1F3D2B', fontSize: '16px', marginBottom: '12px' }}>Business Hours</h3>
                <p style={{ color: '#4a5568', fontSize: '14px', marginBottom: '4px' }}>MonFri: 08:0017:00</p>
                <p style={{ color: '#4a5568', fontSize: '14px' }}>Sat: 09:0013:00</p>
              </div>

              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(31,61,43,0.06)' }}>
                <h3 style={{ fontWeight: 'bold', color: '#1F3D2B', fontSize: '16px', marginBottom: '12px' }}>Follow Us</h3>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <a href="#" style={{ color: '#8B5E3C', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>Instagram</a>
                  <a href="#" style={{ color: '#8B5E3C', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>TikTok</a>
                  <a href="#" style={{ color: '#8B5E3C', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>Facebook</a>
                  <a href="#" style={{ color: '#8B5E3C', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>Pinterest</a>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '32px' }}>Send Us a Message</h2>
              <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 8px rgba(31,61,43,0.06)' }}>
                <form style={{ display: 'grid', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#1F3D2B', fontSize: '14px' }}>Your name</label>
                    <input type="text" style={{ width: '100%', padding: '14px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', color: '#1F3D2B', outline: 'none' }} placeholder="Your name" />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#1F3D2B', fontSize: '14px' }}>Your email</label>
                    <input type="email" style={{ width: '100%', padding: '14px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', color: '#1F3D2B', outline: 'none' }} placeholder="Your email" />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#1F3D2B', fontSize: '14px' }}>Subject</label>
                    <input type="text" style={{ width: '100%', padding: '14px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', color: '#1F3D2B', outline: 'none' }} placeholder="Subject" />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#1F3D2B', fontSize: '14px' }}>Your message</label>
                    <textarea rows={5} style={{ width: '100%', padding: '14px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', color: '#1F3D2B', outline: 'none', resize: 'vertical' }} placeholder="Your message"></textarea>
                  </div>
                  <button type="submit" style={{ background: '#C6A75E', color: 'white', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
