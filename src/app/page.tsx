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

  const reviews = [
    { name: 'Thandi M.', location: 'Johannesburg', text: 'The Eczema Relief Cream changed my skin completely! After 2 weeks my dry patches were gone. Highly recommend Nomnotho Elixir!', rating: 5, product: 'Eczema Relief Cream' },
    { name: 'Lerato K.', location: 'Cape Town', text: 'I have been using the Hair Growth Elixir for 3 months and my edges are finally growing back. This product is magic!', rating: 5, product: 'Hair Growth Elixir' },
    { name: 'Nomsa D.', location: 'Durban', text: 'The Acne Clear Gel worked better than anything I have ever tried. My skin is clear for the first time in years.', rating: 5, product: 'Acne Clear Gel' },
    { name: 'Sipho N.', location: 'Pretoria', text: 'As a reseller, Nomnotho products practically sell themselves. The quality is unmatched!', rating: 5, product: 'Reseller' }
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

  const renderStars = (r: number = 5) => { let s = ''; for (let i = 1; i <= 5; i++) s += i <= Math.floor(r) ? '\u2605' : '\u2606'; return s; };

  return React.createElement('div', { style: { background: '#F5F1E8', overflowX: 'hidden' } },
    addedMsg && React.createElement('div', { style: { position: 'fixed', top: '80px', right: '20px', background: '#1F3D2B', color: '#C6A75E', padding: '12px 24px', borderRadius: '8px', zIndex: 100, fontWeight: 'bold', fontSize: '14px' } }, addedMsg),

    // Hero Slider
    React.createElement('section', { style: { position: 'relative', height: 'clamp(400px, 60vh, 600px)', overflow: 'hidden' } },
      slides.map((slide, index) =>
        React.createElement('div', { key: index, style: { position: 'absolute', inset: 0, opacity: index === currentSlide ? 1 : 0, transition: 'opacity 0.8s ease-in-out', backgroundImage: 'linear-gradient(rgba(31,61,43,0.7), rgba(31,61,43,0.4)), url(' + slide.image + ')', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement('div', { className: 'text-center px-4', style: { maxWidth: '800px' } },
            React.createElement('p', { style: { color: '#C6A75E', fontWeight: 600, letterSpacing: '2px', marginBottom: '12px', textTransform: 'uppercase', fontSize: 'clamp(12px, 2vw, 16px)' } }, slide.subtitle),
            React.createElement('h1', { style: { fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 'bold', color: 'white', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', lineHeight: 1.2 } }, slide.title),
            React.createElement(Link, { href: slide.link, style: { background: '#C6A75E', color: 'white', padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 40px)', borderRadius: '50px', textDecoration: 'none', fontSize: 'clamp(14px, 2vw, 18px)', fontWeight: 'bold', display: 'inline-block' } }, 'Shop Now')
          )
        )
      ),
      React.createElement('button', { onClick: () => setCurrentSlide((prev) => (prev - 1 + 6) % 6), style: { position: 'absolute', left: 'clamp(8px, 2vw, 20px)', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: 'clamp(36px, 5vw, 50px)', height: 'clamp(36px, 5vw, 50px)', borderRadius: '50%', cursor: 'pointer', fontSize: 'clamp(18px, 3vw, 24px)' } }, '\u2039'),
      React.createElement('button', { onClick: () => setCurrentSlide((prev) => (prev + 1) % 6), style: { position: 'absolute', right: 'clamp(8px, 2vw, 20px)', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: 'clamp(36px, 5vw, 50px)', height: 'clamp(36px, 5vw, 50px)', borderRadius: '50%', cursor: 'pointer', fontSize: 'clamp(18px, 3vw, 24px)' } }, '\u203a')
    ),

    // Featured Products
    React.createElement('section', { style: { padding: 'clamp(40px, 6vw, 80px) 0', background: 'white' } },
      React.createElement('div', { className: 'max-w-7xl mx-auto px-4' },
        React.createElement('h2', { style: { fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 'bold', color: '#1F3D2B', textAlign: 'center', marginBottom: '8px' } }, 'Featured Products'),
        React.createElement('p', { style: { textAlign: 'center', color: '#8B5E3C', marginBottom: 'clamp(24px, 4vw, 40px)', fontSize: 'clamp(13px, 2vw, 16px)' } }, 'Our most loved Nomnotho Elixir products'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(140px, 20vw, 240px), 1fr))', gap: 'clamp(12px, 2vw, 20px)' } },
          featuredProducts.map((p: any) =>
            React.createElement('div', { key: p.id, style: { background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(31,61,43,0.08)', transition: 'transform 0.2s' } },
              React.createElement('div', { style: { width: '100%', paddingBottom: '100%', position: 'relative' } },
                React.createElement('img', { src: p.image || 'https://images.unsplash.com/photo-1570194065650-d99fb4b38cc9?w=400&h=400&fit=crop', alt: p.name, style: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' } })
              ),
              React.createElement('div', { style: { padding: 'clamp(8px, 2vw, 16px)' } },
                React.createElement('h3', { style: { fontSize: 'clamp(11px, 1.5vw, 14px)', fontWeight: '600', color: '#1F3D2B', marginBottom: '4px' } }, p.name),
                React.createElement('div', { style: { color: '#C6A75E', fontSize: 'clamp(10px, 1.5vw, 13px)', marginBottom: '4px' } }, renderStars(p.rating)),
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '4px' } },
                  React.createElement('span', { style: { fontSize: 'clamp(14px, 2vw, 18px)', fontWeight: 'bold', color: '#1F3D2B' } }, 'R' + (p.price || 0).toFixed(2)),
                  React.createElement('div', { style: { display: 'flex', gap: '4px' } },
                    React.createElement('button', { onClick: () => addToCart(p), style: { background: '#1F3D2B', color: '#F5F1E8', border: 'none', padding: 'clamp(4px, 1vw, 8px) clamp(6px, 1.5vw, 12px)', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: 'clamp(9px, 1.2vw, 11px)' } }, 'Add'),
                    React.createElement(Link, { href: '/cart', onClick: () => addToCart(p), style: { background: '#C6A75E', color: 'white', border: 'none', padding: 'clamp(4px, 1vw, 8px) clamp(6px, 1.5vw, 12px)', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: 'clamp(9px, 1.2vw, 11px)', textDecoration: 'none' } }, 'Buy')
                  )
                )
              )
            )
          )
        )
      )
    ),

    // Customer Reviews Section
    React.createElement('section', { style: { padding: 'clamp(40px, 6vw, 80px) 0', background: '#F5F1E8' } },
      React.createElement('div', { className: 'max-w-6xl mx-auto px-4' },
        React.createElement('h2', { style: { fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 'bold', color: '#1F3D2B', textAlign: 'center' } }, 'What Our Customers Say'),
        React.createElement('p', { style: { textAlign: 'center', color: '#8B5E3C', marginBottom: 'clamp(24px, 4vw, 40px)', fontSize: 'clamp(13px, 2vw, 16px)' } }, 'Real results from real people'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(240px, 35vw, 280px), 1fr))', gap: 'clamp(16px, 2vw, 24px)' } },
          reviews.map((r, i) =>
            React.createElement('div', { key: i, style: { background: 'white', borderRadius: '16px', padding: 'clamp(16px, 3vw, 24px)', boxShadow: '0 2px 8px rgba(31,61,43,0.06)' } },
              React.createElement('div', { style: { color: '#C6A75E', fontSize: 'clamp(14px, 2vw, 20px)', marginBottom: '12px' } }, renderStars(r.rating)),
              React.createElement('p', { style: { color: '#1F3D2B', fontSize: 'clamp(12px, 1.5vw, 14px)', lineHeight: 1.7, marginBottom: '16px', fontStyle: 'italic' } }, '"' + r.text + '"'),
              React.createElement('div', { style: { borderTop: '1px solid #e5e7eb', paddingTop: '12px' } },
                React.createElement('p', { style: { fontWeight: 'bold', color: '#1F3D2B', fontSize: 'clamp(12px, 1.5vw, 14px)' } }, r.name),
                React.createElement('p', { style: { color: '#8B5E3C', fontSize: 'clamp(10px, 1.2vw, 12px)' } }, r.location + ' \u2022 ' + r.product)
              )
            )
          )
        )
      )
    ),

    // Our Story
    React.createElement('section', { style: { padding: 'clamp(40px, 6vw, 80px) 0', background: 'white' } },
      React.createElement('div', { className: 'max-w-6xl mx-auto px-4' },
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(24px, 5vw, 60px)', alignItems: 'center' } },
          React.createElement('div', null,
            React.createElement('p', { style: { color: '#C6A75E', fontWeight: '600', letterSpacing: '2px', marginBottom: '12px', fontSize: 'clamp(12px, 1.5vw, 14px)' } }, 'Our Story'),
            React.createElement('h2', { style: { fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '20px' } }, 'A Woman-Owned African Herbal Concept'),
            React.createElement('p', { style: { color: '#4a5568', lineHeight: 1.8, fontSize: 'clamp(13px, 1.5vw, 16px)' } }, 'Nomnotho Beauty Studio is a movement rooted in African botanical wisdom.'),
            React.createElement(Link, { href: '/about', style: { color: '#C6A75E', fontWeight: '600', fontSize: 'clamp(13px, 1.5vw, 16px)', textDecoration: 'none', marginTop: '16px', display: 'inline-block' } }, 'Read Our Full Story \u2192')
          ),
          React.createElement('div', { style: { background: 'linear-gradient(135deg, #1F3D2B, #2d5a3f)', borderRadius: '24px', padding: 'clamp(30px, 5vw, 60px) clamp(20px, 4vw, 40px)', textAlign: 'center', color: 'white' } },
            React.createElement('span', { style: { fontSize: 'clamp(48px, 8vw, 80px)', display: 'block' } }, '\uD83C\uDF3F'),
            React.createElement('p', { style: { fontSize: 'clamp(14px, 2vw, 20px)', color: '#C6A75E', fontStyle: 'italic' } }, 'Natural + Premium + Healing')
          )
        )
      )
    ),

    // CTA
    React.createElement('section', { style: { background: 'linear-gradient(to right, #1F3D2B, #2d5a3f)', padding: 'clamp(40px, 6vw, 80px) 0', textAlign: 'center' } },
      React.createElement('h2', { style: { fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 'bold', color: '#F5F1E8', marginBottom: '16px' } }, 'Ready to Transform Your Beauty Routine?'),
      React.createElement(Link, { href: '/shop', style: { background: '#C6A75E', color: 'white', padding: 'clamp(12px, 2vw, 16px) clamp(32px, 5vw, 48px)', borderRadius: '50px', textDecoration: 'none', fontSize: 'clamp(14px, 2vw, 18px)', fontWeight: 'bold', display: 'inline-block', marginTop: '16px' } }, 'Shop All Products')
    )
  );
}
