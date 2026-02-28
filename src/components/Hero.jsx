import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl h-[450px] md:h-[600px] flex items-center group"
      >
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl px-8 md:px-16 text-white">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-indigo-500/10 rounded-full border border-indigo-500/30 backdrop-blur-md text-indigo-300"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            New Collection 2026
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight"
          >
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Digital Lifestyle.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-slate-400 text-lg md:text-xl mb-12 max-w-xl leading-relaxed font-medium"
          >
            Experience the future of shopping with our curated selection of
            premium tech and lifestyle essentials.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/shop">
              <button className="group/btn relative inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-1 active:scale-95 cursor-pointer">
                Explore Shop
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover/btn:translate-x-1"
                />
              </button>
            </Link>
            <Link to="/shop?category=electronics">
              <button className="px-8 py-4 rounded-2xl font-bold text-white border border-white/10 hover:bg-white/5 transition-all backdrop-blur-sm cursor-pointer">
                View Tech
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Decorative Image/Element (Optional but adds wow factor) */}
        <div className="absolute right-0 top-0 h-full w-1/3 hidden lg:block">
          <div className="h-full w-full bg-gradient-to-l from-indigo-600/10 to-transparent"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
