import { motion } from "framer-motion";

export default function FloatingCartButton({ count, total, open }) {
  return (
    <motion.button
      animate={count > 0 ? { scale: [1, 1.1, 1] } : {}}
      transition={{ repeat: Infinity, duration: 2 }}
      onClick={open}
      className="fixed bottom-6 right-6 bg-primaryRed px-5 py-3 rounded-full shadow-2xl z-50 font-bold"
    >
      🛒 {count} | ₹{total}
    </motion.button>
  );
}
