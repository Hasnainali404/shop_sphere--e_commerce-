import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout.jsx";
import Home from "../pages/Home.jsx";
import ProductPage from "../pages/ProductPage.jsx";
import ShopPage from "../pages/shopPage.jsx";
import LoginPage from "../pages/logipage.jsx";
import About from "../pages/About.jsx";
import PageNotFound from "../pages/pageNotFound.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:id" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
