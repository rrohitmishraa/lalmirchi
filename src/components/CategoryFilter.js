import { categories } from "../data/menuData";
import { useState } from "react";

export default function CategoryFilter({
  activeCategory,
  setActiveCategory,
  setSearchQuery,
}) {
  const [localSearch, setLocalSearch] = useState("");

  const handleSearch = (value) => {
    setLocalSearch(value);
    setSearchQuery(value);
  };

  return (
    <div className="mb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
      {/* CATEGORIES */}
      <div className="flex gap-8 text-sm tracking-wide overflow-x-auto">
        {categories.map((cat) => {
          const active = activeCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative transition ${
                active ? "text-[#c6a75e]" : "text-gray-400 hover:text-white"
              }`}
            >
              {cat}
              {active && (
                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#c6a75e]" />
              )}
            </button>
          );
        })}
      </div>

      {/* SEARCH BAR */}
      <div className="relative w-full md:w-80">
        <input
          type="text"
          value={localSearch}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search dishes..."
          className="
            w-full
            bg-[#161616]
            border border-white/10
            rounded-full
            px-12 py-3
            text-sm
            text-white
            placeholder-gray-500
            focus:outline-none
            focus:border-[#c6a75e]
            transition
          "
        />

        {/* Search Icon */}
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>

        {/* Clear Button */}
        {localSearch && (
          <button
            onClick={() => handleSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
