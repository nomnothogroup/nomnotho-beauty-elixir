import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('active', true);

  if (!products || products.length === 0) {
    return NextResponse.json({ error: 'No products' });
  }

  const p = products[Math.floor(Math.random() * products.length)];

  return NextResponse.json({
    text: `${p.name}\n\nR${p.price}\n\n${p.description || ''}\n\nShop: www.nomnothobeautystudio.co.za\n\n#NomnothoElixir #AfricanBeauty`,
    image: p.image || 'https://images.unsplash.com/photo-1570194065650-d99fb4b38cc9?w=800&h=800&fit=crop',
    link: 'https://www.nomnothobeautystudio.co.za/shop'
  });
}
