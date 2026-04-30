'use client';
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AccountPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<any>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
      if (error) setMessage(error.message);
      else setMessage('Check your email to confirm your account!');
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else { setUser(data.user); setMessage('Logged in!'); }
    }
  };

  if (user) {
    return React.createElement('div', { className: 'min-h-screen bg-[#F5F1E8] flex items-center justify-center' },
      React.createElement('div', { className: 'bg-white rounded-2xl p-8 shadow-lg max-w-md text-center' },
        React.createElement('span', { className: 'text-5xl mb-4 block' }, '\uD83D\uDE0A'),
        React.createElement('h1', { className: 'text-2xl font-bold text-[#1F3D2B] mb-2' }, 'Welcome, ' + (user.user_metadata?.name || 'Customer') + '!'),
        React.createElement('p', { className: 'text-gray-600 mb-2' }, user.email),
        React.createElement('div', { className: 'bg-[#F5F1E8] rounded-xl p-4 mb-6' },
          React.createElement('p', { className: 'text-[#8B5E3C] font-semibold' }, 'Points: 0'),
          React.createElement('p', { className: 'text-sm text-gray-500' }, 'R10 = 1 point | 1000 points = 10% off')
        ),
        React.createElement('div', { className: 'flex gap-4' },
          React.createElement(Link, { href: '/checkout', className: 'flex-1 bg-[#C6A75E] text-white py-3 rounded-xl font-bold text-center no-underline' }, 'Checkout'),
          React.createElement('button', { onClick: () => supabase.auth.signOut().then(() => setUser(null)), className: 'flex-1 bg-white border-2 border-[#1F3D2B] text-[#1F3D2B] py-3 rounded-xl font-bold' }, 'Logout')
        )
      )
    );
  }

  return React.createElement('div', { className: 'min-h-screen bg-[#F5F1E8] flex items-center justify-center px-4' },
    React.createElement('div', { className: 'bg-white rounded-2xl p-8 shadow-lg max-w-md w-full' },
      React.createElement('div', { className: 'text-center mb-6' },
        React.createElement('span', { className: 'text-5xl block mb-4' }, '\u2728'),
        React.createElement('h1', { className: 'text-2xl font-bold text-[#1F3D2B]' }, isSignUp ? 'Create Account' : 'Login'),
        React.createElement('p', { className: 'text-[#8B5E3C] mt-1' }, 'Nomnotho Beauty Studio'),
        React.createElement('p', { className: 'text-sm text-[#C6A75E] mt-2' }, 'Login to earn points and track orders')
      ),
      message && React.createElement('div', { className: 'bg-[#FFFDF5] border border-[#C6A75E] text-[#1F3D2B] p-3 rounded-lg mb-4 text-sm text-center' }, message),
      React.createElement('form', { onSubmit: handleAuth, className: 'space-y-4' },
        isSignUp && React.createElement('input', { type: 'text', placeholder: 'Full Name', value: name, onChange: (e: any) => setName(e.target.value), className: 'w-full border-2 border-gray-300 p-3 rounded-xl text-gray-900 bg-white', required: true }),
        React.createElement('input', { type: 'email', placeholder: 'Email', value: email, onChange: (e: any) => setEmail(e.target.value), className: 'w-full border-2 border-gray-300 p-3 rounded-xl text-gray-900 bg-white', required: true }),
        React.createElement('input', { type: 'password', placeholder: 'Password', value: password, onChange: (e: any) => setPassword(e.target.value), className: 'w-full border-2 border-gray-300 p-3 rounded-xl text-gray-900 bg-white', required: true }),
        React.createElement('button', { type: 'submit', className: 'w-full bg-[#C6A75E] text-white py-3 rounded-xl font-bold text-lg' }, isSignUp ? 'Create Account' : 'Login')
      ),
      React.createElement('p', { className: 'text-center mt-4 text-sm text-gray-600' },
        isSignUp ? 'Already have an account? ' : 'Don\'t have an account? ',
        React.createElement('button', { onClick: () => { setIsSignUp(!isSignUp); setMessage(''); }, className: 'text-[#C6A75E] font-bold underline bg-transparent border-none cursor-pointer' }, isSignUp ? 'Login' : 'Sign Up')
      ),
      React.createElement(Link, { href: '/', className: 'block text-center mt-6 text-sm text-[#8B5E3C] no-underline' }, '\u2190 Back to Shop')
    )
  );
}
