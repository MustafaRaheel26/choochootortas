export type Ingredient = string;

export interface Extra {
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  ingredients: Ingredient[];
  extras: Extra[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image?: string;
}

export const CATEGORIES: Category[] = [
  { id: "tortas", name: "Tortas", icon: "🥖", image: "https://picsum.photos/seed/cat-tortas/400/400" },
  { id: "tortas-special", name: "Torta Special", icon: "🍱", image: "https://picsum.photos/seed/cat-special/400/400" },
  { id: "tacos", name: "Tacos", icon: "🌮", image: "https://picsum.photos/seed/cat-tacos/400/400" },
  { id: "burritos", name: "Burritos", icon: "🌯", image: "https://picsum.photos/seed/cat-burritos/400/400" },
  { id: "nachos-superfries", name: "Nachos & Superfries", icon: "🍟", image: "https://picsum.photos/seed/cat-nachos/400/400" },
  { id: "platillos", name: "Platillos", icon: "🍽️", image: "https://picsum.photos/seed/cat-platillos/400/400" },
  { id: "main-dishes", name: "Main Dishes", icon: "🍱", image: "https://picsum.photos/seed/cat-main/400/400" },
  { id: "antojitos", name: "Antojitos", icon: "🥙", image: "https://picsum.photos/seed/cat-anto/400/400" },
  { id: "drinks", name: "Drinks", icon: "🥤", image: "https://picsum.photos/seed/cat-drinks/400/400" },
  { id: "slushies-fruitcakes", name: "Slushies & Fruit Cakes", icon: "🍧", image: "https://picsum.photos/seed/cat-slush/400/400" },
  { id: "desserts", name: "Desserts", icon: "🍰", image: "https://picsum.photos/seed/cat-desserts/400/400" },
];

export const MENU_ITEMS: MenuItem[] = [
  // Tortas
  {
    id: "torta-chicken",
    category: "tortas",
    name: "Torta Chicken",
    description: "Traditional Mexican sandwich with chicken.",
    price: 11.95,
    image: "https://picsum.photos/seed/tortachicken/600/400",
    ingredients: ["Mayo", "Cheese", "Tomatoes", "Beans", "Lettuce", "Onions", "Avocado", "Jalapeño"],
    extras: [
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "torta-carnitas",
    category: "tortas",
    name: "Torta Carnitas",
    description: "Slow-cooked pork carnitas sandwich.",
    price: 11.95,
    image: "https://picsum.photos/seed/tortacarnitas/600/400",
    ingredients: ["Mayo", "Cheese", "Tomatoes", "Beans", "Lettuce", "Onions", "Avocado", "Jalapeño"],
    extras: [
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "torta-pastor",
    category: "tortas",
    name: "Torta Pastor",
    description: "Marinated pork with pineapple.",
    price: 11.95,
    image: "https://picsum.photos/seed/tortapastor/600/400",
    ingredients: ["Mayo", "Cheese", "Tomatoes", "Beans", "Lettuce", "Onions", "Avocado", "Jalapeño"],
    extras: [
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "torta-pierna",
    category: "tortas",
    name: "Torta Pierna",
    description: "Traditional roasted pork leg sandwich.",
    price: 11.95,
    image: "https://picsum.photos/seed/tortapierna/600/400",
    ingredients: ["Mayo", "Cheese", "Tomatoes", "Beans", "Lettuce", "Onions", "Avocado", "Jalapeño"],
    extras: [
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "torta-asada",
    category: "tortas",
    name: "Torta Carne Asada",
    description: "Grilled steak sandwich.",
    price: 11.95,
    image: "https://picsum.photos/seed/tortaasada/600/400",
    ingredients: ["Mayo", "Cheese", "Tomatoes", "Beans", "Lettuce", "Onions", "Avocado", "Jalapeño"],
    extras: [
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "torta-tamal",
    category: "tortas",
    name: "Torta Tamal",
    description: "Unique tamal-filled Mexican sandwich.",
    price: 11.95,
    image: "https://picsum.photos/seed/tortatamal/600/400",
    ingredients: ["Mayo", "Cheese", "Tomatoes", "Beans", "Lettuce", "Onions", "Avocado", "Jalapeño"],
    extras: [
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "torta-lengua",
    category: "tortas",
    name: "Torta Lengua",
    description: "Tender beef tongue sandwich.",
    price: 12.95,
    image: "https://picsum.photos/seed/tortalengua/600/400",
    ingredients: ["Mayo", "Cheese", "Tomatoes", "Beans", "Lettuce", "Onions", "Avocado", "Jalapeño"],
    extras: [
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  
  // Torta Special
  {
    id: "torta-cubana",
    category: "tortas-special",
    name: "Torta Cubana",
    description: "Traditional Cuban preparation.",
    price: 14.95,
    image: "https://picsum.photos/seed/tcubana/600/400",
    ingredients: ["Ham", "Milanesa", "Marinated Pork", "Sausage"],
    extras: [
      { name: "Extra cheese", price: 1.00 },
      { name: "Extra Lettuce", price: 1.00 },
      { name: "Extra Avocado", price: 1.00 },
      { name: "Extra Tomatoes", price: 1.00 },
      { name: "Extra Eggs", price: 2.00 }
    ]
  },
  {
    id: "torta-hawaiian",
    category: "tortas-special",
    name: "Torta Hawaiian",
    description: "Tropical Ham and Pineapple combo.",
    price: 13.95,
    image: "https://picsum.photos/seed/thawa/600/400",
    ingredients: ["Ham", "Pineapple", "Bacon"],
    extras: [
      { name: "Extra cheese", price: 1.00 },
      { name: "Extra Lettuce", price: 1.00 },
      { name: "Extra Avocado", price: 1.00 },
      { name: "Extra Tomatoes", price: 1.00 },
      { name: "Extra Eggs", price: 2.00 }
    ]
  },
  {
    id: "torta-alambre",
    category: "tortas-special",
    name: "Torta Alambre",
    description: "Sizzling meat with peppers and cheese.",
    price: 13.95,
    image: "https://picsum.photos/seed/talam/600/400",
    ingredients: ["Chicken", "Steak", "Onions", "Bell Peppers", "Cheese"],
    extras: [
      { name: "Extra cheese", price: 1.00 },
      { name: "Extra Lettuce", price: 1.00 },
      { name: "Extra Avocado", price: 1.00 },
      { name: "Extra Tomatoes", price: 1.00 },
      { name: "Extra Eggs", price: 2.00 }
    ]
  },
  {
    id: "torta-ahogada",
    category: "tortas-special",
    name: "Torta Ahogada",
    description: "Drowned in spicy hot salsa.",
    price: 13.95,
    image: "https://picsum.photos/seed/tahog/600/400",
    ingredients: ["Carnitas", "Hot Spicy Salsa", "Pickled Onions"],
    extras: [
      { name: "Extra Sauce", price: 2.00 }
    ]
  },
  {
    id: "torta-milanesa",
    category: "tortas-special",
    name: "Torta Milanesa",
    description: "Delicious breaded beef fillet.",
    price: 13.95,
    image: "https://picsum.photos/seed/tmila/600/400",
    ingredients: ["Breaded Beef"],
    extras: [
      { name: "Extra cheese", price: 1.00 },
      { name: "Extra Lettuce", price: 1.00 },
      { name: "Extra Avocado", price: 1.00 },
      { name: "Extra Tomatoes", price: 1.00 },
      { name: "Extra Eggs", price: 2.00 }
    ]
  },
  {
    id: "torta-campechana",
    category: "tortas-special",
    name: "Torta Campechana",
    description: "Traditional mixed meat Torta.",
    price: 13.95,
    image: "https://picsum.photos/seed/tcamp/600/400",
    ingredients: ["Steak", "Chorizo", "Cheese"],
    extras: [
      { name: "Extra cheese", price: 1.00 },
      { name: "Extra Lettuce", price: 1.00 },
      { name: "Extra Avocado", price: 1.00 },
      { name: "Extra Tomatoes", price: 1.00 },
      { name: "Extra Eggs", price: 2.00 }
    ]
  },
  {
    id: "torta-ranchera",
    category: "tortas-special",
    name: "Torta Ranchera",
    description: "Spicy ranch-style grilled meat.",
    price: 13.95,
    image: "https://picsum.photos/seed/tranch/600/400",
    ingredients: ["Steak", "Ranchero Sauce", "Onions", "Mushrooms"],
    extras: [
      { name: "Extra cheese", price: 1.00 },
      { name: "Extra Lettuce", price: 1.00 },
      { name: "Extra Avocado", price: 1.00 },
      { name: "Extra Tomatoes", price: 1.00 },
      { name: "Extra Eggs", price: 2.00 }
    ]
  },

  // Tacos
  {
    id: "4-street-tacos",
    category: "tacos",
    name: "4 Street Tacos",
    description: "Cilantro, onions, limes, radish. Choice Of Meat",
    price: 11.95,
    image: "https://picsum.photos/seed/tacosst/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 },
      { name: "Shredded Beef", price: 0 },
      { name: "Pork", price: 0 },
      { name: "Chicken", price: 0 },
      { name: "Ground Beef", price: 0 },
      { name: "Beef Tongue", price: 1.00 },
      { name: "Pastor", price: 0 },
      { name: "Asada", price: 0 },
      { name: "Cheese", price: 0 }
    ]
  },
  {
    id: "alambre-taco",
    category: "tacos",
    name: "Alambre Taco",
    description: "(3) Carne Asada, Bell Peppers, Onions, and Cheese",
    price: 17.95,
    image: "https://picsum.photos/seed/alambretaco/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "campechano-tacos",
    category: "tacos",
    name: "Campechano Tacos",
    description: "(3) Carne Asada, Spicy Sausage, Cactus, Onion, Jalapeño Slices",
    price: 17.95,
    image: "https://picsum.photos/seed/campetacos/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "ranchero-tacos",
    category: "tacos",
    name: "Ranchero Tacos",
    description: "(3) Carne Asada, Tomatoes, Onions, Serrano Chile",
    price: 17.95,
    image: "https://picsum.photos/seed/ranchtacos/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "quesabirria",
    category: "tacos",
    name: "QuesaBirria",
    description: "3 Corn Tortilla Tacos, Shredded Beef and Cheese, Consome, Onions, Cilantro, Rice and Beans, Corn",
    price: 17.95,
    image: "https://picsum.photos/seed/quesab/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 },
      { name: "Corn Tortilla", price: 0 },
      { name: "Flour Tortilla", price: 0 }
    ]
  },
  {
    id: "fish-taco",
    category: "tacos",
    name: "Fish Taco",
    description: "(3) Tilapia, Cabbage, Pico de Gallo, and Tartar Sauce",
    price: 18.95,
    image: "https://picsum.photos/seed/fishtaco/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "shell-tacos-2",
    category: "tacos",
    name: "Shell Tacos (2)",
    description: "2 Shell Tacos - Ground Beef",
    price: 9.95,
    image: "https://picsum.photos/seed/shelltaco2/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "shell-tacos-3",
    category: "tacos",
    name: "Shell Tacos (3)",
    description: "3 Shell tacos - Ground Beef",
    price: 11.95,
    image: "https://picsum.photos/seed/shelltaco3/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "tacos-camaron-3",
    category: "tacos",
    name: "Tacos Camaron (3)",
    description: "Three succulent shrimp tacos.",
    price: 18.95,
    image: "https://picsum.photos/seed/camarontacos/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "tambaso",
    category: "tacos",
    name: "Tambaso",
    description: "A specialty dish with unique flavor.",
    price: 11.95,
    image: "https://picsum.photos/seed/tambaso/600/400",
    ingredients: [],
    extras: []
  },
  {
    id: "chilaquiles",
    category: "tacos",
    name: "Chilaquiles",
    description: "Classic breakfast or dinner dish with fried tortillas and salsa.",
    price: 21.95,
    image: "https://picsum.photos/seed/chilaquiles/600/400",
    ingredients: [],
    extras: []
  },

  // Burritos
  {
    id: "regular-burrito",
    category: "burritos",
    name: "Regular Burrito",
    description: "Cilantro, Onions, Rice and Beans",
    price: 11.95,
    image: "https://picsum.photos/seed/burritoreg/600/400",
    ingredients: ["Cilantro", "Onions", "Rice", "Beans"],
    extras: [
      { name: "Steak", price: 0 },
      { name: "Chicken", price: 0 },
      { name: "Pastor", price: 0 },
      { name: "Ground Beef", price: 0 },
      { name: "Birria", price: 0 }
    ]
  },
  {
    id: "choo-choo-burrito",
    category: "burritos",
    name: "Choo Choo Burrito",
    description: "Red or Green Sauce, Cheese, Lettuce, Sour Cream, Rice and Beans",
    price: 16.95,
    image: "https://picsum.photos/seed/ccburrito/600/400",
    ingredients: ["Cheese", "Lettuce", "Sour Cream", "Rice", "Beans"],
    extras: [
      { name: "Extra Sauce", price: 2.00 },
      { name: "Chicken", price: 0 },
      { name: "Steak", price: 0 },
      { name: "Carnitas", price: 0 },
      { name: "Green Sauce", price: 0 },
      { name: "Red Sauce", price: 0 }
    ]
  },
  {
    id: "alambre-burrito",
    category: "burritos",
    name: "Alambre Burrito",
    description: "Chicken or Steak, Bell Peppers, Onions, Rice and Beans",
    price: 14.95,
    image: "https://picsum.photos/seed/alambreb/600/400",
    ingredients: ["Bell Peppers", "Onions", "Rice", "Beans"],
    extras: [
      { name: "Chicken", price: 0 },
      { name: "Steak", price: 0 }
    ]
  },
  {
    id: "campechano-burrito",
    category: "burritos",
    name: "Campechano Burrito",
    description: "Carne Asada Spicy Sausage, Jalapeño Slices, Onion, Nopales, Rice and Beans",
    price: 14.95,
    image: "https://picsum.photos/seed/campburrito/600/400",
    ingredients: ["Carne Asada", "Spicy Sausage", "Jalapeño Slices", "Onion", "Nopales", "Rice", "Beans"],
    extras: []
  },
  {
    id: "burrito-lengua",
    category: "burritos",
    name: "Burrito Lengua",
    description: "Beef Tongue, Rice, Beans, Cheese, Cilantro, Onions",
    price: 14.95,
    image: "https://picsum.photos/seed/lenguaburrito/600/400",
    ingredients: ["Beef Tongue", "Rice", "Beans", "Cheese", "Cilantro", "Onions"],
    extras: []
  },
  {
    id: "supreme-burrito",
    category: "burritos",
    name: "Supreme Burrito",
    description: "Chicken or Ground Beef, Lettuce, Cheese, Sour Cream, Rice and Beans",
    price: 14.95,
    image: "https://picsum.photos/seed/supremeb/600/400",
    ingredients: ["Lettuce", "Cheese", "Sour Cream", "Rice", "Beans"],
    extras: [
      { name: "Chicken", price: 0 },
      { name: "Ground Beef", price: 0 }
    ]
  },
  {
    id: "chorizo-huevos-burrito",
    category: "burritos",
    name: "Chorizo con Huevos Burrito",
    description: "Chorizo, Eggs, Rice, Beans, Cilantro, Onions",
    price: 14.95,
    image: "https://picsum.photos/seed/chorizob/600/400",
    ingredients: ["Chorizo", "Eggs", "Rice", "Beans", "Cilantro", "Onions"],
    extras: []
  },
  {
    id: "californian-burrito",
    category: "burritos",
    name: "Californian Burrito",
    description: "Carne Asada, French Fries, Pico de Gallo, Cheese, Guacamole",
    price: 14.95,
    image: "https://picsum.photos/seed/calib/600/400",
    ingredients: ["Carne Asada", "French Fries", "Pico de Gallo", "Cheese", "Guacamole"],
    extras: []
  },
  {
    id: "veggie-burrito",
    category: "burritos",
    name: "Veggie Burrito",
    description: "Rice, Beans, Pico de Gallo, Cheese, Sour Cream",
    price: 12.95,
    image: "https://picsum.photos/seed/vburrito/600/400",
    ingredients: ["Rice", "Beans", "Pico de Gallo", "Cheese", "Sour Cream"],
    extras: []
  },
  {
    id: "burrito-chicken-chipotle",
    category: "burritos",
    name: "Burrito Chicken Chipotle",
    description: "Grilled chicken with smoky chipotle sauce.",
    price: 14.95,
    image: "https://picsum.photos/seed/chipotleb/600/400",
    ingredients: ["Chicken", "Chipotle Sauce"],
    extras: []
  },
  {
    id: "burrito-camaron",
    category: "burritos",
    name: "Burrito Camaron",
    description: "Delicious shrimp burrito with fresh ingredients.",
    price: 18.95,
    image: "https://picsum.photos/seed/shrimpburrito/600/400",
    ingredients: ["Shrimp"],
    extras: []
  },

  // Nachos & Superfries
  {
    id: "nachos",
    category: "nachos-superfries",
    name: "Nachos",
    description: "Choice of Meat, Beans, Cheese, Pico de Gallo, Sour Cream, and Guacamole",
    price: 16.95,
    image: "https://picsum.photos/seed/nachos/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Shredded Beef", price: 0 },
      { name: "Pork", price: 0 },
      { name: "Chicken", price: 0 },
      { name: "Ground Beef", price: 0 },
      { name: "Beef Tongue", price: 1.00 },
      { name: "Pastor", price: 0 },
      { name: "Asada", price: 0 },
      { name: "Cheese", price: 0 },
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "super-fries",
    category: "nachos-superfries",
    name: "Super Fries",
    description: "Carne Asada, Cheese, Fries, Beans, Sour Cream, Guacamole, and Pico de Gallo",
    price: 16.95,
    image: "https://picsum.photos/seed/superfries/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },

  // Main Dishes
  {
    id: "huarache",
    category: "main-dishes",
    name: "Huarache",
    description: "Large tortilla, steak, onions, cactus, lettuce, cream cheese, and tomatoes.",
    price: 16.95,
    image: "https://picsum.photos/seed/huarache/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "chicken-taquitos",
    category: "main-dishes",
    name: "Chicken Taquitos (3)",
    description: "Flautas served with rice and beans, lettuce, sour cream, Mexican cheese, and tomatoes.",
    price: 14.95,
    image: "https://picsum.photos/seed/taquitos/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "quesadilla",
    category: "main-dishes",
    name: "Quesadilla",
    description: "Choice of Meat, sour cream, and guacamole.",
    price: 14.95,
    image: "https://picsum.photos/seed/quesad/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Shredded Beef", price: 0 },
      { name: "Pork", price: 0 },
      { name: "Chicken", price: 0 },
      { name: "Ground Beef", price: 0 },
      { name: "Beef Tongue", price: 1.00 },
      { name: "Pastor", price: 0 },
      { name: "Asada", price: 0 },
      { name: "Cheese", price: 0 },
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "taco-salad",
    category: "main-dishes",
    name: "Taco Salad",
    description: "Choice of Meat, lettuce, cheese, pico de gallo, beans, and sour cream.",
    price: 14.95,
    image: "https://picsum.photos/seed/tsalad/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Shredded Beef", price: 0 },
      { name: "Pork", price: 0 },
      { name: "Chicken", price: 0 },
      { name: "Ground Beef", price: 0 },
      { name: "Beef Tongue", price: 1.00 },
      { name: "Pastor", price: 0 },
      { name: "Asada", price: 0 },
      { name: "Cheese", price: 0 },
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "two-sopes",
    category: "main-dishes",
    name: "Two Sopes",
    description: "Choice of Meat, rice and beans, lettuce, cheese, sour cream, and tomatoes.",
    price: 15.95,
    image: "https://picsum.photos/seed/sopes/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Shredded Beef", price: 0 },
      { name: "Pork", price: 0 },
      { name: "Chicken", price: 0 },
      { name: "Ground Beef", price: 0 },
      { name: "Beef Tongue", price: 1.00 },
      { name: "Pastor", price: 0 },
      { name: "Asada", price: 0 },
      { name: "Cheese", price: 0 },
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "two-tostadas",
    category: "main-dishes",
    name: "Two Tostadas",
    description: "Choice of Meat, lettuce, beans, cheese, sour cream, onions.",
    price: 14.95,
    image: "https://picsum.photos/seed/tostadas/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Shredded Beef", price: 0 },
      { name: "Pork", price: 0 },
      { name: "Chicken", price: 0 },
      { name: "Ground Beef", price: 0 },
      { name: "Beef Tongue", price: 1.00 },
      { name: "Pastor", price: 0 },
      { name: "Asada", price: 0 },
      { name: "Cheese", price: 0 },
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "enchiladas",
    category: "main-dishes",
    name: "Enchiladas",
    description: "(3) Choice of Meat, rice and beans, lettuce, and sour cream.",
    price: 15.95,
    image: "https://picsum.photos/seed/enchiladas/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Shredded Beef", price: 0 },
      { name: "Pork", price: 0 },
      { name: "Chicken", price: 0 },
      { name: "Ground Beef", price: 0 },
      { name: "Beef Tongue", price: 1.00 },
      { name: "Pastor", price: 0 },
      { name: "Asada", price: 0 },
      { name: "Cheese", price: 0 },
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "chimichanga",
    category: "main-dishes",
    name: "Chimichanga",
    description: "Fried burrito served with rice and beans, lettuce, tomatoes, Mexican cheese, sour cream.",
    price: 15.95,
    image: "https://picsum.photos/seed/chimichanga/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Shredded Beef", price: 0 },
      { name: "Pork", price: 0 },
      { name: "Chicken", price: 0 },
      { name: "Ground Beef", price: 0 },
      { name: "Beef Tongue", price: 1.00 },
      { name: "Pastor", price: 0 },
      { name: "Asada", price: 0 },
      { name: "Cheese", price: 0 },
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "taco-meal",
    category: "main-dishes",
    name: "Taco Meal (3 Street Tacos)",
    description: "Choice of Meat, rice and beans, cilantro, and onions.",
    price: 11.95,
    image: "https://picsum.photos/seed/tacomeal/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Shredded Beef", price: 0 },
      { name: "Pork", price: 0 },
      { name: "Chicken", price: 0 },
      { name: "Ground Beef", price: 0 },
      { name: "Beef Tongue", price: 1.00 },
      { name: "Pastor", price: 0 },
      { name: "Asada", price: 0 },
      { name: "Cheese", price: 0 },
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "beef-taquitos-rancheros",
    category: "main-dishes",
    name: "Beef Taquitos Rancheros",
    description: "Rice, beans, sour cream, guacamole, and pico de gallo.",
    price: 12.95,
    image: "https://picsum.photos/seed/beef-taquitos/600/400",
    ingredients: [],
    extras: []
  },

  // Antojitos
  {
    id: "tostilocos",
    category: "antojitos",
    name: "Tostilocos",
    description: "Popular Mexican street food snack.",
    price: 12.00,
    image: "https://picsum.photos/seed/tostilocos/600/400",
    ingredients: [],
    extras: []
  },
  {
    id: "bionico",
    category: "antojitos",
    name: "Bionico",
    description: "Fresh fruit salad with cream.",
    price: 12.00,
    image: "https://picsum.photos/seed/bionico/600/400",
    ingredients: [],
    extras: []
  },
  {
    id: "chilindrina",
    category: "antojitos",
    name: "Chilindrina",
    description: "Crispy snack with various toppings.",
    price: 12.00,
    image: "https://picsum.photos/seed/chilindrina/600/400",
    ingredients: [],
    extras: []
  },
  {
    id: "coctel-frutas",
    category: "antojitos",
    name: "Coctel de Frutas",
    description: "Mixed fruit cocktail.",
    price: 12.00,
    image: "https://picsum.photos/seed/frutas/600/400",
    ingredients: [],
    extras: []
  },

  // Drinks
  {
    id: "aguas-frescas",
    category: "drinks",
    name: "Aguas Frescas",
    description: "Flavor at pickup time.",
    price: 4.50,
    image: "https://picsum.photos/seed/aguas/600/400",
    ingredients: [],
    extras: [
      { name: "32oz Size (+1.00)", price: 1.00 }
    ]
  },
  {
    id: "fountain-coke",
    category: "drinks",
    name: "Fountain Coke",
    description: "Classic Coca-Cola.",
    price: 2.95,
    image: "https://picsum.photos/seed/coke/600/400",
    ingredients: [],
    extras: [
      { name: "Large Size (+1.50)", price: 1.50 }
    ]
  },
  {
    id: "fountain-diet-coke",
    category: "drinks",
    name: "Fountain Diet Coke",
    description: "Zero calorie Coca-Cola.",
    price: 2.95,
    image: "https://picsum.photos/seed/dietcoke/600/400",
    ingredients: [],
    extras: [
      { name: "Large Size (+1.50)", price: 1.50 }
    ]
  },
  {
    id: "fountain-dr-pepper",
    category: "drinks",
    name: "Fountain Dr. Pepper",
    description: "Unique blend of 23 flavors.",
    price: 2.95,
    image: "https://picsum.photos/seed/drpepper/600/400",
    ingredients: [],
    extras: [
      { name: "Large Size (+1.50)", price: 1.50 }
    ]
  },
  {
    id: "fountain-fanta",
    category: "drinks",
    name: "Fountain Orange Fanta",
    description: "Fruity orange soda.",
    price: 2.95,
    image: "https://picsum.photos/seed/fanta/600/400",
    ingredients: [],
    extras: [
      { name: "Large Size (+1.50)", price: 1.50 }
    ]
  },
  {
    id: "fountain-lemonade",
    category: "drinks",
    name: "Fountain Lemonade",
    description: "Refreshing citrus drink.",
    price: 2.95,
    image: "https://picsum.photos/seed/lemonade/600/400",
    ingredients: [],
    extras: [
      { name: "Large Size (+1.50)", price: 1.50 }
    ]
  },
  {
    id: "fountain-sprite",
    category: "drinks",
    name: "Fountain Sprite",
    description: "Lemon-lime sparkling soda.",
    price: 2.95,
    image: "https://picsum.photos/seed/sprite/600/400",
    ingredients: [],
    extras: [
      { name: "Large Size (+1.50)", price: 1.50 }
    ]
  },
  {
    id: "jarritos",
    category: "drinks",
    name: "Jarritos",
    description: "Mexican fruit soda. Flavor at pickup time.",
    price: 3.50,
    image: "https://picsum.photos/seed/jarritos/600/400",
    ingredients: [],
    extras: []
  },
  {
    id: "mexican-coke",
    category: "drinks",
    name: "Coca Cola Mexicana",
    description: "Made with cane sugar in glass bottle.",
    price: 4.50,
    image: "https://picsum.photos/seed/mexicancoke/600/400",
    ingredients: [],
    extras: []
  },

  // Slushies & Fruit Cakes
  {
    id: "chupeton",
    category: "slushies-fruitcakes",
    name: "Chupeton",
    description: "Flavorful slushy specialty.",
    price: 7.99,
    image: "https://picsum.photos/seed/chupeton/600/400",
    ingredients: [],
    extras: []
  },
  {
    id: "guayava-slushy",
    category: "slushies-fruitcakes",
    name: "Guayava",
    description: "Sweet guava fruit cake/slushy.",
    price: 4.00,
    image: "https://picsum.photos/seed/guayava/600/400",
    ingredients: [],
    extras: []
  },
  {
    id: "chamango",
    category: "slushies-fruitcakes",
    name: "Chamango",
    description: "Mango and chamoy treat.",
    price: 7.99,
    image: "https://picsum.photos/seed/chamango/600/400",
    ingredients: [],
    extras: []
  },
  {
    id: "chamarindo",
    category: "slushies-fruitcakes",
    name: "Chamarindo",
    description: "Tamarind and chamoy joy.",
    price: 5.99,
    image: "https://picsum.photos/seed/chamarindo/600/400",
    ingredients: [],
    extras: []
  },
  {
    id: "fresa-colada",
    category: "slushies-fruitcakes",
    name: "Fresa Colada",
    description: "Strawberry coconut blend.",
    price: 7.99,
    image: "https://picsum.photos/seed/fresacolada/600/400",
    ingredients: [],
    extras: []
  },
  {
    id: "coffee-slushy",
    category: "slushies-fruitcakes",
    name: "Coffee Slushy",
    description: "Chilled caffeine boost.",
    price: 4.00,
    image: "https://picsum.photos/seed/coffee-s/600/400",
    ingredients: [],
    extras: [
      { name: "24oz Size (+1.99)", price: 1.99 }
    ]
  },
  {
    id: "tres-leches-slushy",
    category: "slushies-fruitcakes",
    name: "Tres Leches Slushy",
    description: "Creamy cake-inspired slushy.",
    price: 7.99,
    image: "https://picsum.photos/seed/tresleches-s/600/400",
    ingredients: [],
    extras: [
      { name: "24oz Size (+1.99)", price: 1.99 }
    ]
  },
  {
    id: "pina-colada",
    category: "slushies-fruitcakes",
    name: "Piña Colada",
    description: "Traditional pineapple coconut slushy.",
    price: 5.99,
    image: "https://picsum.photos/seed/pina-s/600/400",
    ingredients: [],
    extras: [
      { name: "24oz Size (+1.99)", price: 1.99 }
    ]
  },
  {
    id: "nuez-slushy",
    category: "slushies-fruitcakes",
    name: "Nuez Slushy",
    description: "Nutty flavored delight.",
    price: 4.00,
    image: "https://picsum.photos/seed/nuez-s/600/400",
    ingredients: [],
    extras: [
      { name: "24oz Size (+1.99)", price: 1.99 }
    ]
  },
  {
    id: "vanilla-slushy",
    category: "slushies-fruitcakes",
    name: "Vanilla Slushy",
    description: "Smooth vanilla frozen treat.",
    price: 4.00,
    image: "https://picsum.photos/seed/vanilla-s/600/400",
    ingredients: [],
    extras: [
      { name: "24oz Size (+1.99)", price: 1.99 }
    ]
  },
  {
    id: "chamoyada",
    category: "slushies-fruitcakes",
    name: "Chamoyada",
    description: "Spicy, sweet, and sour frozen drink.",
    price: 7.99,
    image: "https://picsum.photos/seed/chamoyada/600/400",
    ingredients: [],
    extras: [
      { name: "24oz Size (+1.99)", price: 1.99 }
    ]
  },
  {
    id: "champina",
    category: "slushies-fruitcakes",
    name: "Champina",
    description: "Chicle and pineapple mix.",
    price: 7.99,
    image: "https://picsum.photos/seed/champina/600/400",
    ingredients: [],
    extras: [
      { name: "24oz Size (+1.99)", price: 1.99 }
    ]
  },
  {
    id: "strawberry-slushy",
    category: "slushies-fruitcakes",
    name: "Strawberry",
    description: "Cool strawberry refreshment.",
    price: 4.00,
    image: "https://picsum.photos/seed/strawberry-s/600/400",
    ingredients: [],
    extras: [
      { name: "24oz Size (+1.99)", price: 1.99 }
    ]
  },
  {
    id: "tamarindo-slushy",
    category: "slushies-fruitcakes",
    name: "Tamarindo",
    description: "Tangy tamarind frozen treat.",
    price: 4.00,
    image: "https://picsum.photos/seed/tamarindo-s/600/400",
    ingredients: [],
    extras: [
      { name: "24oz Size (+1.99)", price: 1.99 }
    ]
  },
  {
    id: "licuado-coconut",
    category: "slushies-fruitcakes",
    name: "Licuado Coconut",
    description: "Fresh coconut smoothie.",
    price: 7.99,
    image: "https://picsum.photos/seed/coconut-l/600/400",
    ingredients: [],
    extras: [
      { name: "24oz Size (+1.99)", price: 1.99 }
    ]
  },
  {
    id: "licuado-chicle",
    category: "slushies-fruitcakes",
    name: "Licuado Chicle",
    description: "Bubblegum flavored smoothie.",
    price: 4.00,
    image: "https://picsum.photos/seed/chicle-l/600/400",
    ingredients: [],
    extras: [
      { name: "24oz Size (+1.99)", price: 1.99 }
    ]
  },
  {
    id: "licuado-regular",
    category: "slushies-fruitcakes",
    name: "Licuado",
    description: "Classic Mexican smoothie.",
    price: 4.00,
    image: "https://picsum.photos/seed/licuado/600/400",
    ingredients: [],
    extras: [
      { name: "24oz Size (+1.99)", price: 1.99 }
    ]
  },

  // Desserts
  {
    id: "3-leches-cake",
    category: "desserts",
    name: "3 Leches Cake",
    description: "Traditional sponge cake soaked in three milks.",
    price: 7.00,
    image: "https://picsum.photos/seed/leches/600/400",
    ingredients: [],
    extras: []
  },
  {
    id: "churros-3",
    category: "desserts",
    name: "Churros (3)",
    description: "Crispy fried dough dusted with cinnamon sugar.",
    price: 6.00,
    image: "https://picsum.photos/seed/churros/600/400",
    ingredients: [],
    extras: []
  },
  {
    id: "flan",
    category: "desserts",
    name: "Flan",
    description: "Creamy caramel custard.",
    price: 6.00,
    image: "https://picsum.photos/seed/flan/600/400",
    ingredients: [],
    extras: []
  },
  {
    id: "cheese-cake",
    category: "desserts",
    name: "Cheese Cake",
    description: "Rich and creamy cheesecake.",
    price: 5.00,
    image: "https://picsum.photos/seed/cheesecake/600/400",
    ingredients: [],
    extras: []
  },
  
  // Platillos
  {
    id: "carne-asada-platillo",
    category: "platillos",
    name: "Carne Asada Platillo",
    description: "Rice, Beans, Cactus, Onions, Guacamole, Fried Jalapeño and Tortillas",
    price: 22.95,
    image: "https://picsum.photos/seed/asadaplatillo/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Corn Tortilla", price: 0 },
      { name: "Flour Tortilla", price: 0 },
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "mojarra-platillo",
    category: "platillos",
    name: "Mojarra Platillo",
    description: "Fried whole Tilapia fish with Rice, French Fries, Lettuce, Avocado, Lemon and Tortillas",
    price: 24.95,
    image: "https://picsum.photos/seed/mojarra/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Corn Tortilla", price: 0 },
      { name: "Flour Tortilla", price: 0 },
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "camarones-mojo-ajo",
    category: "platillos",
    name: "Camarones Mojo de Ajo",
    description: "Served with Rice and Beans, Shrimp, Onions, Mushrooms, Garlic Sauce, Tortillas",
    price: 20.95,
    image: "https://picsum.photos/seed/camaronesajo/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Corn Tortilla", price: 0 },
      { name: "Flour Tortilla", price: 0 },
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "alambre-platillo",
    category: "platillos",
    name: "Alambre Platillo",
    description: "Steak, Bell Pepper, Onions, Cheese, Rice and Beans, Tortillas",
    price: 17.95,
    image: "https://picsum.photos/seed/alambrep/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Corn Tortilla", price: 0 },
      { name: "Flour Tortilla", price: 0 },
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "milanesa-platillo",
    category: "platillos",
    name: "Milanesa Platillo",
    description: "Breaded Beef, Rice and Beans, Served with Salad (lettuce, avocado, and lemon) Tortillas",
    price: 16.95,
    image: "https://picsum.photos/seed/milanesap/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Corn Tortilla", price: 0 },
      { name: "Flour Tortilla", price: 0 },
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "chorizo-huevo-platillo",
    category: "platillos",
    name: "Chorizo con Huevo Platillo",
    description: "Hot Sausage and Eggs, Rice and Beans, Sour Cream, Tortillas",
    price: 16.95,
    image: "https://picsum.photos/seed/chorizohuevo/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Corn Tortilla", price: 0 },
      { name: "Flour Tortilla", price: 0 },
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "machaca-platillo",
    category: "platillos",
    name: "Machaca Platillo",
    description: "Shredded Beef, Pico de Gallo, Eggs, Sour Cream, Tortillas",
    price: 17.95,
    image: "https://picsum.photos/seed/machacap/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Corn Tortilla", price: 0 },
      { name: "Flour Tortilla", price: 0 },
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
  {
    id: "carnitas-plate",
    category: "platillos",
    name: "Carnitas Plate",
    description: "Carnitas served with Pico de Gallo, Rice and Beans, Tortillas",
    price: 18.95,
    image: "https://picsum.photos/seed/carnitasplate/600/400",
    ingredients: ["Onions", "Pepper", "Lettuce", "Beans", "Guacamole", "Mushrooms", "Cilantro", "Tomatoes", "Jalapeños", "Sour Cream", "Rice", "Avocado", "Sauce", "Spicy", "Cabbage"],
    extras: [
      { name: "Corn Tortilla", price: 0 },
      { name: "Flour Tortilla", price: 0 },
      { name: "Extra Beans", price: 1.50 },
      { name: "Extra Cilantro", price: 0.50 },
      { name: "Extra Rice & Beans", price: 3.00 },
      { name: "Extra Onions", price: 0.50 },
      { name: "Extra Rice", price: 1.00 },
      { name: "Extra Guacamole", price: 1.50 },
      { name: "Extra Jalapeño", price: 0.50 }
    ]
  },
];
