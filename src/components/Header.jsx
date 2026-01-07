import React from 'react';
import { ShoppingBag, Search, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">ShopSphere</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-indigo-600 transition-colors">Home</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Shop</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Categories</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">New Arrivals</a>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
            <Search size={20} />
          </button>
          <button className="relative p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
            <ShoppingBag size={20} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="md:hidden p-2 hover:bg-slate-100 rounded-full text-slate-600">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;