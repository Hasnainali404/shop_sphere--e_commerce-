import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Star,
  ShoppingBag,
  ArrowLeft,
  Truck,
  Shield,
  Share2,
  Heart,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setProduct(data);
          setLoading(false);
        }, 600);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <ProductSkeleton />;

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/shop" className="text-indigo-600 font-bold hover:underline">Back to Shop</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-24 md:pb-12">
      {/* Breadcrumb Navigation */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 py-4 flex items-center gap-2 text-sm font-medium">
          <Link to="/" className="text-slate-400 hover:text-indigo-600 transition-colors">Home</Link>
          <ChevronRight size={14} className="text-slate-300" />
          <Link to="/shop" className="text-slate-400 hover:text-indigo-600 transition-colors">Shop</Link>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-slate-900 truncate max-w-[200px]">{product.title}</span>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Image Section */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square bg-slate-50 rounded-[3rem] p-12 border border-slate-100 flex items-center justify-center group overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
              />
              <button className="absolute top-8 right-8 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-slate-400 hover:text-red-500 transition-all hover:scale-110">
                <Heart size={24} />
              </button>
            </motion.div>

            {/* Gallery Thumbnails */}
            <div className="flex gap-4 justify-center">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-24 h-24 rounded-3xl bg-slate-50 border-2 p-4 transition-all ${
                    activeImage === i
                      ? "border-indigo-600 shadow-xl shadow-indigo-100 scale-105"
                      : "border-transparent hover:border-slate-200"
                  }`}
                >
                  <img src={product.image} alt="" className="w-full h-full object-contain mix-blend-multiply opacity-50 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info Section */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-widest rounded-full border border-indigo-100">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-amber-500 font-black">
                  <Star fill="currentColor" size={18} />
                  <span>{product.rating?.rate}</span>
                  <span className="text-slate-400 font-bold ml-1 text-sm">
                    ({product.rating?.count} reviews)
                  </span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-[1.1]">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-4 mb-10">
                <span className="text-5xl font-black text-slate-900">
                  ${product.price}
                </span>
                <span className="text-xl text-slate-300 line-through font-bold">
                  ${(product.price * 1.2).toFixed(2)}
                </span>
                <span className="bg-green-100 text-green-700 text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wider">
                  Save 20%
                </span>
              </div>

              <p className="text-slate-500 text-lg leading-relaxed mb-12 font-medium">
                {product.description}
              </p>

              {/* USP Cards */}
              <div className="grid grid-cols-2 gap-4 mb-12">
                <div className="p-4 rounded-3xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
                    <Truck size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">Shipping</p>
                    <p className="text-sm font-bold text-slate-900">Free Delivery</p>
                  </div>
                </div>
                <div className="p-4 rounded-3xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
                    <Shield size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">Warranty</p>
                    <p className="text-sm font-bold text-slate-900">2 Year Cover</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-100">
                <div className="flex items-center bg-slate-100 rounded-[1.5rem] p-1 sm:w-auto w-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-slate-500 hover:text-indigo-600 font-black text-xl transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-black text-slate-900 w-10 text-center text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-slate-500 hover:text-indigo-600 font-black text-xl transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-8 rounded-[1.5rem] shadow-2xl shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer group">
                  <ShoppingBag size={22} className="group-hover:scale-110 transition-transform" />
                  Add to Shopping Bag
                </button>

                <button className="w-14 h-14 border-2 border-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50 transition-all cursor-pointer">
                  <Share2 size={24} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

const ProductSkeleton = () => (
  <div className="min-h-screen bg-white container mx-auto px-4 py-24">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 animate-pulse">
      <div className="space-y-6">
        <div className="aspect-square bg-slate-100 rounded-[3rem]"></div>
        <div className="flex gap-4 justify-center">
          {[1, 2, 3].map(i => <div key={i} className="w-24 h-24 bg-slate-100 rounded-3xl"></div>)}
        </div>
      </div>
      <div className="space-y-8">
        <div className="w-32 h-6 bg-slate-100 rounded-full"></div>
        <div className="w-full h-16 bg-slate-100 rounded-2xl"></div>
        <div className="w-1/2 h-12 bg-slate-100 rounded-2xl"></div>
        <div className="w-full h-40 bg-slate-100 rounded-[2rem]"></div>
        <div className="flex gap-4">
          <div className="w-32 h-16 bg-slate-100 rounded-2xl"></div>
          <div className="flex-1 h-16 bg-slate-100 rounded-2xl"></div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductPage;

