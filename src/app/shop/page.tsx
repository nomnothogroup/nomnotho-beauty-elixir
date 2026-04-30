'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/lib/cart-context';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  active: boolean;
  image: string;
  rating: number;
  reviews: number;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [addedMsg, setAddedMsg] = useState('');
  const { dispatch, totalItems } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').eq('active', true).order('id', { ascending: false });
    if (data) setProducts(data as Product[]);
    setLoading(false);
  };

  const addToCart = (p: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: { id: p.id, name: p.name, price: p.price, image: p.image, quantity: 1 } });
    setAddedMsg(p.name + ' added!');
    setTimeout(() => setAddedMsg(''), 2000);
  };

  const renderStars = (r: number = 4.5) => { let s = ''; for (let i = 1; i <= 5; i++) s += i <= Math.floor(r) ? '\u2605' : '\u2606'; return s; };

  const categories = ['all', 'skincare', 'haircare', 'makeup', 'soaps', 'solutions', 'perfumes', 'manuals'];
  const filteredProducts = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);

  return React.createElement('div', { style: { minHeight: '100vh', background: '#F5F1E8' } },
    addedMsg && React.createElement('div', { style: { position: 'fixed', top: '80px', right: '20px', background: '#1F3D2B', color: '#C6A75E', padding: '12px 24px', borderRadius: '8px', zIndex: 100, fontWeight: 'bold' } }, addedMsg),
    React.createElement('section', { style: { background: 'linear-gradient(to bottom right, #1F3D2B, #2d5a3f)', padding: '48px 0' } },
      React.createElement('div', { className: 'max-w-7xl mx-auto px-4 text-center' },
        React.createElement('h1', { style: { fontSize: '32px', fontWeight: 'bold', color: '#F5F1E8' } }, 'Shop All Products'),
        React.createElement('p', { style: { color: '#C6A75E', fontSize: '16px' } }, 'Browse our full collection of African botanical beauty')
      )
    ),
    React.createElement('div', { className: 'max-w-7xl mx-auto px-4 py-8' },
      React.createElement('div', { style: { display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap', justifyContent: 'center' } },
        categories.map(cat =>
          React.createElement('button', { key: cat, onClick: () => setActiveCategory(cat), style: { padding: '8px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', border: '2px solid #1F3D2B', background: activeCategory === cat ? '#1F3D2B' : 'white', color: activeCategory === cat ? '#C6A75E' : '#1F3D2B', cursor: 'pointer', textTransform: 'capitalize' } }, cat === 'manuals' ? 'Manuals' : cat)
        ),
        React.createElement(Link, { href: '/cart', style: { padding: '8px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: '700', background: '#C6A75E', color: 'white', textDecoration: 'none' } }, 'Cart (' + totalItems + ')')
      ),
      loading
        ? React.createElement('p', { style: { textAlign: 'center', color: '#8B5E3C' } }, 'Loading products...')
        : filteredProducts.length === 0
          ? React.createElement('p', { style: { textAlign: 'center', color: '#8B5E3C', padding: '40px' } }, 'No products in this category yet. Add products via the admin panel (/admin).')
          : React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' } },
              filteredProducts.map((p: Product) =>
                React.createElement('div', { key: p.id, style: { background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(31,61,43,0.06)' } },
                  React.createElement('div', { style: { position: 'relative', height: '200px', overflow: 'hidden' } },
                    React.createElement('img', { src: p.image || 'https://images.unsplash.com/photo-1570194065650-d99fb4b38cc9?w=300&h=300&fit=crop', alt: p.name, style: { width: '100%', height: '100%', objectFit: 'cover' } })
                  ),
                  React.createElement('div', { style: { padding: '12px' } },
                    React.createElement('p', { style: { fontSize: '10px', color: '#8B5E3C', textTransform: 'uppercase', fontWeight: '600', marginBottom: '2px' } }, p.category),
                    React.createElement('h3', { style: { fontSize: '13px', fontWeight: '600', color: '#1F3D2B', marginBottom: '4px', lineHeight: '1.3' } }, p.name),
                    React.createElement('div', { style: { color: '#C6A75E', fontSize: '12px', marginBottom: '8px' } }, renderStars(p.rating)),
                    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                      React.createElement('span', { style: { fontSize: '16px', fontWeight: 'bold', color: '#1F3D2B' } }, 'R' + (p.price || 0).toFixed(2)),
                      React.createElement('div', { style: { display: 'flex', gap: '4px' } },
                        React.createElement('button', { onClick: () => addToCart(p), style: { background: '#1F3D2B', color: '#F5F1E8', border: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: '600', cursor: 'pointer' } }, 'Cart'),
                        React.createElement(Link, { href: '/cart', onClick: () => addToCart(p), style: { background: '#C6A75E', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: '600', cursor: 'pointer', textDecoration: 'none' } }, 'Buy')
                      )
                    )
                  )
                )
              )
            )
    )
  );
}
