import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetailsModal({ isOpen, onClose, item }) {
  return (
    <AnimatePresence>
      {isOpen && item && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />

          {/* Center Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.3 }}
              className="
                pointer-events-auto
                w-full
                max-w-lg
                bg-white/5
                backdrop-blur-xl
                border border-white/10
                rounded-[40px]
                p-8 md:p-10
                shadow-[0_40px_120px_rgba(0,0,0,0.9)]
              "
            >
              {/* TITLE */}
              <h3 className="text-2xl md:text-3xl font-semibold text-[#c6a75e] mb-6">
                {item.name}
              </h3>

              {/* PIECES */}
              <p className="text-gray-400 mb-4">
                Pieces per order:{" "}
                <span className="text-white font-medium">{item.pieces}</span>
              </p>

              {/* SPICE LEVEL */}
              <p className="text-gray-400 mb-2">Spice Level:</p>

              <div className="flex gap-2 mb-6 text-[#b11212] text-lg">
                {Array.from({ length: item.spiceLevel }).map((_, i) => (
                  <span key={i}>🔥</span>
                ))}
              </div>

              {/* INGREDIENTS */}
              <p className="text-gray-400 mb-2">Ingredients:</p>

              <ul className="list-disc list-inside text-gray-300 space-y-1 mb-8">
                {item.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>

              {/* CLOSE BUTTON */}
              <button
                onClick={onClose}
                className="
                  w-full
                  py-3
                  rounded-full
                  bg-[#c6a75e]
                  text-black
                  font-medium
                  hover:bg-[#a67c00]
                  transition
                "
              >
                Close
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
