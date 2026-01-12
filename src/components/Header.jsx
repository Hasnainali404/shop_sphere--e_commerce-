import React, { useState, useRef, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  User,
  UserCircle,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContaxt.jsx";
// Import motion from framer-motion for animations
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // NEW: State for mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Ref to detect clicks outside the sidebar
  const sidebarRef = useRef(null);

  // Access user context
  const { user, logout } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  // Update logged in state when user changes
  useEffect(() => {
    setIsLoggedIn(user !== null);
  }, [user]);

  // Function to close the menu
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Effect for handling clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Define navigation items for mapping
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About Us", path: "/about us" },
    { name: "New Arrivals", path: "/" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* 1. Logo (Always Visible) */}
          <div className="flex items-center gap-2 shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                F
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">
                FigmaStore
              </span>
            </Link>
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
                    className="absolute right-3 cursor-pointer top-2.5 text-slate-400 hover:text-indigo-600 transition-colors"
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
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  className="hover:text-indigo-600 transition-colors"
                  to={item.path}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* 3. Icons (Right Side) */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Toggle Search Button */}
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

            {/* Login / User Link */}
            {isLoggedIn ? (
              <div className="flex items-center relative gap-2">
                <span
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600 cursor-pointer"
                >
                  <UserCircle size={20} />
                  <span className="hidden sm:inline-block">{user.name}</span>
                </span>
                {isUserDropdownOpen && (
                  <div className="absolute top-11 z-50 bg-stone-100 rounded shadow-lg p-2 w-28 left-0">
                    <ul className="flex flex-col gap-3 text-sm text-slate-700">
                      <li
                        className="pt-1 pb-1 pl-2.5 pr-2.5 cursor-pointer transition-colors rounded hover:bg-slate-200"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <a href="/profile">Profile</a>
                      </li>
                      <li
                        className="pt-1 pb-1 pl-2.5 pr-2.5 cursor-pointer transition-colors rounded hover:bg-slate-200"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <a href="/orders">Orders</a>
                      </li>
                      <li
                        className="pt-1 pb-1 pl-2.5 pr-2.5 cursor-pointer transition-colors rounded hover:bg-slate-200"
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          logout();
                        }}
                      >
                        <Link className="flex flex-row gap-1.5" to={`/`}>
                          <LogOut size={20} />
                          LogOut
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600 cursor-pointer"
                aria-label="Login"
              >
                <User size={20} />
              </Link>
            )}

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600 cursor-pointer"
            >
              <ShoppingBag size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </Link>

            {/* Mobile Menu Toggle (Only on Mobile) */}
            <button
              className="md:hidden p-2 hover:bg-slate-100 rounded-full cursor-pointer text-slate-600"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* --- 4. Mobile Side Navigation (Animated) --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          // Backdrop Overlay
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          >
            {/* Sidebar Content */}
            <motion.div
              ref={sidebarRef} // Attach ref for click outside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl p-6 flex flex-col space-y-6"
            >
              <div className="flex justify-between items-center border-b pb-4">
                <span className="text-xl font-bold text-slate-900">Menu</span>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-600"
                  aria-label="Close Menu"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col space-y-4 text-lg font-medium">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={closeMobileMenu} // Close menu after selection
                    className="text-slate-700 hover:text-indigo-600 transition-colors py-2 border-b border-slate-100 last:border-b-0"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto pt-6 border-t border-slate-100">
                <Link
                  to="/auth"
                  onClick={closeMobileMenu}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  <User size={18} />
                  Sign In / Register
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
