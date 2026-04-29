'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@nomnotho.co.za' && password === 'nomnotho2024') {
      localStorage.setItem('nomnotho_admin', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1F3D2B, #2d5a3f)', padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '24px', padding: '48px', width: '100%', maxWidth: '440px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #1F3D2B, #2d5a3f)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '36px' }}></div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '8px' }}>Admin Login</h1>
          <p style={{ color: '#8B5E3C' }}>Nomnotho Beauty Studio</p>
        </div>
        {error && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '14px', borderRadius: '12px', marginBottom: '24px', textAlign: 'center', fontSize: '14px', fontWeight: '600' }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#1F3D2B', fontSize: '14px' }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@nomnotho.co.za" required style={{ width: '100%', padding: '14px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', color: '#1F3D2B', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#1F3D2B', fontSize: '14px' }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required style={{ width: '100%', padding: '14px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', color: '#1F3D2B', outline: 'none' }} />
          </div>
          <button type="submit" style={{ background: '#C6A75E', color: 'white', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Sign In</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#9ca3af' }}>admin@nomnotho.co.za / nomnotho2024</p>
      </div>
    </div>
  );
}
