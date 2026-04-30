'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({ name: '', category: 'skincare', price: '', oldPrice: '', stock: '', image: '', images: [] as string[] });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const uploadImage = async (file: File): Promise<string> => {
    const fileName = Date.now() + '-' + file.name;
    const { data, error } = await supabase.storage.from('products').upload(fileName, file);
    if (error) throw error;
    const { data: urlData } = supabase.storage.from('products').getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadImage(files[i]);
        urls.push(url);
      }
      setForm(prev => ({ ...prev, image: urls[0], images: urls }));
    } catch (err) {
      alert('Upload failed. Try again.');
    }
    setUploading(false);
  };

  const openEdit = (product: any) => {
    setEditingProduct(product);
    setForm({ name: product.name, category: product.category, price: product.price?.toString() || '', oldPrice: '', stock: product.stock?.toString() || '0', image: product.image || '', images: product.images || [] });
    setShowAddForm(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name: form.name,
      category: form.category,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      image: form.image || 'https://images.unsplash.com/photo-1570194065650-d99fb4b38cc9?w=400&h=400&fit=crop',
      images: form.images
    };

    if (editingProduct) {
      await supabase.from('products').update(productData).eq('id', editingProduct.id);
    } else {
      await supabase.from('products').insert([{ ...productData, id: Date.now() }]);
    }
    setEditingProduct(null);
    setShowAddForm(false);
    setForm({ name: '', category: 'skincare', price: '', oldPrice: '', stock: '', image: '', images: [] });
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
        React.createElement('div', { style: { display: 'flex', gap: '16px' } },
          React.createElement(Link, { href: '/', style: { color: '#C6A75E', textDecoration: 'none', fontSize: '14px' } }, 'View Site'),
          React.createElement('button', { onClick: handleLogout, style: { background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' } }, 'Logout')
        )
      )
    ),
    React.createElement('div', { style: { maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' } },
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' } },
        React.createElement('div', { style: { background: 'white', padding: '24px', borderRadius: '16px' } }, React.createElement('p', { style: { color: '#8B5E3C', fontSize: '13px', fontWeight: '600' } }, 'Total'), React.createElement('p', { style: { fontSize: '36px', fontWeight: 'bold', color: '#1F3D2B' } }, products.length)),
        React.createElement('div', { style: { background: 'white', padding: '24px', borderRadius: '16px' } }, React.createElement('p', { style: { color: '#8B5E3C', fontSize: '13px', fontWeight: '600' } }, 'Active'), React.createElement('p', { style: { fontSize: '36px', fontWeight: 'bold', color: '#16a34a' } }, products.filter(p => p.active).length)),
        React.createElement('div', { style: { background: 'white', padding: '24px', borderRadius: '16px' } }, React.createElement('p', { style: { color: '#8B5E3C', fontSize: '13px', fontWeight: '600' } }, 'Stock'), React.createElement('p', { style: { fontSize: '36px', fontWeight: 'bold', color: '#1F3D2B' } }, products.reduce((s, p) => s + (p.stock || 0), 0))),
        React.createElement('div', { style: { background: 'white', padding: '24px', borderRadius: '16px' } }, React.createElement('p', { style: { color: '#8B5E3C', fontSize: '13px', fontWeight: '600' } }, 'Categories'), React.createElement('p', { style: { fontSize: '36px', fontWeight: 'bold', color: '#1F3D2B' } }, [...new Set(products.map(p => p.category))].length))
      ),
      React.createElement('div', { style: { background: 'white', borderRadius: '16px', overflow: 'hidden', marginBottom: '32px' } },
        React.createElement('div', { style: { padding: '24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between' } },
          React.createElement('h2', { style: { fontSize: '18px', fontWeight: 'bold', color: '#1F3D2B' } }, 'All Products'),
          React.createElement('button', { onClick: () => { setShowAddForm(true); setEditingProduct(null); setForm({ name: '', category: 'skincare', price: '', oldPrice: '', stock: '', image: '', images: [] }); }, style: { background: '#C6A75E', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' } }, '+ Add Product')
        ),
        React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse' } },
          React.createElement('thead', null, React.createElement('tr', { style: { background: '#F5F1E8' } }, ['Product', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map(h => React.createElement('th', { key: h, style: { textAlign: h === 'Actions' ? 'right' : 'left', padding: '14px 24px', fontSize: '12px', fontWeight: '600', color: '#8B5E3C' } }, h)))),
          React.createElement('tbody', null, products.map(p =>
            React.createElement('tr', { key: p.id, style: { borderBottom: '1px solid #f0f0f0' } },
              React.createElement('td', { style: { padding: '16px 24px', fontSize: '14px', fontWeight: '600', color: '#1F3D2B', display: 'flex', alignItems: 'center', gap: '12px' } },
                React.createElement('img', { src: p.image || 'https://images.unsplash.com/photo-1570194065650-d99fb4b38cc9?w=40&h=40&fit=crop', style: { width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' } }), p.name),
              React.createElement('td', { style: { padding: '16px 24px', fontSize: '13px', color: '#8B5E3C', textTransform: 'capitalize' } }, p.category),
              React.createElement('td', { style: { padding: '16px 24px', fontWeight: 'bold', color: '#C6A75E' } }, 'R' + (p.price || 0)),
              React.createElement('td', { style: { padding: '16px 24px', color: '#1F3D2B' } }, p.stock || 0),
              React.createElement('td', { style: { padding: '16px 24px' } }, React.createElement('button', { onClick: () => toggleActive(p.id, p.active), style: { padding: '6px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '12px', background: p.active ? '#dcfce7' : '#fee2e2', color: p.active ? '#166534' : '#991b1b' } }, p.active ? 'Active' : 'Inactive')),
              React.createElement('td', { style: { padding: '16px 24px', textAlign: 'right' } },
                React.createElement('button', { onClick: () => openEdit(p), style: { color: '#C6A75E', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', marginRight: '12px' } }, 'Edit'),
                React.createElement('button', { onClick: () => deleteProduct(p.id), style: { color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' } }, 'Delete')
              )
            )
          ))
        )
      ),
      (showAddForm || editingProduct) && React.createElement('div', { style: { background: 'white', borderRadius: '16px', padding: '32px' } },
        React.createElement('h2', { style: { fontSize: '20px', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '24px' } }, editingProduct ? 'Edit Product' : 'Add New Product'),
        React.createElement('form', { onSubmit: handleSave, style: { display: 'grid', gap: '20px' } },
          React.createElement('div', null, React.createElement('label', { style: labelStyle }, 'Product Name *'), React.createElement('input', { type: 'text', value: form.name, onChange: (e: any) => setForm({...form, name: e.target.value}), required: true, style: inputStyle })),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' } },
            React.createElement('div', null, React.createElement('label', { style: labelStyle }, 'Category'), React.createElement('select', { value: form.category, onChange: (e: any) => setForm({...form, category: e.target.value}), style: inputStyle }, ['skincare','haircare','makeup','soaps','solutions','perfumes','manuals'].map(c => React.createElement('option', { key: c, value: c }, c)))),
            React.createElement('div', null, React.createElement('label', { style: labelStyle }, 'Stock'), React.createElement('input', { type: 'number', value: form.stock, onChange: (e: any) => setForm({...form, stock: e.target.value}), style: inputStyle }))
          ),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' } },
            React.createElement('div', null, React.createElement('label', { style: labelStyle }, 'Price (R)'), React.createElement('input', { type: 'number', step: '0.01', value: form.price, onChange: (e: any) => setForm({...form, price: e.target.value}), style: inputStyle })),
            React.createElement('div', null, React.createElement('label', { style: labelStyle }, 'Compare at Price'), React.createElement('input', { type: 'number', step: '0.01', value: form.oldPrice, onChange: (e: any) => setForm({...form, oldPrice: e.target.value}), style: inputStyle }))
          ),
          React.createElement('div', null,
            React.createElement('label', { style: labelStyle }, 'Upload Images (Multiple)'),
            React.createElement('input', { type: 'file', ref: fileInputRef, onChange: handleFileUpload, multiple: true, accept: 'image/*', style: { ...inputStyle, padding: '10px' } }),
            uploading && React.createElement('p', { style: { color: '#C6A75E', fontSize: '13px', marginTop: '4px' } }, 'Uploading...'),
            form.image && React.createElement('div', { style: { marginTop: '8px' } },
              React.createElement('img', { src: form.image, style: { width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' } }),
              form.images.length > 1 && React.createElement('p', { style: { fontSize: '12px', color: '#8B5E3C', marginTop: '4px' } }, form.images.length + ' images uploaded')
            ),
            React.createElement('p', { style: { fontSize: '12px', color: '#6b7280', marginTop: '4px' } }, 'Or paste an image URL below')
          ),
          React.createElement('div', null,
            React.createElement('label', { style: labelStyle }, 'Image URL (optional if uploaded)'), React.createElement('input', { type: 'text', value: form.image, onChange: (e: any) => setForm({...form, image: e.target.value}), style: inputStyle, placeholder: 'https://...' })
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
