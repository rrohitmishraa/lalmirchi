import { motion } from "framer-motion";

export default function CartButton({ totalItems, totalPrice, openCart }) {
  if (!totalItems) return null;

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={openCart}
      className="hidden md:flex fixed bottom-8 right-8 bg-[#c6a75e] text-black px-6 py-4 rounded-full font-medium shadow-xl z-50"
    >
      🛒 {totalItems} | ₹{totalPrice}
    </motion.button>
  );
}
