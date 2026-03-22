import logo from "../assets/brand/logo.webp";
import { useNavigate } from "react-router-dom";

export default function Navbar({ totalItems, openCart }) {
  const navigate = useNavigate();

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex fixed top-0 left-0 w-full h-16 border-b border-white/10 bg-black/40 backdrop-blur-md items-center justify-between px-8 z-50">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} className="w-8" alt="" />
          <span className="font-semibold">Lal Mirchi</span>
        </div>

        <div className="flex gap-8 text-sm text-gray-300">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/menu")}>Menu</button>
          <button>Contact</button>
        </div>

        <button onClick={openCart} className="text-[#c6a75e]">
          🛒 {totalItems}
        </button>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full h-16 border-t border-white/10 bg-black/50 backdrop-blur-md flex justify-around items-center z-50 text-sm">
        <button onClick={() => navigate("/")}>Home</button>

        <button onClick={() => navigate("/menu")}>Menu</button>

        <button onClick={openCart} className="relative text-[#c6a75e]">
          🛒
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-[#9a1e02] text-xs px-2 py-[2px] rounded-full">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </>
  );
}
