import { useState, useMemo, useEffect } from "react";
import Navbar from "../components/Navbar";
import { fetchMenu } from "../utils/getMenu";

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);

  /* ================= LOAD MENU ================= */

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMenu();
        setMenuItems(data);
        // fetch categories from sheet
        const catRes = await fetch(
          "https://myjson.unlinkly.com/api/sheet/1a3VEteV5ey1cqhnrf5BCNSa7bGi8AIW9v2UlShmnjoc/Cat",
        );
        const catJson = await catRes.json();
        if (catJson?.success) {
          setCategories(catJson.data.map((c) => c.category));
        }
      } catch (err) {
        console.error("Menu fetch failed", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  /* ================= FILTER ================= */

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      if (!item.available) return false;

      const searchMatch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const categoryMatch =
        activeFilter === "All" ? true
        : activeFilter === "Special" ? item.popular
        : item.category?.toLowerCase() === activeFilter.toLowerCase();

      return searchMatch && categoryMatch;
    });
  }, [menuItems, searchQuery, activeFilter]);

  /* ================= ROW ================= */

  const MenuRow = ({ item }) => {
    const price =
      item.price !== null && item.price !== undefined ?
        `₹${item.price}`
      : "MRP";

    return (
      <div className="flex justify-between items-center py-3 border-b border-white/10">
        <div className="flex flex-col">
          <span className="text-sm md:text-base">{item.name}</span>
          <span className="text-xs text-gray-400">{item.category}</span>
        </div>

        <span className="text-[#c6a75e] font-medium">{price}</span>
      </div>
    );
  };

  /* ================= LIST ================= */

  const renderList = () => {
    // SEARCH / FILTER
    if (searchQuery || activeFilter !== "All") {
      if (!filteredItems.length) {
        return <div className="text-gray-400">No items found.</div>;
      }

      return filteredItems.map((item) => <MenuRow key={item.id} item={item} />);
    }

    // ALL → grouped
    return categories.map((category) => {
      const items = menuItems.filter(
        (item) => item.category === category && item.available,
      );

      if (!items.length) return null;

      return (
        <div key={category} className="mb-6">
          <h2 className="text-xs uppercase tracking-wide mb-2 text-[#c6a75e] font-semibold">
            {category}
          </h2>

          {items.map((item) => (
            <MenuRow key={item.id} item={item} />
          ))}
        </div>
      );
    });
  };

  /* ================= UI STATES ================= */

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Loading menu...
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
    <div className="relative min-h-screen text-white bg-gradient-to-b from-[#3b0000] via-[#1a0000] to-black overflow-hidden">
      {/* 🔥 GRID BACKGROUND */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <Navbar />

      <div className="relative px-4 md:px-20 lg:px-28 pt-24 pb-10 z-10">
        {/* STICKY TOP */}
        <div className="sticky top-16 z-50 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 mb-4 rounded-xl bg-white/5 border border-white/20 text-sm outline-none backdrop-blur-xl placeholder:text-white/50"
          />

          {/* FILTERS */}
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveFilter("Special")}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap${
                activeFilter === "Special" ?
                  " bg-[#c6a75e]/90 text-black backdrop-blur-xl shadow-inner shadow-white/5"
                : " bg-white/5 border border-white/20 backdrop-blur-xl hover:bg-white/10 shadow-inner shadow-white/5"
              }`}
            >
              🔥 Today’s Special
            </button>

            <button
              onClick={() => setActiveFilter("All")}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap${
                activeFilter === "All" ?
                  " bg-[#c6a75e]/90 text-black backdrop-blur-xl shadow-inner shadow-white/5"
                : " bg-white/5 border border-white/20 backdrop-blur-xl hover:bg-white/10 shadow-inner shadow-white/5"
              }`}
            >
              All
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap${
                  activeFilter === cat ?
                    " bg-[#c6a75e]/90 text-black backdrop-blur-xl shadow-inner shadow-white/5"
                  : " bg-white/5 border border-white/20 backdrop-blur-xl hover:bg-white/10 shadow-inner shadow-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* MENU */}
        <div className="mt-4">{renderList()}</div>
      </div>
    </div>
  );
}
