'use client';
import React, { useState } from 'react';
import { useCart } from '@/lib/cart-context';

const products = [
  { id: 1, name: 'Marula Deep Hydration Facial Oil', category: 'skincare', price: 380, rating: 4.8, reviews: 124, points: 38, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop' },
  { id: 2, name: 'Shea Luxe Body Butter', category: 'skincare', price: 229, rating: 4.7, reviews: 89, points: 23, image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop' },
  { id: 3, name: 'Rooibos Repair Night Crème', category: 'skincare', price: 295, rating: 4.9, reviews: 156, points: 30, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=400&h=400&fit=crop' },
  { id: 4, name: 'African Black Soap', category: 'soaps', price: 145, rating: 4.6, reviews: 78, points: 15, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=400&h=400&fit=crop' },
  { id: 5, name: 'Moringa Hair Growth Serum', category: 'haircare', price: 265, rating: 4.5, reviews: 92, points: 27, image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=400&fit=crop' },
  { id: 6, name: 'Baobab Radiance Serum', category: 'skincare', price: 420, rating: 4.8, reviews: 110, points: 42, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop' },
  { id: 7, name: 'Hibiscus Face Mask', category: 'skincare', price: 189, rating: 4.4, reviews: 67, points: 19, image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop' },
  { id: 8, name: 'Coconut Deep Conditioner', category: 'haircare', price: 175, rating: 4.6, reviews: 83, points: 18, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop' },
  { id: 9, name: 'Aloe Vera Gel', category: 'solutions', price: 135, rating: 4.7, reviews: 145, points: 14, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop' },
  { id: 10, name: 'Argan Hair Oil', category: 'haircare', price: 245, rating: 4.5, reviews: 76, points: 25, image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&h=400&fit=crop' },
  { id: 11, name: 'Turmeric Brightening Soap', category: 'soaps', price: 125, rating: 4.3, reviews: 54, points: 13, image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=400&h=400&fit=crop' },
  { id: 12, name: 'Rose Water Toner', category: 'skincare', price: 165, rating: 4.6, reviews: 98, points: 17, image: 'https://images.unsplash.com/photo-1600428877878-1a0ff56f89ad?w=400&h=400&fit=crop' },
  { id: 13, name: 'Neem Acne Solution', category: 'solutions', price: 195, rating: 4.4, reviews: 62, points: 20, image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop' },
  { id: 14, name: 'Mango Body Lotion', category: 'skincare', price: 199, rating: 4.5, reviews: 71, points: 20, image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop' },
  { id: 15, name: 'Tea Tree Shampoo', category: 'haircare', price: 185, rating: 4.4, reviews: 85, points: 19, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=400&fit=crop' },
  { id: 16, name: 'Lavender Sleep Mask', category: 'solutions', price: 215, rating: 4.7, reviews: 93, points: 22, image: 'https://images.unsplash.com/photo-1576723496503-6e00f6e908dd?w=400&h=400&fit=crop' },
  { id: 17, name: 'Papaya Enzyme Peel', category: 'skincare', price: 275, rating: 4.6, reviews: 108, points: 28, image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop' },
  { id: 18, name: 'Avocado Hair Mask', category: 'haircare', price: 225, rating: 4.5, reviews: 79, points: 23, image: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=400&h=400&fit=crop' },
  { id: 19, name: 'Charcoal Detox Soap', category: 'soaps', price: 135, rating: 4.4, reviews: 66, points: 14, image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop' },
  { id: 20, name: 'Vitamin C Serum', category: 'skincare', price: 385, rating: 4.8, reviews: 142, points: 39, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop' },
  { id: 21, name: 'Jasmine Perfume Oil', category: 'perfumes', price: 320, rating: 4.7, reviews: 88, points: 32, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop' },
  { id: 22, name: 'Sandalwood Body Oil', category: 'skincare', price: 295, rating: 4.6, reviews: 74, points: 30, image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop' },
  { id: 23, name: 'Ginger Root Hair Tonic', category: 'haircare', price: 195, rating: 4.3, reviews: 58, points: 20, image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=400&fit=crop' },
  { id: 24, name: 'Honey & Oat Soap', category: 'soaps', price: 115, rating: 4.5, reviews: 82, points: 12, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=400&h=400&fit=crop' },
  { id: 25, name: 'Frankincense Eye Cream', category: 'skincare', price: 345, rating: 4.7, reviews: 96, points: 35, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=400&h=400&fit=crop' },
  { id: 26, name: 'Rose Perfume Mist', category: 'perfumes', price: 275, rating: 4.6, reviews: 101, points: 28, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop' },
  { id: 27, name: 'Eczema Relief Balm', category: 'solutions', price: 245, rating: 4.5, reviews: 73, points: 25, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop' },
  { id: 28, name: 'Vanilla Body Scrub', category: 'skincare', price: 175, rating: 4.4, reviews: 68, points: 18, image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop' },
  { id: 29, name: 'User Manual - Skincare Guide', category: 'manuals', price: 85, rating: 4.8, reviews: 45, points: 9, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=400&fit=crop' },
  { id: 30, name: 'Complete Beauty Bundle', category: 'skincare', price: 895, rating: 4.9, reviews: 167, points: 90, image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop' },
];

export default function ShopPage() {
  const { dispatch } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', 'skincare', 'haircare', 'makeup', 'soaps', 'solutions', 'perfumes', 'manuals'];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: typeof products[0]) => {
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        quantity: 1, 
        image: product.image 
      } 
    });
  };

  const buyNow = (product: typeof products[0]) => {
    addToCart(product);
    window.location.href = '/checkout';
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <section className="bg-gradient-to-br from-[#1F3D2B] to-[#2d5a3f] py-16 text-center text-white">
        <h1 className="text-4xl font-bold">Shop Our Products</h1>
        <p className="text-[#C6A75E] mt-2">Natural + Premium + Healing</p>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCategory === category 
                  ? 'bg-[#C6A75E] text-white' 
                  : 'bg-white text-[#1F3D2B] hover:bg-[#C6A75E] hover:text-white'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                <div className="absolute top-3 right-3 bg-[#C6A75E] text-white px-3 py-1 rounded-full text-sm font-bold">
                  {product.points} pts
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#1F3D2B] text-lg mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm text-gray-600">{product.rating} ({product.reviews})</span>
                </div>
                <p className="text-2xl font-bold text-[#C6A75E] mb-4">R{product.price}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-[#1F3D2B] text-white py-2 rounded-lg font-semibold hover:bg-[#2d5a3f] transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => buyNow(product)}
                    className="flex-1 bg-[#C6A75E] text-white py-2 rounded-lg font-semibold hover:bg-[#b09045] transition"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
