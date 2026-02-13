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
      `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black z-40"
          />

          <motion.div
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.2, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-28 right-8 w-[90vw] max-w-[420px] bg-[#141414] border border-[#222] rounded-3xl p-6 z-50 max-h-[70vh] overflow-y-auto"
          >
            <h2 className="text-xl font-bold text-[#dfa258] mb-4">
              Your Order
            </h2>

            {cart.length === 0 ? (
              <p className="text-gray-400">Cart is empty.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="mb-4 border-b border-[#222] pb-3"
                  >
                    <div className="flex justify-between">
                      <p>{item.name}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex justify-between mt-2">
                      <div className="flex gap-3">
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

                <p className="text-lg font-semibold mb-4">Total: ₹{total}</p>

                <button
                  onClick={order}
                  className="w-full bg-[#9a1e02] py-2 rounded-lg"
                >
                  Order on WhatsApp
                </button>

                <button
                  onClick={clearCart}
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
