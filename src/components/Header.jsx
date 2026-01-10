import React, { useState } from "react";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* 1. Logo (Always Visible) */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            F
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">
            FigmaStore
          </span>
        </div>

        {/* 2. Middle Section: Swaps between Nav and Search Input */}
        <div className="flex-1 flex justify-center px-4 md:px-8">
          {/* A. Search Input (Visible when Open) */}
          <div
            className={`
            flex items-center w-full max-w-xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
            ${
              isSearchOpen
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 -translate-y-4 scale-95 pointer-events-none absolute"
            }
          `}
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-slate-100 border-transparent focus:bg-white border focus:border-indigo-500 rounded-full px-5 py-2.5 text-sm outline-none transition-all shadow-inner text-slate-700"
                autoFocus={isSearchOpen}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Link to={`/shop?search=${encodeURIComponent(searchValue)}`}>
                <Search
                  className="absolute right-3 cursor-pointer top-2.5 text-slate-400"
                  size={18}
                />
              </Link>
            </div>
          </div>

          {/* B. Desktop Navigation (Visible when Search is Closed) */}
          <nav
            className={`
            hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 cursor-pointer transition-all duration-300
            ${
              !isSearchOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none absolute"
            }
          `}
          >
            <Link className="hover:text-indigo-600 transition-colors" to={`/`}>
              Home
            </Link>
            <Link
              className="hover:text-indigo-600 transition-colors"
              to={`/shop`}
            >
              Shop
            </Link>
            <Link className="hover:text-indigo-600 transition-colors">
              Categories
            </Link>
            <Link className="hover:text-indigo-600 transition-colors">
              New Arrivals
            </Link>
          </nav>
        </div>

        {/* 3. Icons (Right Side) */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Toggle Button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`p-2 rounded-full transition-all cursor-pointer duration-300 ${
              isSearchOpen
                ? "bg-slate-100 text-slate-900 rotate-90"
                : "hover:bg-slate-100 text-slate-600 rotate-0"
            }`}
            aria-label="Toggle Search"
          >
            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>

          {/* Cart Icon */}
          <button className="relative p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600 cursor-pointer">
            <ShoppingBag size={20} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Mobile Menu (Hidden on Desktop) */}
          <button className="md:hidden p-2 hover:bg-slate-100 rounded-full cursor-pointer text-slate-600">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
