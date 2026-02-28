import React, { useState, useRef, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  User,
  UserCircle,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContaxt.jsx";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const { user, logout } = useContext(UserContext);
  const isLoggedIn = !!user;

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeMobileMenu();
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "New Arrivals", path: "/shop?category=electronics" },
  ];

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchValue.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchValue)}`);
      setIsSearchOpen(false);
      setSearchValue("");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
              S
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 hidden sm:block">
              ShopSphere<span className="text-indigo-600">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Search Bar (Desktop) */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Find something..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleSearch}
                className="w-48 lg:w-64 bg-slate-100 border-transparent focus:bg-white border focus:border-indigo-500 rounded-2xl px-5 py-2.5 text-sm outline-none transition-all font-medium text-slate-700"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2.5 hover:bg-slate-100 rounded-xl transition-colors text-slate-600 cursor-pointer"
            >
              <Search size={22} />
            </button>

            {/* User Profile / Login */}
            <div className="relative">
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-2xl transition-all text-slate-700 font-bold text-sm cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                      <User size={18} />
                    </div>
                    <span className="hidden sm:inline-block">{user.name}</span>
                    <ChevronDown size={14} className={`transition-transform ${isUserDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isUserDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-14 right-0 w-56 bg-white border border-slate-100 rounded-[1.5rem] shadow-2xl p-3 z-50 origin-top-right"
                      >
                        <div className="px-4 py-3 mb-2 border-b border-slate-50">
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
                          <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
                        </div>
                        <ul className="space-y-1">
                          <li>
                            <Link to="/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-sm font-bold text-slate-600 transition-colors">
                              <UserCircle size={18} /> Profile
                            </Link>
                          </li>
                          <li>
                            <Link to="/orders" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-sm font-bold text-slate-600 transition-colors">
                              <ShoppingBag size={18} /> Orders
                            </Link>
                          </li>
                          <li className="pt-2 mt-2 border-t border-slate-50">
                            <button
                              onClick={() => {
                                setIsUserDropdownOpen(false);
                                logout();
                              }}
                              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-sm font-bold text-red-600 transition-colors cursor-pointer"
                            >
                              <LogOut size={18} /> Sign Out
                            </button>
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-slate-900 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-200 active:scale-95"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2.5 hover:bg-slate-100 rounded-xl transition-all text-slate-600 cursor-pointer"
            >
              <ShoppingBag size={22} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2.5 hover:bg-slate-100 rounded-xl cursor-pointer text-slate-600"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    autoFocus
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleSearch}
                    className="w-full bg-slate-50 border-transparent focus:bg-white border focus:border-indigo-500 rounded-2xl px-12 py-3.5 text-base outline-none transition-all font-medium text-slate-700 shadow-inner"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              ref={sidebarRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[300px] bg-white z-[70] shadow-2xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-2xl font-black text-slate-900">Navigation</span>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className="text-xl font-bold text-slate-600 hover:text-indigo-600 transition-colors py-2"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto">
                {!isLoggedIn && (
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-indigo-600 text-white rounded-[1.5rem] font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
                  >
                    <User size={20} /> Sign In / Register
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

