import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import heroImage from "../assets/chicken-half.webp";
import menuPDF from "../assets/menu.pdf";

export default function Hero() {
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(0);

  // Lock height once to prevent mobile UI jump
  useEffect(() => {
    setVh(window.innerHeight);
  }, []);

  /* ================= PARALLAX ================= */

  const textY = useTransform(scrollY, [0, 400], [0, -35]);
  const outerY = useTransform(scrollY, [0, 400], [0, 35]);
  const innerY = useTransform(scrollY, [0, 400], [0, 20]);
  const centerY = useTransform(scrollY, [0, 400], [0, 10]);

  return (
    <section
      style={{ height: vh || "100vh" }}
      className="relative w-full overflow-hidden bg-[#0c0c0c] md:pt-16 flex flex-col"
    >
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2a0000] via-[#3a0000] to-[#0c0c0c]" />

      {/* Smooth Blend To Next Section */}
      <div className="absolute bottom-0 left-0 w-full h-[55%] bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/70 to-transparent pointer-events-none" />

      {/* ================= TEXT SECTION ================= */}
      <motion.div
        style={{ y: textY }}
        className="relative z-20 px-6 pt-24 md:pt-20"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight"
          >
            More flavour,
            <span className="text-[#c6a75e]"> less waiting</span>
            <br />
            Get your taste back
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto"
          >
            Authentic Bihari dishes cooked daily with bold spices and zero
            shortcuts.
          </motion.p>

          <motion.a
            href={menuPDF}
            download="Lal-Mirchi-Menu.pdf"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-8 inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-[#c6a75e] text-black font-medium hover:bg-[#a67c00] transition"
          >
            Download Menu
          </motion.a>
        </div>
      </motion.div>

      {/* ================= IMAGES ================= */}
      <div className="relative z-10 mt-16 pb-16">
        {/* ================= DESKTOP (md+) ================= */}
        <div
          className="hidden md:flex justify-center items-end gap-10 px-4"
          style={{ perspective: "1600px" }}
        >
          {/* LEFT OUTER */}
          <motion.div
            style={{ y: outerY }}
            initial={{ rotateY: 35 }}
            className="hidden lg:block"
          >
            <img
              src={heroImage}
              alt=""
              aria-hidden="true"
              className="w-[240px] xl:w-[300px] rounded-3xl opacity-40"
            />
          </motion.div>

          {/* LEFT INNER */}
          <motion.div style={{ y: innerY }} initial={{ rotateY: 20 }}>
            <img
              src={heroImage}
              alt=""
              aria-hidden="true"
              className="w-[190px] md:w-[260px] rounded-3xl opacity-70"
            />
          </motion.div>

          {/* CENTER */}
          <motion.div style={{ y: centerY }} whileHover={{ scale: 1.03 }}>
            <img
              src={heroImage}
              alt=""
              aria-hidden="true"
              className="w-[230px] md:w-[380px] rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
            />
          </motion.div>

          {/* RIGHT INNER */}
          <motion.div style={{ y: innerY }} initial={{ rotateY: -20 }}>
            <img
              src={heroImage}
              alt=""
              aria-hidden="true"
              className="w-[190px] md:w-[260px] rounded-3xl opacity-70"
            />
          </motion.div>

          {/* RIGHT OUTER */}
          <motion.div
            style={{ y: outerY }}
            initial={{ rotateY: -35 }}
            className="hidden lg:block"
          >
            <img
              src={heroImage}
              alt=""
              aria-hidden="true"
              className="w-[240px] xl:w-[300px] rounded-3xl opacity-40"
            />
          </motion.div>
        </div>

        {/* ================= MOBILE (< md) ================= */}
        <div className="md:hidden relative flex justify-center items-center mt-8 h-[320px]">
          {/* LEFT BEHIND */}
          <motion.img
            src={heroImage}
            alt=""
            aria-hidden="true"
            initial={{ rotate: -10, x: -65 }}
            className="absolute w-[170px] rounded-3xl opacity-75"
            style={{ y: innerY, scale: 0.95 }}
          />

          {/* RIGHT BEHIND */}
          <motion.img
            src={heroImage}
            alt=""
            aria-hidden="true"
            initial={{ rotate: 10, x: 65 }}
            className="absolute w-[170px] rounded-3xl opacity-75"
            style={{ y: innerY, scale: 0.95 }}
          />

          {/* CENTER FRONT */}
          <motion.img
            src={heroImage}
            alt=""
            aria-hidden="true"
            className="relative w-[210px] rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.9)] z-10"
            style={{ y: centerY }}
          />
        </div>
      </div>
    </section>
  );
}
