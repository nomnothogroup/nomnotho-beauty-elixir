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
    { name: 'Thandi M.', location: 'Johannesburg', text: 'The Eczema Relief Cream changed my skin completely! After 2 weeks my dry patches were gone.', rating: 5, product: 'Eczema Relief Cream' },
    { name: 'Lerato K.', location: 'Cape Town', text: 'Hair Growth Elixir for 3 months and my edges are finally growing back. This product is magic!', rating: 5, product: 'Hair Growth Elixir' },
    { name: 'Nomsa D.', location: 'Durban', text: 'The Acne Clear Gel worked better than anything. My skin is clear for the first time in years.', rating: 5, product: 'Acne Clear Gel' },
    { name: 'Sipho N.', location: 'Pretoria', text: 'As a reseller, Nomnotho products practically sell themselves. The quality is unmatched!', rating: 5, product: 'Reseller' }
  ];

  const addToCart = (p: any) => {
    dispatch({ type: 'ADD_ITEM', payload: { id: p.id, name: p.name, price: p.price, image: p.image, quantity: 1 } });
    setAddedMsg(p.name + ' added!');
    setTimeout(() => setAddedMsg(''), 2000);
  };

  const renderStars = (r: number = 5) => { let s = ''; for (let i = 1; i <= 5; i++) s += i <= Math.floor(r) ? '\u2605' : '\u2606'; return s; };

  return React.createElement('div', { style: { background: '#F5F1E8', overflowX: 'hidden', width: '100%', maxWidth: '100vw' } },
    addedMsg && React.createElement('div', { style: { position: 'fixed', top: '70px', right: '10px', background: '#1F3D2B', color: '#C6A75E', padding: '10px 20px', borderRadius: '8px', zIndex: 1000, fontWeight: 'bold', fontSize: '13px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' } }, addedMsg),

    // Hero
    React.createElement('section', { style: { position: 'relative', height: 'clamp(350px, 50vh, 550px)', overflow: 'hidden', width: '100%' } },
      slides.map((slide, index) =>
        React.createElement('div', { key: index, style: { position: 'absolute', inset: 0, opacity: index === currentSlide ? 1 : 0, transition: 'opacity 0.8s ease-in-out', backgroundImage: 'linear-gradient(rgba(31,61,43,0.7), rgba(31,61,43,0.4)), url(' + slide.image + ')', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' } },
          React.createElement('div', { style: { textAlign: 'center', padding: '0 16px', maxWidth: '100%' } },
            React.createElement('p', { style: { color: '#C6A75E', fontWeight: 600, letterSpacing: '2px', marginBottom: '10px', textTransform: 'uppercase', fontSize: 'clamp(11px, 1.8vw, 14px)' } }, slide.subtitle),
            React.createElement('h1', { style: { fontSize: 'clamp(24px, 5vw, 42px)', fontWeight: 'bold', color: 'white', marginBottom: '16px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', lineHeight: 1.2 } }, slide.title),
            React.createElement(Link, { href: slide.link, style: { background: '#C6A75E', color: 'white', padding: '12px 28px', borderRadius: '50px', textDecoration: 'none', fontSize: 'clamp(13px, 1.8vw, 16px)', fontWeight: 'bold', display: 'inline-block' } }, 'Shop Now')
          )
        )
      ),
      React.createElement('button', { onClick: () => setCurrentSlide((prev) => (prev - 1 + 6) % 6), style: { position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.25)', border: 'none', color: 'white', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '20px', zIndex: 10 } }, '\u2039'),
      React.createElement('button', { onClick: () => setCurrentSlide((prev) => (prev + 1) % 6), style: { position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.25)', border: 'none', color: 'white', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '20px', zIndex: 10 } }, '\u203a')
    ),

    // Featured Products
    React.createElement('section', { style: { padding: '40px 0', background: 'white', width: '100%' } },
      React.createElement('div', { style: { maxWidth: '1200px', margin: '0 auto', padding: '0 12px' } },
        React.createElement('h2', { style: { fontSize: 'clamp(20px, 4vw, 30px)', fontWeight: 'bold', color: '#1F3D2B', textAlign: 'center', marginBottom: '6px' } }, 'Featured Products'),
        React.createElement('p', { style: { textAlign: 'center', color: '#8B5E3C', marginBottom: '28px', fontSize: 'clamp(12px, 2vw, 15px)' } }, 'Our most loved Nomnotho Elixir products'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px' } },
          featuredProducts.map((p: any) =>
            React.createElement('div', { key: p.id, style: { background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(31,61,43,0.08)', display: 'flex', flexDirection: 'column' } },
              React.createElement('div', { style: { width: '100%', aspectRatio: '1/1', position: 'relative' } },
                React.createElement('img', { src: p.image || 'https://images.unsplash.com/photo-1570194065650-d99fb4b38cc9?w=400&h=400&fit=crop', alt: p.name, style: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' } })
              ),
              React.createElement('div', { style: { padding: '10px', display: 'flex', flexDirection: 'column', flex: 1 } },
                React.createElement('h3', { style: { fontSize: 'clamp(11px, 1.5vw, 13px)', fontWeight: '600', color: '#1F3D2B', marginBottom: '4px', lineHeight: 1.3 } }, p.name),
                React.createElement('div', { style: { color: '#C6A75E', fontSize: 'clamp(10px, 1.3vw, 12px)', marginBottom: '6px' } }, renderStars(p.rating)),
                React.createElement('div', { style: { marginTop: 'auto' } },
                  React.createElement('span', { style: { fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: 'bold', color: '#1F3D2B', display: 'block', marginBottom: '8px' } }, 'R' + (p.price || 0).toFixed(2)),
                  React.createElement('div', { style: { display: 'flex', gap: '6px' } },
                    React.createElement('button', { onClick: () => addToCart(p), style: { flex: 1, background: '#1F3D2B', color: '#F5F1E8', border: 'none', padding: '8px 6px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: 'clamp(10px, 1.3vw, 12px)', minHeight: '36px', whiteSpace: 'nowrap' } }, 'Add to Cart'),
                    React.createElement(Link, { href: '/cart', onClick: () => addToCart(p), style: { flex: 1, background: '#C6A75E', color: 'white', border: 'none', padding: '8px 6px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: 'clamp(10px, 1.3vw, 12px)', textDecoration: 'none', textAlign: 'center', minHeight: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, 'Buy Now')
                  )
                )
              )
            )
          )
        )
      )
    ),

    // Reviews
    React.createElement('section', { style: { padding: '40px 0', background: '#F5F1E8', width: '100%' } },
      React.createElement('div', { style: { maxWidth: '1100px', margin: '0 auto', padding: '0 12px' } },
        React.createElement('h2', { style: { fontSize: 'clamp(20px, 4vw, 30px)', fontWeight: 'bold', color: '#1F3D2B', textAlign: 'center' } }, 'What Our Customers Say'),
        React.createElement('p', { style: { textAlign: 'center', color: '#8B5E3C', marginBottom: '28px', fontSize: 'clamp(12px, 2vw, 15px)' } }, 'Real results from real people'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '14px' } },
          reviews.map((r, i) =>
            React.createElement('div', { key: i, style: { background: 'white', borderRadius: '14px', padding: '18px', boxShadow: '0 2px 8px rgba(31,61,43,0.06)' } },
              React.createElement('div', { style: { color: '#C6A75E', fontSize: '16px', marginBottom: '10px' } }, renderStars(r.rating)),
              React.createElement('p', { style: { color: '#1F3D2B', fontSize: 'clamp(12px, 1.5vw, 14px)', lineHeight: 1.6, marginBottom: '14px', fontStyle: 'italic' } }, '"' + r.text + '"'),
              React.createElement('div', { style: { borderTop: '1px solid #e5e7eb', paddingTop: '10px' } },
                React.createElement('p', { style: { fontWeight: 'bold', color: '#1F3D2B', fontSize: '13px' } }, r.name),
                React.createElement('p', { style: { color: '#8B5E3C', fontSize: '11px' } }, r.location + ' \u2022 ' + r.product)
              )
            )
          )
        )
      )
    ),

    // Our Story
    React.createElement('section', { style: { padding: '40px 0', background: 'white', width: '100%' } },
      React.createElement('div', { style: { maxWidth: '1100px', margin: '0 auto', padding: '0 12px' } },
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', alignItems: 'center' } },
          React.createElement('div', null,
            React.createElement('p', { style: { color: '#C6A75E', fontWeight: '600', letterSpacing: '2px', marginBottom: '10px', fontSize: 'clamp(11px, 1.5vw, 13px)' } }, 'Our Story'),
            React.createElement('h2', { style: { fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '16px' } }, 'A Woman-Owned African Herbal Concept'),
            React.createElement('p', { style: { color: '#4a5568', lineHeight: 1.7, fontSize: 'clamp(12px, 1.5vw, 15px)', marginBottom: '12px' } }, 'Nomnotho Beauty Studio is a movement rooted in African botanical wisdom, founded by a woman with a vision to bring healing to every home.'),
            React.createElement(Link, { href: '/about', style: { color: '#C6A75E', fontWeight: '600', fontSize: 'clamp(12px, 1.5vw, 15px)', textDecoration: 'none' } }, 'Read Our Full Story \u2192')
          ),
          React.createElement('div', { style: { background: 'linear-gradient(135deg, #1F3D2B, #2d5a3f)', borderRadius: '20px', padding: 'clamp(30px, 5vw, 50px) 20px', textAlign: 'center', color: 'white' } },
            React.createElement('span', { style: { fontSize: 'clamp(40px, 8vw, 70px)', display: 'block', marginBottom: '8px' } }, '\uD83C\uDF3F'),
            React.createElement('p', { style: { fontSize: 'clamp(14px, 2vw, 18px)', color: '#C6A75E', fontStyle: 'italic' } }, 'Natural + Premium + Healing')
          )
        )
      )
    ),

    // CTA
    React.createElement('section', { style: { background: 'linear-gradient(to right, #1F3D2B, #2d5a3f)', padding: '40px 0', textAlign: 'center', width: '100%' } },
      React.createElement('h2', { style: { fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 'bold', color: '#F5F1E8', marginBottom: '14px', padding: '0 12px' } }, 'Ready to Transform Your Beauty Routine?'),
      React.createElement(Link, { href: '/shop', style: { background: '#C6A75E', color: 'white', padding: '12px 36px', borderRadius: '50px', textDecoration: 'none', fontSize: 'clamp(13px, 1.8vw, 16px)', fontWeight: 'bold', display: 'inline-block' } }, 'Shop All Products')
    )
  );
}
