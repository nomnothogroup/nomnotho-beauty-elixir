'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useCart } from '@/lib/cart-context';

export default function HomePage() {
  const { dispatch } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % 6);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + 6) % 6);

  useEffect(() => {
    const timer = setInterval(() => nextSlide(), 5000);
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

  const featuredProducts = [
    { id: 1, name: 'Marula Deep Hydration Oil', price: 380, rating: 4.9, reviews: 312, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38cc9?w=400&h=400&fit=crop' },
    { id: 2, name: 'Shea Luxe Body Butter', price: 229, rating: 4.8, reviews: 312, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop' },
    { id: 3, name: 'Imbali Spot Dots', price: 150, rating: 4.7, reviews: 234, image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop' },
    { id: 4, name: 'Rooibos Repair Night Creme', price: 295, rating: 4.8, reviews: 203, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop' },
    { id: 5, name: 'Rooibos Antioxidant Mist', price: 175, rating: 4.6, reviews: 203, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38cc9?w=400&h=400&fit=crop' },
    { id: 6, name: 'Selina Daily Shield SPF40', price: 310, rating: 4.7, reviews: 198, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop' },
    { id: 7, name: 'Niacinamide Pore Serum', price: 285, rating: 4.5, reviews: 176, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop' },
    { id: 8, name: 'Moringa Brightening Cleanser', price: 220, rating: 4.6, reviews: 167, image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop' },
    { id: 9, name: 'African Gold Tissue Oil', price: 260, rating: 4.8, reviews: 156, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38cc9?w=400&h=400&fit=crop' },
    { id: 10, name: 'Vitamin C Glow Drops', price: 335, rating: 4.7, reviews: 154, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop' },
    { id: 11, name: 'Buchu Clarifying Serum', price: 315, rating: 4.6, reviews: 145, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop' },
    { id: 12, name: 'Marula Radiance Elixir', price: 320, rating: 4.9, reviews: 124, image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop' },
    { id: 13, name: 'Kalahari Eye Cream', price: 290, rating: 4.8, reviews: 112, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38cc9?w=400&h=400&fit=crop' },
    { id: 14, name: 'Baobab Glow Creme', price: 280, rating: 4.7, reviews: 98, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop' },
    { id: 15, name: 'Ubuntu Glow Hydra-Serum', price: 350, rating: 4.9, reviews: 89, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop' },
    { id: 16, name: 'Baobab Enzyme Exfoliant', price: 245, rating: 4.6, reviews: 89, image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop' }
  ];

  const ingredients = [
    { name: 'Rooibos', location: 'Western Cape' },
    { name: 'Marula', location: 'Limpopo' },
    { name: 'Baobab', location: 'Central Africa' },
    { name: 'Buchu', location: 'Cape Region' },
    { name: 'Aloe Ferox', location: 'Eastern Cape' },
    { name: 'Kalahari Melon', location: 'Kalahari' },
    { name: 'African Black Soap', location: 'West Africa' },
    { name: 'Mongongo', location: 'Southern Africa' }
  ];

  const addToCart = (p: any) => {
    dispatch({ type: 'ADD_ITEM', payload: { id: p.id, name: p.name, price: p.price, image: p.image } });
  };

  const renderStars = (r: number) => {
    let s = '';
    for (let i = 1; i <= 5; i++) s += i <= Math.floor(r) ? '' : '';
    return s;
  };

  return React.createElement('div', { style: { background: '#F5F1E8' } },
    React.createElement('section', { style: { position: 'relative', height: '80vh', minHeight: '500px', overflow: 'hidden' } },
      slides.map((slide, index) =>
        React.createElement('div', {
          key: index,
          style: {
            position: 'absolute', inset: 0,
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            backgroundImage: 'linear-gradient(rgba(31,61,43,0.7), rgba(31,61,43,0.4)), url(' + slide.image + ')',
            backgroundSize: 'cover', backgroundPosition: 'center',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }
        },
          React.createElement('div', { className: 'text-center px-4' },
            React.createElement('p', { style: { color: '#C6A75E', fontWeight: 600, letterSpacing: '3px', marginBottom: '16px', textTransform: 'uppercase' } }, slide.subtitle),
            React.createElement('h1', { style: { fontSize: '48px', fontWeight: 'bold', color: 'white', marginBottom: '24px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' } }, slide.title),
            React.createElement(Link, { href: slide.link, style: { background: '#C6A75E', color: 'white', padding: '16px 40px', borderRadius: '50px', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold', display: 'inline-block' } }, 'Shop Now')
          )
        )
      ),
      React.createElement('button', { onClick: prevSlide, style: { position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', fontSize: '24px' } }, '<'),
      React.createElement('button', { onClick: nextSlide, style: { position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', fontSize: '24px' } }, '>'),
      React.createElement('div', { style: { position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '12px' } },
        slides.map((_, i) =>
          React.createElement('button', { key: i, onClick: () => setCurrentSlide(i), style: { width: i === currentSlide ? '32px' : '12px', height: '12px', borderRadius: '6px', border: 'none', background: i === currentSlide ? '#C6A75E' : 'rgba(255,255,255,0.5)', cursor: 'pointer' } })
        )
      )
    ),

    React.createElement('section', { style: { padding: '80px 0', background: 'white' } },
      React.createElement('div', { className: 'max-w-7xl mx-auto px-4' },
        React.createElement('h2', { style: { fontSize: '32px', fontWeight: 'bold', color: '#1F3D2B', textAlign: 'center' } }, 'Featured Products'),
        React.createElement('p', { style: { textAlign: 'center', color: '#8B5E3C', marginBottom: '40px' } }, 'Our most loved Nomnotho Elixir products'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' } },
          featuredProducts.map(p =>
            React.createElement('div', { key: p.id, style: { background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(31,61,43,0.08)' } },
              React.createElement('img', { src: p.image, alt: p.name, style: { width: '100%', height: '220px', objectFit: 'cover' } }),
              React.createElement('div', { style: { padding: '16px' } },
                React.createElement('h3', { style: { fontSize: '14px', fontWeight: '600', color: '#1F3D2B', marginBottom: '6px' } }, p.name),
                React.createElement('div', { style: { color: '#C6A75E', fontSize: '13px' } }, renderStars(p.rating) + ' (' + p.reviews + ')'),
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' } },
                  React.createElement('span', { style: { fontSize: '18px', fontWeight: 'bold', color: '#1F3D2B' } }, 'R' + p.price),
                  React.createElement('button', { onClick: () => addToCart(p), style: { background: '#1F3D2B', color: '#F5F1E8', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '12px' } }, 'Add to Cart')
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
            React.createElement('p', { style: { color: '#4a5568', lineHeight: '1.8', marginBottom: '16px' } }, 'Nomnotho Beauty Studio is a movement rooted in African botanical wisdom.'),
            React.createElement(Link, { href: '/about', style: { color: '#C6A75E', fontWeight: '600', fontSize: '16px', textDecoration: 'none' } }, 'Read Our Full Story ')
          ),
          React.createElement('div', { style: { background: 'linear-gradient(135deg, #1F3D2B, #2d5a3f)', borderRadius: '24px', padding: '60px 40px', textAlign: 'center', color: 'white' } },
            React.createElement('span', { style: { fontSize: '80px', display: 'block' } }, ''),
            React.createElement('p', { style: { fontSize: '20px', color: '#C6A75E', fontStyle: 'italic' } }, '"Natural + Premium + Healing"')
          )
        )
      )
    ),

    React.createElement('section', { style: { padding: '80px 0', background: 'white' } },
      React.createElement('div', { className: 'max-w-6xl mx-auto px-4' },
        React.createElement('h2', { style: { fontSize: '32px', fontWeight: 'bold', color: '#1F3D2B', textAlign: 'center' } }, 'Our Heritage'),
        React.createElement('p', { style: { textAlign: 'center', color: '#8B5E3C', marginBottom: '40px' } }, 'South African Botanical Heritage'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' } },
          ingredients.map((item, i) =>
            React.createElement('div', { key: i, style: { background: '#F5F1E8', borderRadius: '16px', padding: '24px', textAlign: 'center' } },
              React.createElement('span', { style: { fontSize: '36px', display: 'block', marginBottom: '8px' } }, ''),
              React.createElement('h3', { style: { fontWeight: 'bold', color: '#1F3D2B' } }, item.name),
              React.createElement('p', { style: { color: '#8B5E3C', fontSize: '13px' } }, item.location)
            )
          )
        )
      )
    ),

    React.createElement('section', { style: { background: 'linear-gradient(to right, #1F3D2B, #2d5a3f)', padding: '80px 0', textAlign: 'center' } },
      React.createElement('h2', { style: { fontSize: '32px', fontWeight: 'bold', color: '#F5F1E8' } }, 'Ready to Transform Your Beauty Routine?'),
      React.createElement('p', { style: { color: '#C6A75E', fontSize: '18px', marginBottom: '32px' } }, 'Experience the power of African botanicals'),
      React.createElement(Link, { href: '/shop', style: { background: '#C6A75E', color: 'white', padding: '16px 48px', borderRadius: '50px', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold' } }, 'Shop All Products')
    )
  );
}
