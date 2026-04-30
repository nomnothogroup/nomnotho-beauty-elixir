'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState([
    { id: 1, name: 'Marula Deep Hydration Oil', category: 'skincare', price: 380, stock: 50, active: true, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38cc9?w=100&h=100&fit=crop' },
    { id: 2, name: 'Shea Luxe Body Butter', category: 'skincare', price: 229, stock: 30, active: true, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=100&h=100&fit=crop' },
    { id: 3, name: 'Imbali Spot Dots', category: 'skincare', price: 150, stock: 40, active: true, image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=100&h=100&fit=crop' },
    { id: 4, name: 'Rooibos Repair Night Creme', category: 'skincare', price: 295, stock: 20, active: false, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=100&h=100&fit=crop' },
    { id: 5, name: 'Hair Growth Elixir', category: 'haircare', price: 449, stock: 15, active: true, image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=100&h=100&fit=crop' },
  ]);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({ name: '', category: 'skincare', price: '', oldPrice: '', stock: '', image: '' });

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('nomnotho_admin')) {
      router.push('/admin');
    }
  }, []);

  const handleLogout = () => { localStorage.removeItem('nomnotho_admin'); router.push('/admin'); };
  const toggleActive = (id: number) => setProducts(products.map(p => p.id === id ? { ...p, active: !p.active } : p));
  const deleteProduct = (id: number) => { if (confirm('Delete this product?')) setProducts(products.filter(p => p.id !== id)); };

  const openEdit = (product: any) => {
    setEditingProduct(product);
    setForm({ name: product.name, category: product.category, price: product.price.toString(), oldPrice: product.oldPrice?.toString() || '', stock: product.stock.toString(), image: product.image || '' });
    setShowAddForm(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const defaultImage = 'https://images.unsplash.com/photo-1570194065650-d99fb4b38cc9?w=100&h=100&fit=crop';
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, name: form.name, category: form.category, price: parseFloat(form.price), stock: parseInt(form.stock), image: form.image || p.image } : p));
      setEditingProduct(null);
    } else {
      const newProduct = { id: Date.now(), name: form.name, category: form.category, price: parseFloat(form.price), stock: parseInt(form.stock), active: true, image: form.image || defaultImage };
      setProducts([newProduct, ...products]);
      setShowAddForm(false);
    }
    setForm({ name: '', category: 'skincare', price: '', oldPrice: '', stock: '', image: '' });
  };

  const inputStyle = { width: '100%', padding: '12px', border: '2px solid #d1d5db', borderRadius: '8px', fontSize: '15px', color: '#111827', background: '#ffffff', outline: 'none' };
  const labelStyle = { display: 'block', marginBottom: '6px', fontWeight: '600', color: '#111827', fontSize: '14px' };

  return (
    <div style={{ minHeight: '100vh', background: '#F5F1E8' }}>
      <header style={{ background: '#1F3D2B', padding: '0 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '28px' }}></span>
            <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#F5F1E8' }}>Admin Dashboard</h1>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Link href="/" style={{ color: '#C6A75E', textDecoration: 'none', fontSize: '14px' }}>View Site</Link>
            <button onClick={handleLogout} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>Logout</button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px' }}><p style={{ color: '#8B5E3C', fontSize: '13px', marginBottom: '4px', fontWeight: '600' }}>Total Products</p><p style={{ fontSize: '36px', fontWeight: 'bold', color: '#1F3D2B' }}>{products.length}</p></div>
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px' }}><p style={{ color: '#8B5E3C', fontSize: '13px', marginBottom: '4px', fontWeight: '600' }}>Active</p><p style={{ fontSize: '36px', fontWeight: 'bold', color: '#16a34a' }}>{products.filter(p => p.active).length}</p></div>
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px' }}><p style={{ color: '#8B5E3C', fontSize: '13px', marginBottom: '4px', fontWeight: '600' }}>Categories</p><p style={{ fontSize: '36px', fontWeight: 'bold', color: '#1F3D2B' }}>7</p></div>
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px' }}><p style={{ color: '#8B5E3C', fontSize: '13px', marginBottom: '4px', fontWeight: '600' }}>Total Stock</p><p style={{ fontSize: '36px', fontWeight: 'bold', color: '#1F3D2B' }}>{products.reduce((s: number, p: any) => s + p.stock, 0)}</p></div>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', marginBottom: '32px' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1F3D2B' }}>All Products</h2>
            <button onClick={() => { setShowAddForm(true); setEditingProduct(null); setForm({ name: '', category: 'skincare', price: '', oldPrice: '', stock: '', image: '' }); }} style={{ background: '#C6A75E', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>+ Add Product</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F5F1E8' }}>
                <th style={{ textAlign: 'left', padding: '14px 24px', fontSize: '12px', fontWeight: '600', color: '#8B5E3C' }}>Product</th>
                <th style={{ textAlign: 'left', padding: '14px 24px', fontSize: '12px', fontWeight: '600', color: '#8B5E3C' }}>Category</th>
                <th style={{ textAlign: 'left', padding: '14px 24px', fontSize: '12px', fontWeight: '600', color: '#8B5E3C' }}>Price</th>
                <th style={{ textAlign: 'left', padding: '14px 24px', fontSize: '12px', fontWeight: '600', color: '#8B5E3C' }}>Stock</th>
                <th style={{ textAlign: 'left', padding: '14px 24px', fontSize: '12px', fontWeight: '600', color: '#8B5E3C' }}>Status</th>
                <th style={{ textAlign: 'right', padding: '14px 24px', fontSize: '12px', fontWeight: '600', color: '#8B5E3C' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '600', color: '#1F3D2B', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                    {product.name}
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '13px', color: '#8B5E3C', textTransform: 'capitalize' }}>{product.category}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 'bold', color: '#C6A75E' }}>R{product.price}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#1F3D2B' }}>{product.stock}</td>
                  <td style={{ padding: '16px 24px' }}><button onClick={() => toggleActive(product.id)} style={{ padding: '6px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '12px', background: product.active ? '#dcfce7' : '#fee2e2', color: product.active ? '#166534' : '#991b1b' }}>{product.active ? 'Active' : 'Inactive'}</button></td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}><button onClick={() => openEdit(product)} style={{ color: '#C6A75E', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', marginRight: '12px', fontSize: '13px' }}>Edit</button><button onClick={() => deleteProduct(product.id)} style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {(showAddForm || editingProduct) && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '24px' }}>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSave} style={{ display: 'grid', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Product Name *</label>
                <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Product name" required style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Category *</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} style={inputStyle}>
                    <option value="skincare">Skincare</option>
                    <option value="haircare">Haircare</option>
                    <option value="makeup">Makeup</option>
                    <option value="soaps">Organic Soaps</option>
                    <option value="solutions">Skin Solutions</option>
                    <option value="perfumes">Perfumes</option>
                    <option value="manuals">Digital Manuals</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Stock *</label>
                  <input type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} placeholder="50" required style={inputStyle} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Price (R) *</label>
                  <input type="number" step="0.01" value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="380" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Compare at Price (R)</label>
                  <input type="number" step="0.01" value={form.oldPrice} onChange={e => setForm({...form, oldPrice: e.target.value})} placeholder="450" style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Image URL</label>
                <input type="text" value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="https://images.unsplash.com/photo-..." style={inputStyle} />
                <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Paste an image URL or use a photo from unsplash.com</p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={() => { setShowAddForm(false); setEditingProduct(null); }} style={{ flex: 1, padding: '14px', border: '2px solid #1F3D2B', background: 'white', color: '#1F3D2B', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ flex: 2, padding: '14px', border: 'none', background: '#C6A75E', color: 'white', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>{editingProduct ? 'Update Product' : 'Add Product'}</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
