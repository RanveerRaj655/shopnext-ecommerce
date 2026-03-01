'use client';
import Link from 'next/link';
import { ShoppingCart, User, Menu, X, Search, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useCartStore } from '@/store/cartStore';
import { CartDrawer } from '@/components/cart/CartDrawer';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted]   = useState(false);
  const { data: session }       = useSession();
  const { getTotalItems, openCart } = useCartStore();

  // Only show cart count after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="text-2xl font-bold tracking-tight text-black">
              Shop<span className="text-blue-600">Next</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/products" className="text-gray-600 hover:text-black transition-colors font-medium">
                Products
              </Link>
              <Link href="/products?category=men" className="text-gray-600 hover:text-black transition-colors font-medium">
                Men
              </Link>
              <Link href="/products?category=women" className="text-gray-600 hover:text-black transition-colors font-medium">
                Women
              </Link>
              <Link href="/products?category=sale" className="text-red-500 hover:text-red-600 transition-colors font-medium">
                Sale 🔥
              </Link>
              {(session?.user as any)?.role === 'admin' && (
                <Link href="/admin/dashboard" className="text-blue-600 font-medium hover:text-blue-700">
                  Admin
                </Link>
              )}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-black transition-colors">
                <Search size={20} />
              </button>

              {/* Cart Button — only show count after mount */}
              <button
                onClick={openCart}
                className="relative text-gray-600 hover:text-black transition-colors"
              >
                <ShoppingCart size={20} />
                {mounted && getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {session ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 hidden md:block">
                    {session.user?.name}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link href="/login" className="text-gray-600 hover:text-black transition-colors">
                  <User size={20} />
                </Link>
              )}

              <button
                className="md:hidden text-gray-600"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-4">
              <Link href="/products" className="text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>
                Products
              </Link>
              <Link href="/products?category=men" className="text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>
                Men
              </Link>
              <Link href="/products?category=women" className="text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>
                Women
              </Link>
              <Link href="/products?category=sale" className="text-red-500 font-medium" onClick={() => setMenuOpen(false)}>
                Sale 🔥
              </Link>
              {session ? (
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-left text-red-500 font-medium"
                >
                  Logout
                </button>
              ) : (
                <Link href="/login" className="text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
