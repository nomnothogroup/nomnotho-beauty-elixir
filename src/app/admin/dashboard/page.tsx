'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([
    { id: 1, name: 'Marula Deep Hydration Facial Oil', category: 'skincare', price: 380, stock: 50, active: true },
    { id: 2, name: 'Shea Luxe Body Butter', category: 'skincare', price: 229, stock: 30, active: true },
    { id: 3, name: 'Rooibos Repair Night Crème', category: 'skincare', price: 295, stock: 20, active: false },
  ]);
  const [categories, setCategories] = useState<string[]>(['skincare', 'haircare', 'makeup', 'soaps', 'solutions', 'perfumes', 'manuals']);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!localStorage.getItem('nomnotho_admin')) {
        router.push('/admin');
      }
      const savedCategories = localStorage.getItem('nomnotho_categories');
      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nomnotho_categories', JSON.stringify(categories));
    }
  }, [categories]);

  const handleLogout = () => {
    localStorage.removeItem('nomnotho_admin');
    router.push('/admin');
  };

  const deleteProduct = (id: number) => {
    if (confirm('Delete this product?')) setProducts(products.filter(p => p.id !== id));
  };

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.toLowerCase().trim())) {
      setCategories([...categories, newCategory.toLowerCase().trim()]);
      setNewCategory('');
    }
  };

  const deleteCategory = (category: string) => {
    if (confirm(`Delete category "${category}"?`)) {
      setCategories(categories.filter(c => c !== category));
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F5F1E8' }}>
      <header style={{ background: '#1F3D2B', padding: '0 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#F5F1E8' }}>Admin Dashboard</h1>
          <button onClick={handleLogout} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>Logout</button>
        </div>
      </header>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', borderBottom: '2px solid #e5e7eb' }}>
          {['products', 'categories', 'orders'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 24px',
                background: 'none',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                color: activeTab === tab ? '#1F3D2B' : '#8B5E3C',
                borderBottom: activeTab === tab ? '2px solid #C6A75E' : '2px solid transparent',
                marginBottom: '-2px',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'products' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F3D2B' }}>Products ({products.length})</h2>
              <button onClick={() => alert('Add product form coming soon')} style={{ background: '#C6A75E', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>+ Add Product</button>
            </div>
            <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F5F1E8' }}>
                    <th style={{ textAlign: 'left', padding: '14px 24px', fontSize: '12px', color: '#8B5E3C' }}>Product</th>
                    <th style={{ textAlign: 'left', padding: '14px 24px', fontSize: '12px', color: '#8B5E3C' }}>Category</th>
                    <th style={{ textAlign: 'left', padding: '14px 24px', fontSize: '12px', color: '#8B5E3C' }}>Price</th>
                    <th style={{ textAlign: 'left', padding: '14px 24px', fontSize: '12px', color: '#8B5E3C' }}>Stock</th>
                    <th style={{ textAlign: 'left', padding: '14px 24px', fontSize: '12px', color: '#8B5E3C' }}>Status</th>
                    <th style={{ textAlign: 'right', padding: '14px 24px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '16px 24px', fontWeight: '600', color: '#1F3D2B' }}>{p.name}</td>
                      <td style={{ padding: '16px 24px', color: '#8B5E3C', textTransform: 'capitalize' }}>{p.category}</td>
                      <td style={{ padding: '16px 24px', fontWeight: 'bold', color: '#C6A75E' }}>R{p.price}</td>
                      <td style={{ padding: '16px 24px' }}>{p.stock}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', background: p.active ? '#dcfce7' : '#fee2e2', color: p.active ? '#166534' : '#991b1b' }}>{p.active ? 'Active' : 'Inactive'}</span>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                        <button onClick={() => deleteProduct(p.id)} style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'categories' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F3D2B' }}>Categories ({categories.length})</h2>
            </div>
            
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(31,61,43,0.08)' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter new category name"
                  onKeyPress={(e) => e.key === 'Enter' && addCategory()}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={addCategory}
                  style={{
                    background: '#C6A75E',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Add Category
                </button>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(31,61,43,0.08)' }}>
              {categories.map((category, index) => (
                <div
                  key={category}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 24px',
                    borderBottom: index < categories.length - 1 ? '1px solid #f0f0f0' : 'none'
                  }}
                >
                  <span style={{ fontWeight: '600', color: '#1F3D2B', textTransform: 'capitalize' }}>{category}</span>
                  <button
                    onClick={() => deleteCategory(category)}
                    style={{
                      color: '#dc2626',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '14px',
                      padding: '6px 12px',
                      borderRadius: '6px'
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'orders' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '48px', textAlign: 'center', boxShadow: '0 2px 8px rgba(31,61,43,0.08)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '12px' }}>Orders</h2>
            <p style={{ color: '#8B5E3C' }}>Order management coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}
