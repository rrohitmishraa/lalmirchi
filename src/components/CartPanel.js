import { motion, AnimatePresence } from "framer-motion";

export default function CartPanel({
  isOpen,
  setIsOpen,
  cart,
  increase,
  decrease,
  removeItem,
  clearCart,
  total,
}) {
  const order = () => {
    if (!cart.length) return;

    let message = "Hi, I want to order:\n\n";
    cart.forEach((item, i) => {
      message += `${i + 1}. ${item.name} x${item.qty} - ₹${
        item.price * item.qty
      }\n`;
    });
    message += `\nTotal: ₹${total}\nPickup time:`;

    window.open(
      `https://wa.me/918826678324?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black backdrop-blur-sm z-40"
          />

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
          >
            <div className="w-full max-w-[500px] max-h-[80vh] overflow-y-auto bg-[#141414] border border-[#222] rounded-3xl p-6 shadow-[0_40px_120px_rgba(0,0,0,0.9)]">
              {/* HEADER */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#dfa258]">
                  Your Order
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-400 text-center py-10">
                  Cart is empty.
                </p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="mb-4 border-b border-[#222] pb-4"
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-medium">{item.name}</p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 text-sm hover:opacity-80"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center gap-4 bg-[#1c1c1c] px-3 py-1 rounded-lg">
                          <button onClick={() => decrease(item.id)}>-</button>
                          <span>{item.qty}</span>
                          <button onClick={() => increase(item.id)}>+</button>
                        </div>

                        <span className="text-[#dfa258] font-semibold">
                          ₹{item.price * item.qty}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* TOTAL */}
                  <div className="flex justify-between items-center mt-6 mb-6">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-xl font-bold text-[#dfa258]">
                      ₹{total}
                    </span>
                  </div>

                  {/* ACTIONS */}
                  <button
                    onClick={order}
                    className="w-full bg-[#9a1e02] hover:bg-[#7a1601] transition py-3 rounded-xl font-medium"
                  >
                    Order on WhatsApp
                  </button>

                  <button
                    onClick={clearCart}
                    className="mt-3 w-full text-gray-400 text-sm hover:text-white transition"
                  >
                    Clear Cart
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
