import { useState, useMemo, useEffect } from "react";
import Navbar from "../components/Navbar";
import { fetchMenu } from "../utils/getMenu";

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
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

  /* ================= CATEGORY ORDER ================= */

  const orderedCategories = useMemo(
    () => ["Snacks", "Beverages", "Maggi", "Egg", "Chicken", "Mutton", "Thali"],
    [],
  );

  /* ================= FILTER ================= */

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      if (!item.available) return false;

      const searchMatch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const categoryMatch =
        activeFilter === "All"
          ? true
          : activeFilter === "Special"
            ? item.popular
            : item.category === activeFilter;

      return searchMatch && categoryMatch;
    });
  }, [menuItems, searchQuery, activeFilter]);

  /* ================= ROW ================= */

  const MenuRow = ({ item }) => {
    const price =
      item.price !== null && item.price !== undefined
        ? `₹${item.price}`
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
    return orderedCategories.map((category) => {
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
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="px-4 md:px-20 lg:px-28 pt-24 pb-10">
        {/* STICKY TOP */}
        <div className="sticky top-16 z-50 bg-black pb-4">
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg bg-[#1a1a1a] text-sm outline-none"
          />

          {/* FILTERS */}
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveFilter("Special")}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                activeFilter === "Special"
                  ? "bg-[#c6a75e] text-black"
                  : "bg-[#1a1a1a]"
              }`}
            >
              🔥 Today’s Special
            </button>

            <button
              onClick={() => setActiveFilter("All")}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                activeFilter === "All"
                  ? "bg-[#c6a75e] text-black"
                  : "bg-[#1a1a1a]"
              }`}
            >
              All
            </button>

            {orderedCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  activeFilter === cat
                    ? "bg-[#c6a75e] text-black"
                    : "bg-[#1a1a1a]"
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
