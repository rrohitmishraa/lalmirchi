import { motion } from "framer-motion";
import { useState } from "react";
import ProductDetailsModal from "./ProductDetailsModal";

export default function ProductCard({
  item,
  cartItem,
  addToCart,
  increase,
  decrease,
}) {
  const [isOpen, setIsOpen] = useState(false);

  /* ================= SAFE VALUES ================= */

  const hasImage = !!item.image;
  const priceText =
    item.price !== null && item.price !== undefined ? `₹${item.price}` : "MRP";

  const spiceLevel = item.spiceLevel || 0;

  /* ================= UI ================= */

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 180, damping: 15 }}
        className="
          group relative
          rounded-3xl
          overflow-hidden
          bg-white/5
          backdrop-blur-lg
          border border-white/10
          shadow-[0_20px_50px_rgba(0,0,0,0.7)]
        "
      >
        {/* IMAGE (optional) */}
        {hasImage && (
          <div className="relative h-56 overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="
                w-full h-full object-cover
                transition duration-700
                group-hover:scale-110
              "
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
        )}

        {/* CONTENT */}
        <div className="p-5 space-y-3">
          {/* TITLE + PRICE */}
          <div className="flex justify-between items-start gap-2">
            <h4 className="text-base md:text-lg font-semibold text-white leading-tight">
              {item.name}
            </h4>

            <span className="text-[#c6a75e] font-semibold whitespace-nowrap">
              {priceText}
            </span>
          </div>

          {/* META */}
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>{item.pieces || ""}</span>

            {spiceLevel > 0 && (
              <span className="flex gap-1 text-[#b11212]">
                {Array.from({ length: spiceLevel }).map((_, i) => (
                  <span key={i}>🔥</span>
                ))}
              </span>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2 pt-2">
            {/* Details */}
            <button
              onClick={() => setIsOpen(true)}
              className="
                flex-1
                bg-white/10
                border border-white/20
                backdrop-blur-md
                py-2
                rounded-lg
                text-sm
                hover:bg-white/20
                transition
              "
            >
              Details
            </button>

            {/* Cart */}
            {!cartItem ? (
              <button
                onClick={() => addToCart && addToCart(item)}
                className="
                  flex-1
                  bg-[#c6a75e]
                  text-black
                  py-2
                  rounded-lg
                  text-sm
                  font-medium
                  hover:bg-[#a67c00]
                  transition
                "
              >
                Add
              </button>
            ) : (
              <div
                className="
                  flex-1
                  flex justify-between items-center
                  bg-[#c6a75e]
                  text-black
                  px-3
                  rounded-lg
                  font-medium
                "
              >
                <button onClick={() => decrease && decrease(item.id)}>-</button>
                <span>{cartItem.qty}</span>
                <button onClick={() => increase && increase(item.id)}>+</button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* MODAL */}
      <ProductDetailsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        item={item}
      />
    </>
  );
}
