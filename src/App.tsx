import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import PerfilPage from "./pages/PerfilPage";
import OrderPage from "./pages/OrderPage";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/orders" element={<OrderPage />} />
          </Route>
          <Route>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
