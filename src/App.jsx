import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import "./index.css"
import AppRouter from './router/router';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AppRouter/>
      {/* <Header />
      <main className="grow">
        <Hero />
        <ProductGrid />
      </main>
      <Footer /> */}
    </div>
  );
}

export default App;