import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/shop/${product.id}`}>
    <div className="group bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-gray-50 p-4">
        <img 
          src={product?.image} 
          alt={product?.title}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase tracking-wide rounded-md border border-slate-100 text-slate-500">
          {product?.category}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-semibold text-slate-800 mb-1 line-clamp-1" title={product?.title}>
          {product?.title}
        </h3>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2">
          {product?.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-slate-900">${product?.price}</span>
          </div>
          <button className="bg-slate-900 hover:bg-indigo-600 text-white p-2.5 rounded-full transition-colors shadow-md active:scale-90">
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;