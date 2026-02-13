import { categories } from "../data/menuData";

export default function CategoryFilter({
  activeCategory,
  setActiveCategory,
  setSearchQuery,
}) {
  return (
    <div className="space-y-10">
      {/* FILTER BAR GLASS PANEL */}
      <div
        className="
          bg-white/5
          backdrop-blur-lg
          border border-white/10
          rounded-[40px]
          shadow-[0_25px_60px_rgba(0,0,0,0.7)]
          px-6 md:px-10
          py-6
        "
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* LEFT — Categories */}
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    px-6 py-2 rounded-full text-sm md:text-base font-medium
                    transition-all duration-300 whitespace-nowrap
                    ${
                      isActive
                        ? "bg-[#c6a75e] text-black shadow-md"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }
                  `}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* RIGHT — Search */}
          <div className="relative w-full md:w-[320px]">
            <input
              type="text"
              placeholder="Search dishes..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full
                bg-white/10
                backdrop-blur-md
                border border-white/10
                rounded-full
                px-5 py-3
                text-sm
                text-white
                placeholder-gray-400
                focus:outline-none
                focus:border-[#c6a75e]
                transition
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
