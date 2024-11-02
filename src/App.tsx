import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/register" element={<Menu />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
