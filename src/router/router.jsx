import { BrowserRouter, Route, Routes } from "react-router";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import App from "../App";
import Layout from "../components/layout.jsx";
import Home from "../pages/Home.jsx";
import ProductPage from "../pages/ProductPage.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route elemen={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/product/:id" element={<ProductPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
