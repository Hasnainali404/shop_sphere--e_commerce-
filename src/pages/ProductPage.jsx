import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import {
  Star,
  ShoppingBag,
  ArrowLeft,
  Truck,
  Shield,
  Share2,
  Heart,
} from "lucide-react";

const ProductPage = ({ productId = 1, onBack }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Simulating delay for skeleton demo
        setTimeout(() => {
          setProduct(data);
          setLoading(false);
        }, 600);
      });
  }, [productId]);

  if (loading) return <ProductSkeleton onBack={onBack} />;

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-12">
      {/* Navigation Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <Link to={`/shop`}>
          <button
            onClick={onBack}
            className="flex cursor-pointer items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            Back to Shopping
          </button>
        </Link>
      </div>

      <main className="container mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left Column: Image Gallery */}
            <div className="p-8 bg-gray-50 flex flex-col items-center justify-center relative">
              <div className="relative w-full max-w-md aspect-square bg-white rounded-2xl p-8 shadow-sm flex items-center justify-center mb-6">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md text-slate-400 hover:text-red-500 transition-colors">
                  <Heart size={20} />
                </button>
              </div>

              {/* Thumbnails (Simulated since API only gives 1 image) */}
              <div className="flex gap-4 overflow-x-auto pb-2 w-full justify-center">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-xl bg-white border-2 p-2 shrink-0 transition-all ${
                      activeImage === i
                        ? "border-indigo-600 shadow-md"
                        : "border-transparent hover:border-slate-200"
                    }`}
                  >
                    <img
                      src={product.image}
                      alt="Thumbnail"
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Product Details */}
            <div className="p-8 md:p-12 flex flex-col h-full">
              <div className="mb-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-full">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                    <Star fill="currentColor" size={16} />
                    <span>{product.rating?.rate}</span>
                    <span className="text-slate-400 font-medium ml-1">
                      ({product.rating?.count} reviews)
                    </span>
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                  {product.title}
                </h1>

                <p className="text-slate-500 text-lg leading-relaxed mb-8">
                  {product.description}
                </p>

                <div className="flex items-end gap-4 mb-8">
                  <span className="text-4xl font-bold text-slate-900">
                    ${product.price}
                  </span>
                  <span className="text-lg text-slate-400 line-through mb-1">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                  <span className="text-xs text-green-600 font-bold bg-green-100 px-2 py-1 rounded-md mb-2">
                    Save 20%
                  </span>
                </div>

                <div className="h-px w-full bg-slate-100 mb-8"></div>

                {/* Features / Trust Badges */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Truck size={16} />
                    </div>
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Shield size={16} />
                    </div>
                    <span>2 Year Warranty</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <div className="flex items-center border border-slate-200 rounded-xl px-4 py-3 sm:w-auto w-full justify-between">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-slate-400 hover:text-indigo-600 font-bold text-lg px-2"
                  >
                    -
                  </button>
                  <span className="font-bold text-slate-900 w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-slate-400 hover:text-indigo-600 font-bold text-lg px-2"
                  >
                    +
                  </button>
                </div>

                <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2">
                  <ShoppingBag size={20} />
                  Add to Cart
                </button>

                <button className="p-4 border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Internal Sub-component for Skeleton Loading
const ProductSkeleton = ({ onBack }) => (
  <div className="min-h-screen bg-slate-50 container mx-auto px-4 py-6">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-slate-400 mb-6"
    >
      <div className="w-4 h-4 bg-slate-200 rounded"></div>
      <div className="w-20 h-4 bg-slate-200 rounded"></div>
    </button>

    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-2 animate-pulse">
      <div className="p-8 bg-gray-50 h-125 flex items-center justify-center">
        <div className="w-3/4 h-3/4 bg-slate-200 rounded-2xl"></div>
      </div>
      <div className="p-12 flex flex-col">
        <div className="w-20 h-6 bg-slate-200 rounded-full mb-4"></div>
        <div className="w-3/4 h-10 bg-slate-200 rounded-lg mb-4"></div>
        <div className="w-full h-4 bg-slate-200 rounded-full mb-2"></div>
        <div className="w-2/3 h-4 bg-slate-200 rounded-full mb-8"></div>
        <div className="w-32 h-10 bg-slate-200 rounded-lg mb-8"></div>
        <div className="mt-auto flex gap-4">
          <div className="w-32 h-14 bg-slate-200 rounded-xl"></div>
          <div className="flex-1 h-14 bg-slate-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductPage;
