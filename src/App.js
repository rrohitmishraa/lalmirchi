import { useState, useEffect } from "react";
import { useScroll, motion, AnimatePresence } from "framer-motion";

import Hero from "./components/Hero";
import CategoryFilter from "./components/CategoryFilter";
import ProductGrid from "./components/ProductGrid";

import { menuItems } from "./data/menuData";
import LoaderImage from "./assets/brand/logo.webp";

export default function App() {
  const { scrollY } = useScroll();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;

    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* ================= LOADER ================= */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-[9999]"
          >
            <motion.img
              src={LoaderImage}
              alt="Loading..."
              className="w-24 md:w-32"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= GLOBAL DARK LUXURY BACKGROUND ================= */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Base Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1901] via-[#2a0000] to-[#0a0a0a]" />

        {/* Deep Red Glow */}
        <motion.div
          className="absolute w-[700px] h-[700px] bg-[#8b0000] rounded-full blur-[220px] opacity-30"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "-250px", left: "-200px" }}
        />

        {/* Dark Yellow / Gold Glow */}
        <motion.div
          className="absolute w-[600px] h-[600px] bg-[#a67c00] rounded-full blur-[240px] opacity-20"
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: "-200px", right: "-200px" }}
        />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      {!isLoading && (
        <div className="relative text-white">
          {/* HERO */}
          <Hero scrollY={scrollY} />

          {/* CATEGORY SECTION */}
          <section className="py-28 px-6 md:px-16">
            <div className="max-w-[1500px] mx-auto">
              <CategoryFilter
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                setSearchQuery={setSearchQuery}
              />
            </div>
          </section>

          {/* PRODUCT GRID SECTION */}
          <section className="pb-36 px-6 md:px-16">
            <div className="max-w-[1500px] mx-auto">
              <ProductGrid items={filteredItems} />
            </div>
          </section>
        </div>
      )}
    </>
  );
}
