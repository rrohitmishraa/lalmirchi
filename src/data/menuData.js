import chickenThali from "../assets/menu/chicken-thali.webp";
import muttonThali from "../assets/menu/mutton-thali.webp";
import chickenHalf from "../assets/menu/chicken-half.webp";
import fullChicken from "../assets/menu/full-chicken.webp";
import muttonHalf from "../assets/menu/mutton-half.webp";
import muttonFull from "../assets/menu/mutton-full.webp";
import breadOmelette from "../assets/menu/bread-omelette.webp";
import eggKadhaiRice from "../assets/menu/egg-kadhai-rice.webp";

/* ================= CATEGORIES ================= */

export const categories = [
  "All",
  "Thali",
  "Chicken",
  "Mutton",
  "Egg",
  "Snacks",
  "Maggi",
  "Beverages",
];

/* ================= MENU ================= */

export const menuItems = [
  /* ===== THALI ===== */
  {
    id: "chicken-thali",
    name: "Chicken Curry Thali",
    price: 150,
    category: "Thali",
    tags: ["Chicken"],
    image: chickenThali,
    spiceLevel: 3,
    pieces: "2 Pieces",
    available: true,
    popular: true,
    description: "2pc chicken, 2 roti, rice, chutney, onion salad",
  },

  {
    id: "egg-thali",
    name: "Egg Curry Thali",
    price: 150,
    category: "Thali",
    tags: ["Egg"],
    spiceLevel: 2,
    pieces: "2 Eggs",
    available: true,
    description: "2 eggs, 2 roti, rice, chutney, onion salad",
  },

  {
    id: "mutton-thali",
    name: "Mutton Thali",
    price: 250,
    category: "Thali",
    tags: ["Mutton"],
    image: muttonThali,
    spiceLevel: 4,
    pieces: "2 Pieces",
    available: true,
    description: "2pc mutton, 2 roti, rice, chutney, onion salad",
  },

  /* ===== CHICKEN ===== */
  {
    id: "chicken-half",
    name: "Chicken Curry Half",
    price: 199,
    category: "Chicken",
    image: chickenHalf,
    spiceLevel: 4,
    pieces: "4 Pieces",
    available: true,
  },

  {
    id: "chicken-full",
    name: "Chicken Curry Full",
    price: 399,
    category: "Chicken",
    image: fullChicken,
    spiceLevel: 4,
    pieces: "8 Pieces",
    available: true,
    popular: true,
  },

  /* ===== MUTTON ===== */
  {
    id: "mutton-half",
    name: "Mutton Curry Half",
    price: 399,
    category: "Mutton",
    image: muttonHalf,
    spiceLevel: 5,
    pieces: "4 Pieces",
    available: true,
  },

  {
    id: "mutton-full",
    name: "Mutton Curry Full",
    price: 699,
    category: "Mutton",
    image: muttonFull,
    spiceLevel: 5,
    pieces: "8 Pieces",
    available: true,
    popular: true,
  },

  /* ===== EGG ===== */
  {
    id: "bread-omelette-double",
    name: "Bread Omelette (Double)",
    price: 99,
    category: "Egg",
    image: breadOmelette,
    spiceLevel: 2,
    pieces: "2 Eggs",
    available: true,
  },

  {
    id: "bread-omelette-single",
    name: "Bread Omelette (Single)",
    price: 80,
    category: "Egg",
    spiceLevel: 2,
    pieces: "1 Egg",
    available: true,
  },

  {
    id: "egg-fried-rice",
    name: "Egg Fried Rice",
    price: 150,
    category: "Egg",
    image: eggKadhaiRice,
    spiceLevel: 3,
    available: true,
  },

  {
    id: "boiled-egg",
    name: "Boiled Egg",
    price: 15,
    category: "Egg",
    available: true,
  },

  /* ===== MAGGI ===== */
  {
    id: "plain-maggi",
    name: "Plain Maggi",
    price: 50,
    category: "Maggi",
    available: true,
  },

  {
    id: "egg-maggi",
    name: "Egg Maggi",
    price: 80,
    category: "Maggi",
    available: true,
  },

  {
    id: "chicken-maggi",
    name: "Chicken Maggi",
    price: 99,
    category: "Maggi",
    available: true,
  },

  /* ===== SNACKS ===== */
  {
    id: "seekh-kebab",
    name: "Seekh Kebab",
    price: 80,
    category: "Snacks",
    available: true,
  },

  {
    id: "veg-sandwich",
    name: "Veg Sandwich",
    price: 50,
    category: "Snacks",
    available: true,
  },

  {
    id: "paneer-sandwich",
    name: "Paneer Sandwich",
    price: 50,
    category: "Snacks",
    available: true,
  },

  /* ===== BEVERAGES ===== */
  {
    id: "chai",
    name: "Adrak / Ilaichi Chai",
    price: 20,
    category: "Beverages",
    available: true,
  },

  {
    id: "chaach",
    name: "Chaach",
    price: 30,
    category: "Beverages",
    available: true,
  },

  {
    id: "cold-drinks",
    name: "Cold Drinks",
    price: null,
    category: "Beverages",
    available: true,
  },
];
