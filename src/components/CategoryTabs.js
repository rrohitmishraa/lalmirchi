export default function CategoryTabs({ categories, active, setActive }) {
  return (
    <div className="flex gap-4 overflow-x-auto mb-8">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`px-4 py-2 rounded-full transition ${
            active === cat
              ? "bg-primaryRed text-white"
              : "bg-cardBg text-gray-400"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
