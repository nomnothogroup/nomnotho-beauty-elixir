import Link from 'next/link';

export default function HomePage() {
  const slides = [
    { image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38cc9?w=1200&h=600&fit=crop', title: 'Nomnotho Elixir Skincare', subtitle: 'Natural + Premium + Healing', cta: 'Shop Skincare', link: '/shop' },
    { image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=1200&h=600&fit=crop', title: 'Nomnotho Elixir Haircare', subtitle: 'Restore & Revitalize', cta: 'Shop Haircare', link: '/shop' },
    { image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=1200&h=600&fit=crop', title: 'Beauty Bundles', subtitle: 'Save with Curated Sets', cta: 'Shop Bundles', link: '/shop' }
  ];

  const products = [
    { name: 'Marula Deep Hydration Facial Oil', price: 380, rating: 4.9, reviews: 312, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38cc9?w=400&h=400&fit=crop' },
    { name: 'Shea Luxe Body Butter', price: 229, rating: 4.8, reviews: 312, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop' },
    { name: 'Rooibos Repair Night Crème', price: 295, rating: 4.8, reviews: 203, image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop' },
    { name: 'Hair Growth Elixir', price: 449, rating: 4.9, reviews: 231, image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=400&fit=crop' }
  ];

  const renderStars = (r: number) => { let s = ''; for (let i=1; i<=5; i++) s += i <= Math.floor(r) ? '' : ''; return s; };

  return (
    <div style={{ background: '#F5F1E8' }}>
      {/* Hero */}
      <section style={{ position: 'relative', height: '80vh', minHeight: '500px', overflow: 'hidden' }}>
        {slides.map((s, i) => (
          <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === 0 ? 1 : 0, backgroundImage: linear-gradient(rgba(31,61,43,0.7), rgba(31,61,43,0.4)), url(), backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className='text-center px-4'>
              <p style={{ color: '#C6A75E', fontWeight: 600, letterSpacing: '3px', marginBottom: '16px' }}>{s.subtitle}</p>
              <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', marginBottom: '24px' }}>{s.title}</h1>
              <Link href={s.link} style={{ background: '#C6A75E', color: 'white', padding: '16px 40px', borderRadius: '50px', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold' }}>{s.cta}</Link>
            </div>
          </div>
        ))}
      </section>

      {/* Featured Products */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className='max-w-7xl mx-auto px-4'>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1F3D2B', textAlign: 'center', marginBottom: '40px' }}>Featured Products</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {products.map((p, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(31,61,43,0.08)' }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1F3D2B', marginBottom: '6px' }}>{p.name}</h3>
                  <div style={{ color: '#C6A75E', fontSize: '13px', marginBottom: '8px' }}>{renderStars(p.rating)} ({p.reviews})</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1F3D2B' }}>R{p.price}</span>
                    <button style={{ background: '#1F3D2B', color: '#F5F1E8', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '80px 0', background: '#F5F1E8' }}>
        <div className='max-w-6xl mx-auto px-4'>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1F3D2B', textAlign: 'center', marginBottom: '40px' }}>Our Values</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {[' Natural', ' Sustainable', ' Inclusive', ' African Heritage'].map((v, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
                <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>{v.split(' ')[0]}</span>
                <h3 style={{ fontWeight: 'bold', color: '#1F3D2B' }}>{v.split(' ').slice(1).join(' ')}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(to right, #1F3D2B, #2d5a3f)', padding: '80px 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#F5F1E8', marginBottom: '16px' }}>Ready to Transform Your Beauty Routine?</h2>
        <p style={{ color: '#C6A75E', fontSize: '18px', marginBottom: '32px' }}>Experience the power of African botanicals with Nomnotho Elixir</p>
        <Link href="/shop" style={{ background: '#C6A75E', color: 'white', padding: '16px 48px', borderRadius: '50px', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold' }}>Shop All Products</Link>
      </section>
    </div>
  );
}
