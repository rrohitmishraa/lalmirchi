import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import CartButton from "../components/CartButton";
import CartPanel from "../components/CartPanel";

import { menuItems } from "../data/menuData";
import logo from "../assets/brand/logo.webp";

export default function Home() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  /* ================= LOADING ================= */

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  /* ================= CART ================= */

  const updateCart = (id, delta) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === id);

      if (!exists && delta > 0) {
        const item = menuItems.find((i) => i.id === id);
        return [...prev, { ...item, qty: 1 }];
      }

      return prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0);
    });
  };

  const addToCart = (item) => updateCart(item.id, 1);
  const increase = (id) => updateCart(id, 1);
  const decrease = (id) => updateCart(id, -1);

  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const clearCart = () => setCart([]);

  /* ================= DERIVED ================= */

  const totalItems = useMemo(
    () => cart.reduce((sum, i) => sum + i.qty, 0),
    [cart],
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, i) => sum + i.qty * (i.price || 0), 0),
    [cart],
  );

  /* ================= FEATURED (IMAGE ONLY) ================= */

  const featuredItems = useMemo(() => {
    return menuItems
      .filter(
        (item) => item.available && item.image, // 👈 ONLY items with images
      )
      .slice(0, 8); // adjust how many you want
  }, []);

  /* ================= UI ================= */

  return (
    <>
      {/* LOADER */}
      <AnimatePresence>
        {loading && (
          <motion.div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
            <motion.img
              src={logo}
              className="w-20"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="bg-[#0c0c0c] text-white min-h-screen">
          {/* NAVBAR */}
          <Navbar
            totalItems={totalItems}
            openCart={() => setIsCartOpen(true)}
          />

          {/* HERO */}
          <Hero />

          {/* FEATURED SECTION */}
          <section className="px-6 md:px-20 lg:px-28 py-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">
                🔥 Menu Highlights
              </h2>

              <button
                onClick={() => navigate("/menu")}
                className="text-sm text-[#c6a75e] hover:underline"
              >
                View Full Menu →
              </button>
            </div>

            <ProductGrid
              items={featuredItems}
              cart={cart}
              addToCart={addToCart}
              increase={increase}
              decrease={decrease}
            />
          </section>

          {/* CART BUTTON */}
          <CartButton
            totalItems={totalItems}
            totalPrice={totalPrice}
            openCart={() => setIsCartOpen(true)}
          />

          {/* CART PANEL */}
          <CartPanel
            isOpen={isCartOpen}
            setIsOpen={setIsCartOpen}
            cart={cart}
            increase={increase}
            decrease={decrease}
            removeItem={removeItem}
            clearCart={clearCart}
            total={totalPrice}
          />
        </div>
      )}
    </>
  );
}
