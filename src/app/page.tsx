'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showRewardsSignup, setShowRewardsSignup] = useState(false);
  const [signupForm, setSignupForm] = useState({ name: '', email: '', phone: '' });
  const [signupDone, setSignupDone] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('nomnotho_loyalty');
    if (saved) {
      const data = JSON.parse(saved);
      setSignupDone(true);
      setSignupForm({ name: data.name, email: data.email, phone: data.phone });
      setLoyaltyPoints(data.points || 0);
    }
  }, []);

  const handleRewardsSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...signupForm, points: 0 };
    localStorage.setItem('nomnotho_loyalty', JSON.stringify(data));
    setSignupDone(true);
    setShowRewardsSignup(false);
  };

  const renderStars = (r: number) => { let s = ''; for (let i = 1; i <= 5; i++) s += i <= Math.floor(r) ? '' : ''; return s; };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % 6);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + 6) % 6);

  // ... product data same as before ...
  const featuredProducts = [ /* ... same 16 products ... */ ];

  const skinConcernProducts = [ /* ... 4 products ... */ ];

  const ingredients = [ /* ... 8 ingredients ... */ ];

  const slides = [ /* ... 6 slides ... */ ];

  // Product card helper
  const productCard = (p: any, key: number) => (
    React.createElement('div', { key, style: { background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(31,61,43,0.08)' } },
      React.createElement('img', { src: p.image, alt: p.name, style: { width: '100%', height: '220px', objectFit: 'cover' } }),
      React.createElement('div', { style: { padding: '16px' } },
        React.createElement('h3', { style: { fontSize: '14px', fontWeight: '600', color: '#1F3D2B', marginBottom: '6px', lineHeight: '1.3' } }, p.name),
        React.createElement('div', { style: { color: '#C6A75E', fontSize: '13px', marginBottom: '4px' } }, renderStars(p.rating) + ' (' + p.reviews + ')'),
        React.createElement('div', { style: { fontSize: '10px', color: '#16a34a', marginBottom: '8px' } }, 'Earn ' + p.points + ' points'),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('span', { style: { fontSize: '18px', fontWeight: 'bold', color: '#1F3D2B' } }, 'R' + p.price),
          React.createElement('button', { style: { background: '#1F3D2B', color: '#F5F1E8', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '12px' } }, 'Add to Cart')
        )
      )
    )
  );

  return React.createElement('div', { style: { background: '#F5F1E8' } },
    /* Hero Slider */
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

    /* Featured Products */
    React.createElement('section', { style: { padding: '80px 0', background: 'white' } },
      React.createElement('div', { className: 'max-w-7xl mx-auto px-4' },
        React.createElement('h2', { style: { fontSize: '32px', fontWeight: 'bold', color: '#1F3D2B', textAlign: 'center', marginBottom: '8px' } }, 'Featured Products'),
        React.createElement('p', { style: { textAlign: 'center', color: '#8B5E3C', marginBottom: '40px' } }, 'Our most loved Nomnotho Elixir products'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' } },
          featuredProducts.map((p, i) => productCard(p, i))
        )
      )
    ),

    /* Our Story */
    React.createElement('section', { style: { padding: '80px 0', background: '#F5F1E8' } },
      React.createElement('div', { className: 'max-w-6xl mx-auto px-4' },
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' } },
          React.createElement('div', null,
            React.createElement('p', { style: { color: '#C6A75E', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' } }, 'Our Story'),
            React.createElement('h2', { style: { fontSize: '36px', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '24px', lineHeight: '1.3' } }, 'A Woman-Owned African Herbal Concept'),
            React.createElement('p', { style: { color: '#4a5568', fontSize: '16px', lineHeight: '1.8', marginBottom: '16px' } }, 'Nomnotho Beauty Studio is more than skincare. It is a movement rooted in African botanical wisdom, founded by a woman with a vision to bring the healing power of the continent plants to every home.'),
            React.createElement(Link, { href: '/about', style: { color: '#C6A75E', textDecoration: 'none', fontWeight: '600', fontSize: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px' } }, 'Read Our Full Story ', React.createElement('span', { style: { fontSize: '20px' } }, '\u2192'))
          ),
          React.createElement('div', { style: { background: 'linear-gradient(135deg, #1F3D2B, #2d5a3f)', borderRadius: '24px', padding: '60px 40px', textAlign: 'center', color: 'white' } },
            React.createElement('span', { style: { fontSize: '80px', display: 'block', marginBottom: '16px' } }, '\uD83C\uDF3F'),
            React.createElement('p', { style: { fontSize: '20px', color: '#C6A75E', fontStyle: 'italic' } }, 'Natural + Premium + Healing')
          )
        )
      )
    ),

    /* Our Heritage */
    React.createElement('section', { style: { padding: '80px 0', background: 'white' } },
      React.createElement('div', { className: 'max-w-6xl mx-auto px-4' },
        React.createElement('h2', { style: { fontSize: '32px', fontWeight: 'bold', color: '#1F3D2B', textAlign: 'center', marginBottom: '8px' } }, 'Our Heritage'),
        React.createElement('p', { style: { textAlign: 'center', color: '#8B5E3C', marginBottom: '40px' } }, 'South African Botanical Heritage. Ingredients Rooted in the African Continent.'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' } },
          ingredients.map((item, i) =>
            React.createElement('div', { key: i, style: { background: '#F5F1E8', borderRadius: '16px', padding: '24px', textAlign: 'center' } },
              React.createElement('span', { style: { fontSize: '36px', display: 'block', marginBottom: '8px' } }, '\uD83C\uDF31'),
              React.createElement('h3', { style: { fontWeight: 'bold', color: '#1F3D2B', fontSize: '15px' } }, item.name),
              React.createElement('p', { style: { color: '#8B5E3C', fontSize: '13px' } }, item.location)
            )
          )
        )
      )
    ),

    /* Personalised Care */
    React.createElement('section', { style: { padding: '80px 0', background: '#F5F1E8' } },
      React.createElement('div', { className: 'max-w-7xl mx-auto px-4' },
        React.createElement('h2', { style: { fontSize: '32px', fontWeight: 'bold', color: '#1F3D2B', textAlign: 'center', marginBottom: '8px' } }, 'Personalised Care'),
        React.createElement('p', { style: { textAlign: 'center', color: '#8B5E3C', marginBottom: '32px' } }, 'What is Your Skin Concern?'),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '48px' } },
          ['Acne', 'Hyperpigmentation', 'Dryness', 'Eczema', 'Sensitive', 'Anti-aging'].map(concern =>
            React.createElement('button', { key: concern, style: { padding: '12px 24px', borderRadius: '30px', border: '2px solid #1F3D2B', background: 'white', color: '#1F3D2B', fontWeight: '600', fontSize: '14px', cursor: 'pointer' } }, concern)
          )
        ),
        React.createElement('h3', { style: { fontSize: '20px', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '24px' } }, 'Recommended Solutions'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' } },
          skinConcernProducts.map((p, i) => productCard(p, i))
        ),
        React.createElement('div', { style: { textAlign: 'center' } },
          React.createElement(Link, { href: '/shop?category=solutions', style: { color: '#C6A75E', textDecoration: 'none', fontWeight: '600', fontSize: '16px' } }, 'Browse All Skin Solutions \u2192')
        )
      )
    ),

    /* Rewards Program */
    React.createElement('section', { style: { padding: '80px 0', background: 'white' } },
      React.createElement('div', { className: 'max-w-4xl mx-auto px-4 text-center' },
        React.createElement('h2', { style: { fontSize: '32px', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '8px' } }, 'Rewards Program'),
        React.createElement('p', { style: { color: '#8B5E3C', fontSize: '18px', marginBottom: '12px' } }, 'Shop. Earn. Glow.'),
        React.createElement('p', { style: { color: '#4a5568', fontSize: '16px', marginBottom: '16px', maxWidth: '600px', margin: '0 auto 24px' } }, 'Earn 1 point for every R10 spent. 1000 points = 10% off your next order. Plus bonus points on birthdays and referrals.'),
        signupDone ? (
          React.createElement('div', { style: { background: '#F5F1E8', borderRadius: '16px', padding: '32px', display: 'inline-block' } },
            React.createElement('p', { style: { fontSize: '18px', fontWeight: 'bold', color: '#1F3D2B', marginBottom: '8px' } }, 'Welcome, ' + signupForm.name + '!'),
            React.createElement('p', { style: { color: '#8B5E3C', marginBottom: '16px' } }, 'You have ' + loyaltyPoints + ' points.'),
            loyaltyPoints >= 1000 ? (
              React.createElement('button', { style: { background: '#C6A75E', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' } }, 'Redeem 10% Discount')
            ) : (
              React.createElement('p', { style: { color: '#8B5E3C', fontSize: '14px' } }, 'Earn ' + (1000 - loyaltyPoints) + ' more points to unlock a 10% discount.')
            )
          )
        ) : (
          showRewardsSignup ? (
            React.createElement('form', { onSubmit: handleRewardsSignup, style: { background: '#F5F1E8', borderRadius: '16px', padding: '32px', maxWidth: '400px', margin: '0 auto' } },
              React.createElement('input', { type: 'text', placeholder: 'Your name', value: signupForm.name, onChange: (e: any) => setSignupForm({...signupForm, name: e.target.value}), required: true, style: { width: '100%', padding: '12px', marginBottom: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '15px' } }),
              React.createElement('input', { type: 'email', placeholder: 'Your email', value: signupForm.email, onChange: (e: any) => setSignupForm({...signupForm, email: e.target.value}), required: true, style: { width: '100%', padding: '12px', marginBottom: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '15px' } }),
              React.createElement('input', { type: 'tel', placeholder: 'Phone', value: signupForm.phone, onChange: (e: any) => setSignupForm({...signupForm, phone: e.target.value}), required: true, style: { width: '100%', padding: '12px', marginBottom: '16px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '15px' } }),
              React.createElement('button', { type: 'submit', style: { background: '#C6A75E', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' } }, 'Join Now')
            )
          ) : (
            React.createElement('button', { onClick: () => setShowRewardsSignup(true), style: { background: '#C6A75E', color: 'white', border: 'none', padding: '16px 48px', borderRadius: '50px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' } }, 'Join the Rewards Program')
          )
        )
      )
    ),

    /* CTA */
    React.createElement('section', { style: { background: 'linear-gradient(to right, #1F3D2B, #2d5a3f)', padding: '80px 0', textAlign: 'center' } },
      React.createElement('h2', { style: { fontSize: '32px', fontWeight: 'bold', color: '#F5F1E8', marginBottom: '16px' } }, 'Ready to Transform Your Beauty Routine?'),
      React.createElement('p', { style: { color: '#C6A75E', fontSize: '18px', marginBottom: '32px' } }, 'Experience the power of African botanicals with Nomnotho Elixir'),
      React.createElement(Link, { href: '/shop', style: { background: '#C6A75E', color: 'white', padding: '16px 48px', borderRadius: '50px', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold' } }, 'Shop All Products')
    )
  );
}
