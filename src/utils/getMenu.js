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
  const res = await fetch(
    "https://opensheet.elk.sh/1a3VEteV5ey1cqhnrf5BCNSa7bGi8AIW9v2UlShmnjoc/Menu",
  );

  const data = await res.json();

  return data.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price ? Number(item.price) : null,
    category: item.category,
    available: item.available === "TRUE",

    // 🔥 MAGIC HERE
    image: item.image ? imageMap[item.image] || null : null,
  }));
};
