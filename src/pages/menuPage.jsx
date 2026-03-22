import { useState, useMemo, useRef, useEffect } from "react";
import { menuItems } from "../data/menuData";
import Navbar from "../components/Navbar";

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCategory, setVisibleCategory] = useState("Snacks");

  const sectionRefs = useRef({});

  /* ✅ FIX 1: stable reference */
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
  }, [searchQuery, activeFilter]);

  /* ================= SCROLL TRACK ================= */

  useEffect(() => {
    if (activeFilter !== "All") return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      let current = orderedCategories[0];

      for (const category of orderedCategories) {
        const section = sectionRefs.current[category];
        if (section && section.offsetTop <= scrollPosition) {
          current = category;
        }
      }

      setVisibleCategory(current);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeFilter, orderedCategories]);

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
    if (searchQuery || activeFilter !== "All") {
      if (!filteredItems.length) {
        return <div className="text-gray-400">No items found.</div>;
      }

      return filteredItems.map((item) => <MenuRow key={item.id} item={item} />);
    }

    return orderedCategories.map((category) => {
      const items = menuItems.filter(
        (item) => item.category === category && item.available,
      );

      if (!items.length) return null;

      const isActive = visibleCategory === category;

      return (
        <div
          key={category}
          ref={(el) => (sectionRefs.current[category] = el)}
          className="mb-6"
        >
          <h2
            className={`text-xs uppercase tracking-wide mb-2 transition ${
              isActive ? "text-[#c6a75e] font-semibold" : "text-gray-500"
            }`}
          >
            {category}
          </h2>

          {items.map((item) => (
            <MenuRow key={item.id} item={item} />
          ))}
        </div>
      );
    });
  };

  /* ================= UI ================= */

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="px-4 md:px-20 lg:px-28 pt-24 pb-10">
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
                onClick={() => {
                  setActiveFilter("All");

                  sectionRefs.current[cat]?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  activeFilter === cat ||
                  (activeFilter === "All" && visibleCategory === cat)
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
