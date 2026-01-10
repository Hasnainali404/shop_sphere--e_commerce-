import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { useLocation } from "react-router-dom";
import "./notfoundcomp.css";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const getAllCategory = () => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => setCategory(data))
      .catch((err) => console.log(err));
  };

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchValue = params.get("search");

  const filterProduct = products.filter(
    (item) =>
      (item.title.toLowerCase().includes(searchValue?.toLowerCase()) &&
        selectCategory === "") ||
      item.category == selectCategory
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const paginatedProduct = filterProduct.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filterProduct.length / itemsPerPage);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        // Simulating a slight delay to show off the skeleton UI
        setTimeout(() => {
          setProducts(data);
          setLoading(false);
        }, 600);
      })
      .catch((err) => console.error(err));
    getAllCategory();
  }, []);

  return (
    <section className="container mx-auto px-4 pb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Trending Now</h2>
        <select
          className=" font-medium border-none rounded mt-4 p-1 text-black bg-stone-200 active:border-none cursor-pointer"
          onChange={(e) => setSelectCategory(e.target.value)}
        >
          <option className="cursor-pointer" value="">
            All
          </option>
          {category.map((items) => (
            <option value={items}>
              {items}
            </option>
          ))}
        </select>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : paginatedProduct.length > 0 ? (
          paginatedProduct.map((item, i) => (
            <div key={i}>
              <ProductCard product={item} />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center gap-4 text-center text-gray-500">
            <div className="loader"></div>
            No products found.
          </div>
        )}
      </div>
      <div className=" w-full flex items-center justify-center">
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            className="bg-stone-300 rounded pt-1 pl-3 pr-3 pb-1 mt-4 ml-2 cursor-pointer hover:bg-stone-400 transition-colors duration-500"
            onClick={() => setCurrentPage(page + 1)}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
