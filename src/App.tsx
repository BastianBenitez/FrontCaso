import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Categorias from "./pages/Categorias";
import Products from "./pages/Products";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
