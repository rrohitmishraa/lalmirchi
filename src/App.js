import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import MenuPage from "./pages/menuPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </BrowserRouter>
  );
}
