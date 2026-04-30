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
      <body>
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <a
            href="https://wa.me/27761286545?text=Hi%20Nomnotho%20Beauty%20Studio,%20I%20need%20help%20with..."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#25D366',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              zIndex: 1000,
              textDecoration: 'none',
              animation: 'pulse 2s infinite'
            }}
          >
            💬
          </a>
          <style jsx global>{`
            @keyframes pulse {
              0% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
              }
              50% {
                transform: scale(1.05);
                box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
              }
              100% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
              }
            }
          `}</style>
        </CartProvider>
      </body>
    </html>
  );
}
