import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Products from "./pages/Products";
import Product from "./pages/Product";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import CreateCategory from "./pages/CreateCategory";
import LoginForm from "./pages/LoginForm";
import ProductosMayoristas from "./pages/ProductosMayoristas";
import EditCategory from "./pages/EditCategory";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>

            <Route index element={<Home />} />
            <Route path="/products" element={<Products/>}/>
            <Route path="/mayorista" element={<ProductosMayoristas/>}/>
            <Route path="/acategory:id" element={<Products/>}/>
            <Route path="/category/edit/:id" element={<EditCategory/>}/>
            <Route path="/product/:id" element = {<Product/>}/>
            <Route path="/product/create" element = {<CreateProduct/>}/>
            <Route path="/product/edit/:id" element = {<EditProduct/>}/>
            <Route path="/category/create" element= {<CreateCategory/>}/>
            <Route path="/:login" element= {<LoginForm/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
