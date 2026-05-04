import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: products } = await supabase
      .from('products')
      .select('*')
      .eq('active', true);

    if (!products || products.length === 0) {
      return NextResponse.json({ error: 'No products found' });
    }

    const product = products[Math.floor(Math.random() * products.length)];

    const caption = `${product.name}\n\n${product.description || 'Premium African botanical skincare.'}\n\nR${product.price}\nwww.nomnothobeautystudio.co.za\n\n#NomnothoElixir #AfricanBeauty #${product.category}`;

    const imageUrl = product.image || 'https://images.unsplash.com/photo-1570194065650-d99fb4b38cc9?w=800&h=800&fit=crop';

    return NextResponse.json({
      success: true,
      product: product.name,
      caption: caption,
      image: imageUrl,
      price: product.price
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
