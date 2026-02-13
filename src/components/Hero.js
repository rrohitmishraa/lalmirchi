import { motion } from "framer-motion";
import heroDish from "../assets/chicken-half.webp";
import menuPDF from "../assets/menu.pdf";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] md:min-h-[95vh] flex items-center overflow-hidden">
      <div className="w-full max-w-[1500px] mx-auto px-6 md:px-16 py-16 md:py-28">
        {/* Glass Container */}
        <div
          className="
            relative
            bg-white/5
            backdrop-blur-xl
            border border-white/10
            rounded-[40px]
            shadow-[0_40px_120px_rgba(0,0,0,0.85)]
            px-6 sm:px-10 md:px-20
            py-12 md:py-24
          "
        >
          {/* Subtle Red Glow */}
          <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#7a0000] blur-[220px] opacity-25 pointer-events-none" />

          <div className="relative grid md:grid-cols-2 items-center gap-10 md:gap-16">
            {/* LEFT CONTENT */}
            <div className="space-y-6 md:space-y-8 text-left">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-white tracking-tight">
                Lal Mirchi
              </h1>

              <div className="w-16 md:w-24 h-[2px] bg-[#c6a75e]" />

              <p className="text-[#c6a75e] uppercase tracking-[0.25em] text-xs md:text-sm">
                Desi Authentic Taste of Bihar
              </p>

              <p className="text-gray-300 text-base md:text-xl max-w-lg leading-relaxed">
                From fresh ingredients to perfectly cooked home-style dishes —
                crafted daily with tradition and precision.
              </p>

              {/* DOWNLOAD BUTTON */}
              <div className="pt-2 md:pt-4">
                <a
                  href={menuPDF}
                  download="Lal-Mirchi-Menu.pdf"
                  className="
                    inline-block
                    px-6 sm:px-8
                    py-3 sm:py-4
                    rounded-full
                    bg-[#c6a75e]
                    text-black
                    font-medium
                    text-sm sm:text-base
                    hover:bg-[#a67c00]
                    transition
                    shadow-md
                  "
                >
                  Download Menu
                </a>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative flex items-center justify-center">
              <motion.img
                src={heroDish}
                alt="Featured Dish"
                className="
                  w-[260px]
                  sm:w-[380px]
                  md:w-[500px]
                  lg:w-[600px]
                  rounded-3xl
                  shadow-[0_30px_80px_rgba(0,0,0,0.9)]
                "
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
