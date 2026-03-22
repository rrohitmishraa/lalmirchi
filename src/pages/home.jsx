import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import CartButton from "../components/CartButton";
import CartPanel from "../components/CartPanel";

import { fetchMenu } from "../utils/getMenu";
import logo from "../assets/brand/logo.webp";

export default function Home() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [error, setError] = useState(false);

  /* ================= LOAD MENU ================= */

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMenu();
        setMenuItems(data);
      } catch (err) {
        console.error("Menu fetch failed", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  /* ================= CART ================= */

  const updateCart = (id, delta) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === id);

      if (!exists && delta > 0) {
        const item = menuItems.find((i) => i.id === id);
        if (!item) return prev;
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

  /* ================= FEATURED ================= */

  const featuredItems = useMemo(() => {
    return menuItems.filter((item) => item.available && item.image).slice(0, 8);
  }, [menuItems]);

  /* ================= UI STATES ================= */

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <motion.img
          src={logo}
          className="w-20"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Failed to load menu. Please try again.
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="bg-[#0c0c0c] text-white min-h-screen">
      {/* NAVBAR */}
      <Navbar totalItems={totalItems} openCart={() => setIsCartOpen(true)} />

      {/* HERO */}
      <Hero />

      {/* FEATURED */}
      <section className="px-6 md:px-20 lg:px-28 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">🔥 Menu Highlights</h2>

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
  );
}
