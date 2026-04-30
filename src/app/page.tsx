'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useCart } from '@/lib/cart-context';
import { supabase } from '@/lib/supabase';

export default function HomePage() {
  const { dispatch } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [addedMsg, setAddedMsg] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % 6), 5000);
    supabase.from('products').select('*').eq('active', true).limit(8).order('id', { ascending: false }).then(({ data }) => {
      if (data && data.length > 0) setFeaturedProducts(data);
    });
    return () => clearInterval(timer);
  }, []);

  const slides = [
    { image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38cc9?w=1200&h=600&fit=crop', title: 'Nomnotho Elixir Skincare', subtitle: 'Natural + Premium + Healing', link: '/shop' },
    { image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=1200&h=600&fit=crop', title: 'Nomnotho Elixir Haircare', subtitle: 'Restore and Revitalize', link: '/shop' },
    { image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=600&fit=crop', title: 'Makeup Collection', subtitle: 'African Beauty Inspired', link: '/shop' },
    { image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1200&h=600&fit=crop', title: 'Organic Soaps', subtitle: 'Pure African Ingredients', link: '/shop' },
    { image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=1200&h=600&fit=crop', title: 'Skin Solutions', subtitle: 'Targeted Treatments', link: '/shop' },
    { image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&h=600&fit=crop', title: 'Perfumes', subtitle: 'NAS Scents Fragrances', link: '/shop' }
  ];

  const ingredients = [
    { name: 'Rooibos', location: 'Western Cape' }, { name: 'Marula', location: 'Limpopo' }, { name: 'Baobab', location: 'Central Africa' },
    { name: 'Buchu', location: 'Cape Region' }, { name: 'Aloe Ferox', location: 'Eastern Cape' }, { name: 'Kalahari Melon', location: 'Kalahari' },
    { name: 'African Black Soap', location: 'West Africa' }, { name: 'Mongongo', location: 'Southern Africa' }
  ];

  const addToCart = (p: any) => {
    dispatch({ type: 'ADD_ITEM', payload: { id: p.id, name: p.name, price: p.price, image: p.image, quantity: 1 } });
    setAddedMsg(p.name + ' added!');
    setTimeout(() => setAddedMsg(''), 2000);
  };

  const renderStars = (r: number = 4.5) => { let s = ''; for (let i = 1; i <= 5; i++) s += i <= Math.floor(r) ? '\u2605' : '\u2606'; return s; };

  return React.createElement('div', { style: { background: '#F5F1E8' } },
    addedMsg && React.createElement('div', { style: { position: 'fixed', top: '80px', right: '20px', background: '#1F3D2B', color: '#C6A75E', padding: '12px 24px', borderRadius: '8px', zIndex: 100, fontWeight: 'bold' } }, addedMsg),
    React.createElement('section', { style: { position: 'relative', height: '80vh', minHeight: '500px', overflow: 'hidden' } },
      slides.map((slide, index) =>
        React.createElement('div', { key: index, style: { position: 'absolute', inset: 0, opacity: index === currentSlide ? 1 : 0, transition: 'opacity 0.8s ease-in-out', backgroundImage: 'linear-gradient(rgba(31,61,43,0.7), rgba(31,61,43,0.4)), url(' + slide.image + ')', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement('div', { className: 'text-center px-4' },
            React.createElement('p', { style: { color: '#C6A75E', fontWeight: 600, letterSpacing: '3px', marginBottom: '16px', textTransform: 'uppercase' } }, slide.subtitle),
            React.createElement('h1', { style: { fontSize: '48px', fontWeight: 'bold', color: 'white', marginBottom: '24px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' } }, slide.title),
            React.createElement(Link, { href: slide.link, style: { background: '#C6A75E', color: 'white', padding: '16px 40px', borderRadius: '50px', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold', display: 'inline-block' } }, 'Shop Now')
          )
        )
      ),
      React.createElement('button', { onClick: () => setCurrentSlide((prev) => (prev - 1 + 6) % 6), style: { position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', fontSize: '24px' } }, '<'),
      React.createElement('button', { onClick: () => setCurrentSlide((prev) => (prev + 1) % 6), style: { position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', fontSize: '24px' } }, '>')
    ),
    React.createElement('section', { style: { padding: '80px 0', background: 'white' } },
      React.createElement('div', { className: 'max-w-7xl mx-auto px-4' },
        React.createElement('h2', { style: { fontSize: '32px', fontWeight: 'bold', color: '#1F3D2B', textAlign: 'center' } }, 'Featured Products'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '40px' } },
          featuredProducts.map((p: any) =>
            React.createElement('div', { key: p.id, style: { background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(31,61,43,0.08)' } },
              React.createElement('img', { src: p.image || 'https://images.unsplash.com/photo-1570194065650-d99fb4b38cc9?w=400&h=400&fit=crop', alt: p.name, style: { width: '100%', height: '220px', objectFit: 'cover' } }),
              React.createElement('div', { style: { padding: '16px' } },
                React.createElement('h3', { style: { fontSize: '14px', fontWeight: '600', color: '#1F3D2B', marginBottom: '6px' } }, p.name),
                React.createElement('div', { style: { color: '#C6A75E', fontSize: '13px', marginBottom: '8px' } }, renderStars(p.rating)),
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                  React.createElement('span', { style: { fontSize: '18px', fontWeight: 'bold', color: '#1F3D2B' } }, 'R' + (p.price || 0).toFixed(2)),
                  React.createElement('div', { style: { display: 'flex', gap: '6px' } },
                    React.createElement('button', { onClick: () => addToCart(p), style: { background: '#1F3D2B', color: '#F5F1E8', border: 'none', padding: '8px 12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '11px' } }, 'Add to Cart'),
                    React.createElement(Link, { href: '/cart', onClick: () => addToCart(p), style: { background: '#C6A75E', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '8px', fontWeight: '600', fontSize: '11px', textDecoration: 'none' } }, 'Buy Now')
                  )
                )
              )
            )
          )
        )
      )
    ),
    React.createElement('section', { style: { padding: '80px 0', background: '#F5F1E8' } },
      React.createElement('div', { className: 'max-w-6xl mx-auto px-4' },
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' } },
          React.createElement('div', null,
            React.createElement('p', { style: { color: '#C6A75E', fontWeight: '600', letterSpacing: '2px', marginBottom: '12px' } }, 'Our Story'),
            React.createElement('h2', { style: { fontSize: '36px', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '24px' } }, 'A Woman-Owned African Herbal Concept'),
            React.createElement('p', { style: { color: '#4a5568', lineHeight: '1.8' } }, 'Nomnotho Beauty Studio is a movement rooted in African botanical wisdom.'),
            React.createElement(Link, { href: '/about', style: { color: '#C6A75E', fontWeight: '600', fontSize: '16px', textDecoration: 'none', marginTop: '16px', display: 'inline-block' } }, 'Read Our Full Story \u2192')
          ),
          React.createElement('div', { style: { background: 'linear-gradient(135deg, #1F3D2B, #2d5a3f)', borderRadius: '24px', padding: '60px 40px', textAlign: 'center', color: 'white' } },
            React.createElement('span', { style: { fontSize: '80px', display: 'block' } }, '\uD83C\uDF3F'),
            React.createElement('p', { style: { fontSize: '20px', color: '#C6A75E', fontStyle: 'italic' } }, 'Natural + Premium + Healing')
          )
        )
      )
    ),
    React.createElement('section', { style: { padding: '80px 0', background: 'white' } },
      React.createElement('div', { className: 'max-w-6xl mx-auto px-4' },
        React.createElement('h2', { style: { fontSize: '32px', fontWeight: 'bold', color: '#1F3D2B', textAlign: 'center' } }, 'Our Heritage'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginTop: '40px' } },
          ingredients.map((item, i) =>
            React.createElement('div', { key: i, style: { background: '#F5F1E8', borderRadius: '16px', padding: '24px', textAlign: 'center' } },
              React.createElement('span', { style: { fontSize: '36px', display: 'block', marginBottom: '8px' } }, '\uD83C\uDF31'),
              React.createElement('h3', { style: { fontWeight: 'bold', color: '#1F3D2B' } }, item.name),
              React.createElement('p', { style: { color: '#8B5E3C', fontSize: '13px' } }, item.location)
            )
          )
        )
      )
    ),
    React.createElement('section', { style: { background: 'linear-gradient(to right, #1F3D2B, #2d5a3f)', padding: '80px 0', textAlign: 'center' } },
      React.createElement('h2', { style: { fontSize: '32px', fontWeight: 'bold', color: '#F5F1E8' } }, 'Ready to Transform Your Beauty Routine?'),
      React.createElement('Link', { href: '/shop', style: { background: '#C6A75E', color: 'white', padding: '16px 48px', borderRadius: '50px', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold', display: 'inline-block', marginTop: '24px' } }, 'Shop All Products')
    )
  );
}
