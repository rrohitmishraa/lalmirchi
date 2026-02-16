import ProductCard from "./ProductCard";

export default function ProductGrid({
  items,
  cart,
  addToCart,
  increase,
  decrease,
}) {
  if (!items.length) {
    return <div className="text-gray-400">No items found.</div>;
  }

  return (
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {items.map((item) => (
        <ProductCard
          key={item.id}
          item={item}
          cartItem={cart.find((i) => i.id === item.id)}
          addToCart={addToCart}
          increase={increase}
          decrease={decrease}
        />
      ))}
    </div>
  );
}
