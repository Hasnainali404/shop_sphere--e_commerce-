import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="relative bg-indigo-900 rounded-3xl overflow-hidden shadow-2xl h-100 md:h-125 flex items-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-purple-500 via-indigo-500 to-transparent"></div>
        
        <div className="relative z-10 max-w-2xl px-8 md:px-16 text-white">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase bg-indigo-800/50 rounded-full border border-indigo-700 backdrop-blur-sm">
            New Collection 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Curated Styles for <br/>
            <span className="text-indigo-300">Modern Living.</span>
          </h1>
          <p className="text-indigo-100 text-lg mb-8 max-w-lg">
            Discover our premium selection of electronics, fashion, and lifestyle products designed for the contemporary user.
          </p>
          <Link to={`/shop`}>
          <button className="bg-white cursor-pointer text-indigo-900 px-8 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
            Shop Now
          </button></Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;