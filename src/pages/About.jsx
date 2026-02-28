import React from "react";
import { motion } from "framer-motion";
import { Info, Target, Users, Sparkles } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-600 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-600 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight"
          >
            Redefining <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Modern Commerce.
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl max-w-2xl mx-auto font-medium leading-relaxed"
          >
            ShopSphere is more than just a store. It's a curated experience designed for those who value quality, design, and innovation.
          </motion.p>
        </div>
      </section>

      {/* Stats/Features */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100">
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-200">
              <Target size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">Our Mission</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              To provide a seamless, premium shopping experience that connects creators with quality-conscious consumers.
            </p>
          </div>

          <div className="text-center p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100">
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-200">
              <Users size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">Community</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              We believe in building a vibrant community of tech enthusiasts and style icons who inspire each other.
            </p>
          </div>

          <div className="text-center p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100">
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-200">
              <Sparkles size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">Innovation</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              Constantly evolving our platform to bring you the latest in tech and the smartest ways to shop.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
