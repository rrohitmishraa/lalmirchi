// 🔥 IMPORT ALL IMAGES HERE
import chickenThali from "../assets/menu/chicken-thali.webp";
import muttonThali from "../assets/menu/mutton-thali.webp";
import chickenHalf from "../assets/menu/chicken-half.webp";
import fullChicken from "../assets/menu/full-chicken.webp";
import muttonHalf from "../assets/menu/mutton-half.webp";
import muttonFull from "../assets/menu/mutton-full.webp";
import breadOmelette from "../assets/menu/bread-omelette.webp";
import eggKadhaiRice from "../assets/menu/egg-kadhai-rice.webp";

/* ================= IMAGE MAP ================= */

const imageMap = {
  "chicken-thali.webp": chickenThali,
  "mutton-thali.webp": muttonThali,
  "chicken-half.webp": chickenHalf,
  "full-chicken.webp": fullChicken,
  "mutton-half.webp": muttonHalf,
  "mutton-full.webp": muttonFull,
  "bread-omelette.webp": breadOmelette,
  "egg-kadhai-rice.webp": eggKadhaiRice,
};

/* ================= FETCH MENU ================= */

export const fetchMenu = async () => {
  try {
    const res = await fetch(
      "http://myjson.unlinkly.com/api/sheet/1a3VEteV5ey1cqhnrf5BCNSa7bGi8AIW9v2UlShmnjoc/Sheet1",
    );

    const json = await res.json();

    // ✅ always get array safely
    const data = Array.isArray(json) ? json : json?.data || [];

    console.log("API DATA:", data); // 🔥 debug once

    return data
      .filter((item) => item && Object.keys(item).length > 0) // remove empty rows
      .map((item, index) => ({
        id: item.id || String(index + 1), // fallback ID
        name: item.name || "",

        price:
          item.price !== undefined && item.price !== ""
            ? Number(item.price)
            : null,

        category: item.category || "",

        // ✅ default TRUE so items don’t disappear
        available:
          typeof item.available === "string"
            ? item.available.toUpperCase() === "TRUE"
            : true,

        image: item.image && imageMap[item.image] ? imageMap[item.image] : null,
      }));
  } catch (err) {
    console.error("Menu fetch failed:", err);
    return [];
  }
};
