'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({ name: '', category: 'skincare', price: '', oldPrice: '', stock: '', image: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('nomnotho_admin')) {
      router.push('/admin');
      return;
    }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('id', { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  };

  const handleLogout = () => { localStorage.removeItem('nomnotho_admin'); router.push('/admin'); };
  const toggleActive = async (id: number, current: boolean) => {
    await supabase.from('products').update({ active: !current }).eq('id', id);
    fetchProducts();
  };
  const deleteProduct = async (id: number) => {
    if (confirm('Delete this product?')) {
      await supabase.from('products').delete().eq('id', id);
      fetchProducts();
    }
  };

  const openEdit = (product: any) => {
    setEditingProduct(product);
    setForm({ name: product.name, category: product.category, price: product.price.toString(), oldPrice: '', stock: product.stock?.toString() || '0', image: product.image || '' });
    setShowAddForm(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name: form.name,
      category: form.category,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      image: form.image || 'https://images.unsplash.com/photo-1570194065650-d99fb4b38cc9?w=400&h=400&fit=crop'
    };

    if (editingProduct) {
      await supabase.from('products').update(productData).eq('id', editingProduct.id);
    } else {
      await supabase.from('products').insert([{ ...productData, id: Date.now() }]);
    }
    setEditingProduct(null);
    setShowAddForm(false);
    setForm({ name: '', category: 'skincare', price: '', oldPrice: '', stock: '', image: '' });
    fetchProducts();
  };

  const inputStyle = { width: '100%', padding: '12px', border: '2px solid #d1d5db', borderRadius: '8px', fontSize: '15px', color: '#111827', background: '#ffffff' };
  const labelStyle = { display: 'block', marginBottom: '6px', fontWeight: '600', color: '#111827', fontSize: '14px' };

  if (loading) return React.createElement('div', { className: 'min-h-screen bg-[#F5F1E8] flex items-center justify-center' }, React.createElement('p', null, 'Loading...'));

  return React.createElement('div', { style: { minHeight: '100vh', background: '#F5F1E8' } },
    React.createElement('header', { style: { background: '#1F3D2B', padding: '0 24px' } },
      React.createElement('div', { style: { maxWidth: '1200px', margin: '0 auto', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
          React.createElement('span', { style: { fontSize: '28px' } }, '\u2728'),
          React.createElement('h1', { style: { fontSize: '18px', fontWeight: 'bold', color: '#F5F1E8' } }, 'Admin Dashboard')
        ),
        React.createElement('div', { style: { display: 'flex', gap: '16px', alignItems: 'center' } },
          React.createElement(Link, { href: '/', style: { color: '#C6A75E', textDecoration: 'none', fontSize: '14px' } }, 'View Site'),
          React.createElement('button', { onClick: handleLogout, style: { background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' } }, 'Logout')
        )
      )
    ),
    React.createElement('div', { style: { maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' } },
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' } },
        React.createElement('div', { style: { background: 'white', padding: '24px', borderRadius: '16px' } }, React.createElement('p', { style: { color: '#8B5E3C', fontSize: '13px', fontWeight: '600' } }, 'Total Products'), React.createElement('p', { style: { fontSize: '36px', fontWeight: 'bold', color: '#1F3D2B' } }, products.length)),
        React.createElement('div', { style: { background: 'white', padding: '24px', borderRadius: '16px' } }, React.createElement('p', { style: { color: '#8B5E3C', fontSize: '13px', fontWeight: '600' } }, 'Active'), React.createElement('p', { style: { fontSize: '36px', fontWeight: 'bold', color: '#16a34a' } }, products.filter(p => p.active).length)),
        React.createElement('div', { style: { background: 'white', padding: '24px', borderRadius: '16px' } }, React.createElement('p', { style: { color: '#8B5E3C', fontSize: '13px', fontWeight: '600' } }, 'Categories'), React.createElement('p', { style: { fontSize: '36px', fontWeight: 'bold', color: '#1F3D2B' } }, [...new Set(products.map(p => p.category))].length)),
        React.createElement('div', { style: { background: 'white', padding: '24px', borderRadius: '16px' } }, React.createElement('p', { style: { color: '#8B5E3C', fontSize: '13px', fontWeight: '600' } }, 'Total Stock'), React.createElement('p', { style: { fontSize: '36px', fontWeight: 'bold', color: '#1F3D2B' } }, products.reduce((s, p) => s + (p.stock || 0), 0)))
      ),
      React.createElement('div', { style: { background: 'white', borderRadius: '16px', overflow: 'hidden', marginBottom: '32px' } },
        React.createElement('div', { style: { padding: '24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('h2', { style: { fontSize: '18px', fontWeight: 'bold', color: '#1F3D2B' } }, 'All Products'),
          React.createElement('button', { onClick: () => { setShowAddForm(true); setEditingProduct(null); setForm({ name: '', category: 'skincare', price: '', oldPrice: '', stock: '', image: '' }); }, style: { background: '#C6A75E', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' } }, '+ Add Product')
        ),
        React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse' } },
          React.createElement('thead', null,
            React.createElement('tr', { style: { background: '#F5F1E8' } },
              ['Product', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map(h =>
                React.createElement('th', { key: h, style: { textAlign: h === 'Actions' ? 'right' : 'left', padding: '14px 24px', fontSize: '12px', fontWeight: '600', color: '#8B5E3C' } }, h)
              )
            )
          ),
          React.createElement('tbody', null,
            products.map(product =>
              React.createElement('tr', { key: product.id, style: { borderBottom: '1px solid #f0f0f0' } },
                React.createElement('td', { style: { padding: '16px 24px', fontSize: '14px', fontWeight: '600', color: '#1F3D2B', display: 'flex', alignItems: 'center', gap: '12px' } },
                  React.createElement('img', { src: product.image || 'https://images.unsplash.com/photo-1570194065650-d99fb4b38cc9?w=40&h=40&fit=crop', alt: product.name, style: { width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' } }),
                  product.name
                ),
                React.createElement('td', { style: { padding: '16px 24px', fontSize: '13px', color: '#8B5E3C', textTransform: 'capitalize' } }, product.category),
                React.createElement('td', { style: { padding: '16px 24px', fontSize: '14px', fontWeight: 'bold', color: '#C6A75E' } }, 'R' + (product.price || 0)),
                React.createElement('td', { style: { padding: '16px 24px', fontSize: '14px', color: '#1F3D2B' } }, product.stock || 0),
                React.createElement('td', { style: { padding: '16px 24px' } },
                  React.createElement('button', { onClick: () => toggleActive(product.id, product.active), style: { padding: '6px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '12px', background: product.active ? '#dcfce7' : '#fee2e2', color: product.active ? '#166534' : '#991b1b' } }, product.active ? 'Active' : 'Inactive')
                ),
                React.createElement('td', { style: { padding: '16px 24px', textAlign: 'right' } },
                  React.createElement('button', { onClick: () => openEdit(product), style: { color: '#C6A75E', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', marginRight: '12px', fontSize: '13px' } }, 'Edit'),
                  React.createElement('button', { onClick: () => deleteProduct(product.id), style: { color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '13px' } }, 'Delete')
                )
              )
            )
          )
        )
      ),
      (showAddForm || editingProduct) && React.createElement('div', { style: { background: 'white', borderRadius: '16px', padding: '32px', marginBottom: '32px' } },
        React.createElement('h2', { style: { fontSize: '20px', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '24px' } }, editingProduct ? 'Edit Product' : 'Add New Product'),
        React.createElement('form', { onSubmit: handleSave, style: { display: 'grid', gap: '20px' } },
          React.createElement('div', null, React.createElement('label', { style: labelStyle }, 'Product Name *'), React.createElement('input', { type: 'text', value: form.name, onChange: (e: any) => setForm({...form, name: e.target.value}), placeholder: 'Product name', required: true, style: inputStyle })),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' } },
            React.createElement('div', null, React.createElement('label', { style: labelStyle }, 'Category'), React.createElement('select', { value: form.category, onChange: (e: any) => setForm({...form, category: e.target.value}), style: inputStyle }, ['skincare','haircare','makeup','soaps','solutions','perfumes','manuals'].map(c => React.createElement('option', { key: c, value: c }, c)))),
            React.createElement('div', null, React.createElement('label', { style: labelStyle }, 'Stock'), React.createElement('input', { type: 'number', value: form.stock, onChange: (e: any) => setForm({...form, stock: e.target.value}), style: inputStyle }))
          ),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' } },
            React.createElement('div', null, React.createElement('label', { style: labelStyle }, 'Price (R)'), React.createElement('input', { type: 'number', step: '0.01', value: form.price, onChange: (e: any) => setForm({...form, price: e.target.value}), style: inputStyle })),
            React.createElement('div', null, React.createElement('label', { style: labelStyle }, 'Image URL'), React.createElement('input', { type: 'text', value: form.image, onChange: (e: any) => setForm({...form, image: e.target.value}), style: inputStyle }))
          ),
          React.createElement('div', { style: { display: 'flex', gap: '12px' } },
            React.createElement('button', { type: 'button', onClick: () => { setShowAddForm(false); setEditingProduct(null); }, style: { flex: 1, padding: '14px', border: '2px solid #1F3D2B', background: 'white', color: '#1F3D2B', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' } }, 'Cancel'),
            React.createElement('button', { type: 'submit', style: { flex: 2, padding: '14px', border: 'none', background: '#C6A75E', color: 'white', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' } }, editingProduct ? 'Update Product' : 'Add Product')
          )
        )
      )
    )
  );
}
