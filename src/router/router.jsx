import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../components/layout.jsx";
import Home from "../pages/Home.jsx";
import ProductPage from "../pages/ProductPage.jsx";
import ShopPage from "../pages/shopPage.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:id" element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}