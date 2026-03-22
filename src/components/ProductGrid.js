import ProductCard from "./ProductCard";

export default function ProductGrid({
  items = [],
  cart = [],
  addToCart,
  increase,
  decrease,
  className = "",
}) {
  /* ================= EMPTY STATE ================= */

  if (!items.length) {
    return (
      <div className="text-gray-400 text-center py-10">No items found.</div>
    );
  }

  /* ================= CART LOOKUP ================= */

  const cartMap = Object.fromEntries(cart.map((item) => [item.id, item]));

  /* ================= UI ================= */

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
    >
      {items.map((item) => {
        const cartItem = cartMap[item.id];

        return (
          <ProductCard
            key={item.id}
            item={item}
            cartItem={cartItem}
            addToCart={addToCart}
            increase={increase}
            decrease={decrease}
          />
        );
      })}
    </div>
  );
}
