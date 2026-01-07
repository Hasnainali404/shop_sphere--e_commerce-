import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white text-xs font-bold">S</div>
              <span className="text-lg font-bold text-slate-900">ShopSphere</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Designing the future of e-commerce with modern UI principles and seamless user experiences.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-600">All Products</a></li>
              <li><a href="#" className="hover:text-indigo-600">Electronics</a></li>
              <li><a href="#" className="hover:text-indigo-600">Jewelry</a></li>
              <li><a href="#" className="hover:text-indigo-600">Men's Clothing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-600">FAQ</a></li>
              <li><a href="#" className="hover:text-indigo-600">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-indigo-600">Warranty</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">
                Sub
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">© 2024 ShopSphere Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-slate-600 text-xs">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-slate-600 text-xs">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;