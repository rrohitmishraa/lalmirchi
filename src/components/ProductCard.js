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

  return (
    <>
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="
          group relative
          rounded-[40px]
          overflow-hidden
          bg-white/5
          backdrop-blur-lg
          border border-white/10
          shadow-[0_25px_60px_rgba(0,0,0,0.8)]
          transition
        "
      >
        {/* IMAGE */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="
              w-full h-full object-cover
              transition duration-700
              group-hover:scale-110
            "
          />

          {/* Luxury Dark Fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Buttons */}
          <div className="absolute bottom-5 left-5 right-5 flex gap-3">
            {/* Details */}
            <button
              onClick={() => setIsOpen(true)}
              className="
                flex-1
                bg-white/10
                border border-white/20
                backdrop-blur-md
                py-2
                rounded-xl
                text-sm
                hover:bg-white/20
                transition
              "
            >
              Details
            </button>

            {/* Cart Controls */}
            {!cartItem ? (
              <button
                onClick={() => addToCart(item)}
                className="
                  flex-1
                  bg-[#c6a75e]
                  text-black
                  py-2
                  rounded-xl
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
                px-4
                rounded-xl
                font-medium
              "
              >
                <button onClick={() => decrease(item.id)}>-</button>
                <span>{cartItem.qty}</span>
                <button onClick={() => increase(item.id)}>+</button>
              </div>
            )}
          </div>
        </div>

        {/* INFO */}
        <div className="p-6 space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-lg md:text-xl font-semibold text-white">
              {item.name}
            </h4>

            <span className="text-[#c6a75e] font-semibold text-lg">
              ₹{item.price}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>{item.pieces}</span>

            <span className="flex gap-1 text-[#b11212]">
              {Array.from({ length: item.spiceLevel }).map((_, i) => (
                <span key={i}>🔥</span>
              ))}
            </span>
          </div>
        </div>
      </motion.div>

      <ProductDetailsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        item={item}
      />
    </>
  );
}
