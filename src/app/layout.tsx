import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CartProvider } from "@/lib/cart-context";

export const metadata: Metadata = {
  title: "Nomnotho Beauty Studio | Premium Skincare & Haircare",
  description: "Discover Nomnotho Elixir - premium African botanical skincare and haircare.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1895840820440054" crossOrigin="anonymous"></script>
        <meta name="google-adsense-account" content="ca-pub-1895840820440054" />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <a
            href="https://wa.me/27761286545?text=Hi%20Nomnotho%20Beauty%20Studio%2C%20I%20need%20help%20with..."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              background: '#25D366',
              color: 'white',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              boxShadow: '0 4px 16px rgba(37,211,102,0.4)',
              zIndex: 999,
              textDecoration: 'none'
            }}
          >
            
          </a>
        </CartProvider>
      </body>
    </html>
  );
}
