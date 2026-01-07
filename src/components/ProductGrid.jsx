import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import SkeletonCard from './SkeletonCard';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        // Simulating a slight delay to show off the skeleton UI
        setTimeout(() => {
          setProducts(data);
          setLoading(false);
        }, 800);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="container mx-auto px-4 pb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Trending Now</h2>
        <button className="text-indigo-600 font-medium hover:text-indigo-700">View All</button>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading 
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </div>
    </section>
  );
};

export default ProductGrid;