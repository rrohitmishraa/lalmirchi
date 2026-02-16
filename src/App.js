import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryFilter from "./components/CategoryFilter";
import ProductGrid from "./components/ProductGrid";
import CartButton from "./components/CartButton";
import CartPanel from "./components/CartPanel";

import { menuItems } from "./data/menuData";
import logo from "./assets/brand/logo.webp";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  /* ================= CART ================= */

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const increase = (id) =>
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
    );

  const decrease = (id) =>
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    );

  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

  /* ================= FILTER ================= */

  const filteredItems = menuItems.filter((item) => {
    const categoryMatch =
      activeCategory === "All" || item.category === activeCategory;

    const searchMatch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black flex items-center justify-center z-[9999]"
          >
            <motion.img
              src={logo}
              alt=""
              className="w-20"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="bg-[#0c0c0c] text-white min-h-screen">
          <Navbar
            totalItems={totalItems}
            openCart={() => setIsCartOpen(true)}
          />

          <Hero />

          <section className="px-6 md:px-20 lg:px-28 py-20">
            <CategoryFilter
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              setSearchQuery={setSearchQuery}
            />

            <ProductGrid
              items={filteredItems}
              cart={cart}
              addToCart={addToCart}
              increase={increase}
              decrease={decrease}
            />
          </section>

          <CartButton
            totalItems={totalItems}
            totalPrice={totalPrice}
            openCart={() => setIsCartOpen(true)}
          />

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
