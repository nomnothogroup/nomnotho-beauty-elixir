import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import fetch from 'node-fetch';

export async function GET() {
  try {
    const { data: products } = await supabase
      .from('products')
      .select('*')
      .eq('active', true);

    if (!products || products.length === 0) {
      return NextResponse.json({ error: 'No products found' });
    }

    const p = products[Math.floor(Math.random() * products.length)];

    const caption = `${p.name}\n\nR${p.price} | ${p.category}\n\n${p.description || 'Premium African botanical skincare.'}\n\nShop: www.nomnothobeautystudio.co.za\n\n#NomnothoElixir #AfricanBeauty #NaturalSkincare`;

    const image = p.image || 'https://images.unsplash.com/photo-1570194065650-d99fb4b38cc9?w=800&h=800&fit=crop';

    const token = process.env.BUFFER_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.json({ error: 'Buffer token not configured' }, { status: 500 });
    }

    // Get Buffer profile IDs
    const profilesRes = await fetch('https://api.bufferapp.com/1/profiles.json?access_token=' + token);
    const profiles = await profilesRes.json();

    const results = [];

    for (const profile of profiles) {
      const postRes = await fetch('https://api.bufferapp.com/1/updates/create.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          access_token: token,
          'profile_ids[]': profile.id,
          'text': caption,
          'media[photo]': image,
          'shorten': 'false',
          'now': 'true'
        })
      });
      results.push(await postRes.json());
    }

    return NextResponse.json({
      success: true,
      product: p.name,
      posted_to: profiles.length + ' accounts',
      results
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
