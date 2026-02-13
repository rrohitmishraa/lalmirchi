import chickenHalf from "../assets/chicken-half.webp";
import chickenFull from "../assets/chicken-half.webp";
import chickenThali from "../assets/chicken-half.webp";
import muttonHalf from "../assets/chicken-half.webp";
import muttonFull from "../assets/chicken-half.webp";
import muttonThali from "../assets/chicken-half.webp";
import breadOmelette from "../assets/chicken-half.webp";
import eggKadhaiRice from "../assets/chicken-half.webp";

export const categories = ["All", "Thali", "Chicken", "Mutton", "Egg/Rice"];

export const menuItems = [
  {
    id: 1,
    name: "Chicken Thali",
    price: 150,
    category: "Thali",
    image: chickenThali,
    spiceLevel: 3,
    pieces: "2 Chicken Pieces",
    description: "Complete desi meal with chicken curry and traditional sides.",
    ingredients: [
      "Chicken Curry (2PC)",
      "2 Roti",
      "Chawal (Rice)",
      "Chatni",
      "Pyaaz",
      "Traditional Masala",
    ],
  },

  {
    id: 2,
    name: "Mutton Thali",
    price: 250,
    category: "Thali",
    image: muttonThali,
    spiceLevel: 4,
    pieces: "2 Mutton Pieces",
    description:
      "Authentic Bihari mutton thali with rich curry and fresh sides.",
    ingredients: [
      "Mutton Curry (2PC)",
      "2 Roti",
      "Chawal (Rice)",
      "Chatni",
      "Pyaaz",
      "Whole Garam Masala",
    ],
  },

  {
    id: 3,
    name: "Chicken Half",
    price: 199,
    category: "Chicken",
    image: chickenHalf,
    spiceLevel: 4,
    pieces: "4 Pieces",
    description:
      "Spicy desi style half chicken cooked in bold traditional masala.",
    ingredients: [
      "Chicken (4PC)",
      "Mustard Oil",
      "Red Chilli",
      "Turmeric",
      "Garam Masala",
      "Ginger Garlic",
    ],
  },

  {
    id: 4,
    name: "Full Chicken",
    price: 399,
    category: "Chicken",
    image: chickenFull,
    spiceLevel: 4,
    pieces: "8 Pieces",
    description:
      "Full portion chicken with authentic desi spices and rich flavor.",
    ingredients: [
      "Chicken (8PC)",
      "Mustard Oil",
      "Whole Spices",
      "Red Chilli",
      "Coriander Powder",
      "Garlic",
    ],
  },

  {
    id: 5,
    name: "Mutton Half",
    price: 399,
    category: "Mutton",
    image: muttonHalf,
    spiceLevel: 5,
    pieces: "4 Pieces",
    description:
      "Rich and spicy mutton cooked slowly for deep authentic flavor.",
    ingredients: [
      "Mutton (4PC)",
      "Mustard Oil",
      "Whole Garam Masala",
      "Red Chilli",
      "Onion",
      "Tomato",
    ],
  },

  {
    id: 6,
    name: "Mutton Full",
    price: 699,
    category: "Mutton",
    image: muttonFull,
    spiceLevel: 5,
    pieces: "8 Pieces",
    description:
      "Full mutton serving with bold spices and traditional Bihari taste.",
    ingredients: [
      "Mutton (8PC)",
      "Mustard Oil",
      "Black Pepper",
      "Red Chilli",
      "Whole Spices",
      "Coriander Powder",
    ],
  },

  {
    id: 7,
    name: "Bread Omelette",
    price: 80,
    category: "Egg/Rice",
    image: breadOmelette,
    spiceLevel: 2,
    pieces: "2 Eggs",
    description: "Classic roadside style bread omelette with mild desi spice.",
    ingredients: [
      "Eggs",
      "Bread",
      "Green Chilli",
      "Onion",
      "Salt",
      "Black Pepper",
    ],
  },

  {
    id: 8,
    name: "Egg Kadhai & Rice",
    price: 90,
    category: "Egg/Rice",
    image: eggKadhaiRice,
    spiceLevel: 3,
    pieces: "2 Eggs",
    description: "Spicy egg kadhai served with steamed rice and fresh masala.",
    ingredients: [
      "2 Eggs",
      "Chawal (Rice)",
      "Onion",
      "Tomato",
      "Turmeric",
      "Coriander Powder",
    ],
  },
];
