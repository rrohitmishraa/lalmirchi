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
      "https://myjson.unlinkly.com/api/sheet/1a3VEteV5ey1cqhnrf5BCNSa7bGi8AIW9v2UlShmnjoc/Sheet1?t=" +
        Date.now(),
      { cache: "no-store" },
    );

    const text = await res.text();

    let json;
    try {
      json = JSON.parse(text);
    } catch (e) {
      console.error("❌ Invalid JSON:", text);
      return [];
    }

    // ✅ handle both formats
    const data = Array.isArray(json) ? json : json?.data || [];

    return (
      data
        // 🔥 remove garbage rows
        .filter(
          (item) =>
            item &&
            typeof item === "object" &&
            Object.values(item).some((v) => v !== "" && v !== null),
        )
        .map((item, index) => {
          // 🔥 normalize keys (because your API LOVES being inconsistent)
          const name = item.name || item["name "] || "";
          const price = item.price ?? item["price "] ?? "";
          const category = item.category || "";
          const available = item.available ?? "TRUE";
          const imageKey = item.image || "";

          return {
            id: item.id ? String(item.id) : String(index + 1),

            name: String(name).trim(),

            price:
              price !== "" && price !== null && !isNaN(price)
                ? Number(price)
                : null,

            category: String(category).trim(),

            available:
              typeof available === "string"
                ? available.toUpperCase() === "TRUE"
                : Boolean(available),

            image: imageKey && imageMap[imageKey] ? imageMap[imageKey] : null,
          };
        })
    );
  } catch (err) {
    console.error("🔥 Menu fetch failed:", err);
    return [];
  }
};
