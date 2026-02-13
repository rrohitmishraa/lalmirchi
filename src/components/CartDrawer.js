import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer({
  cart,
  isOpen,
  close,
  increase,
  decrease,
  clear,
  total,
  order,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Expanding Cart Panel */}
          <motion.div
            initial={{
              scale: 0.2,
              opacity: 0,
              y: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: -20,
            }}
            exit={{
              scale: 0.2,
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            style={{
              transformOrigin: "bottom right",
            }}
            className="
              fixed bottom-24 right-6
              w-[90vw] max-w-[400px]
              bg-white/5 backdrop-blur-xl
              border border-white/10
              shadow-[0_0_40px_rgba(225,6,0,0.3)]
              rounded-2xl p-6
              z-50
              max-h-[70vh]
              overflow-y-auto
            "
          >
            <h2 className="text-xl font-bold text-primaryRed mb-4">
              Your Order
            </h2>

            {cart.length === 0 ? (
              <p className="text-gray-400">Cart is empty.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center mb-4"
                  >
                    <div>
                      <p>{item.name}</p>
                      <p className="text-primaryRed font-semibold">
                        ₹{item.price * item.qty}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decrease(item.id)}
                        className="px-3 py-1 bg-gray-700 rounded-lg"
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => increase(item.id)}
                        className="px-3 py-1 bg-gray-700 rounded-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}

                <div className="border-t border-gray-700 pt-4 mt-4">
                  <p className="text-lg font-semibold">Total: ₹{total}</p>
                </div>

                <button
                  onClick={order}
                  className="mt-4 w-full bg-primaryRed py-2 rounded-lg"
                >
                  Order on WhatsApp
                </button>

                <button
                  onClick={clear}
                  className="mt-2 w-full text-gray-400 text-sm"
                >
                  Clear Cart
                </button>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
