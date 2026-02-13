import ProductCard from "./ProductCard";

export default function ProductGrid({ items }) {
  return (
    <section className="relative w-full">
      <div className="max-w-[1500px] mx-auto px-6 md:px-16">
        {/* SECTION HEADER */}
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-semibold text-white">
            Our Specials
          </h2>

          <div className="w-24 h-[2px] bg-[#c6a75e] mt-4 mx-auto md:mx-0" />

          <p className="text-gray-400 mt-6 max-w-xl">
            Carefully crafted dishes made with authentic spices and traditional
            home-style preparation.
          </p>
        </div>

        {/* EMPTY STATE */}
        {items.length === 0 ? (
          <div
            className="
            mt-20
            bg-white/5
            backdrop-blur-lg
            border border-white/10
            rounded-[40px]
            py-16
            text-center
            text-gray-400
          "
          >
            No items found.
          </div>
        ) : (
          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-8 md:gap-10
          "
          >
            {items.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
