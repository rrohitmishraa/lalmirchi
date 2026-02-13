import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function CartButton({ count, total, onClick }) {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="
        fixed bottom-8 right-8
        bg-[#9a1e02]
        hover:bg-[#7e1801]
        px-6 py-4
        rounded-full
        z-50
        font-bold
        flex items-center gap-3
      "
    >
      {/* Cart Icon */}
      <span className="text-lg">🛒</span>

      {/* Count Bubble */}
      <motion.span
        key={count}
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
        className="
          bg-[#dfa258]
          text-black
          text-xs
          font-bold
          px-2 py-1
          rounded-full
        "
      >
        {count}
      </motion.span>

      {/* Divider */}
      <span className="opacity-40">|</span>

      {/* Animated Total */}
      <span className="text-[#dfa258] font-semibold">
        ₹
        <CountUp
          end={total}
          duration={0.4}
          separator=","
          preserveValue={true}
        />
      </span>
    </motion.button>
  );
}
