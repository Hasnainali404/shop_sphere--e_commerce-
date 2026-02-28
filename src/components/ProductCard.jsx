import React from "react";
import { Plus, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link to={`/shop/${product.id}`} className="group block">
        <div className="relative bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col h-full overflow-hidden">
          {/* Image Container */}
          <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-[1.5rem] bg-slate-50 p-6 flex items-center justify-center">
            <motion.img
              src={product?.image}
              alt={product?.title}
              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Category Tag */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-100 text-slate-500 shadow-sm">
                {product?.category}
              </span>
            </div>

            {/* Quick Action Overlay */}
            <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors duration-500"></div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col px-2">
            <div className="flex items-center gap-1 text-amber-400 mb-2">
              <Star fill="currentColor" size={12} />
              <span className="text-[10px] font-bold text-slate-400">
                {product?.rating?.rate || "4.5"}
              </span>
            </div>
            
            <h3 className="font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors" title={product?.title}>
              {product?.title}
            </h3>
            
            <p className="text-xs text-slate-400 mb-6 line-clamp-2 leading-relaxed font-medium">
              {product?.description}
            </p>
            
            <div className="mt-auto flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Price</span>
                <span className="text-xl font-black text-slate-900">${product?.price}</span>
              </div>
              
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  // Add to cart logic would go here
                }}
                className="bg-slate-900 hover:bg-indigo-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-95 cursor-pointer"
              >
                <Plus size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
