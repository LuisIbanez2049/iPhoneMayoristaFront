import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Products from "./pages/Products";
import Product from "./pages/Product";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>

            <Route index element={<Home />} />
            <Route path="/products" element={<Products/>}/>
            <Route path="/acategory:id" element={<Products/>}/>
            <Route path="/product/:id" element = {<Product/>}/>
            <Route path="/product/create" element = {<CreateProduct/>}/>
            <Route path="/product/edit/:id" element = {<EditProduct/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
