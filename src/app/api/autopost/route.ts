export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('active', true);

  if (!products || products.length === 0) {
    return NextResponse.json({ error: 'No products found' });
  }

  const p = products[Math.floor(Math.random() * products.length)];

  return NextResponse.json({
    text: p.name + '\n\nR' + p.price + ' | ' + p.category + '\n\n' + (p.description || 'Premium African botanical skincare.') + '\n\n Shop now & save: www.nomnothobeautystudio.co.za/shop | WhatsApp: 0761286545\n\n#NomnothoElixir #AfricanBeauty',
    image: p.image || 'https://images.unsplash.com/photo-1570194065650-d99fb4b38cc9?w=1080&h=1080&fit=crop&crop=entropy',
    link: 'https://www.nomnothobeautystudio.co.za/shop'
  });
}

