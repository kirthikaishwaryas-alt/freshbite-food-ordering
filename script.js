// Sample Mock Data for FreshBite
const foodItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 12.99,
    isVeg: true,
    image: "https://via.placeholder.com/150",
    description: "Classic cheese and tomato pizza with fresh basil."
  },
  {
    id: 2,
    name: "Crispy Chicken Burger",
    category: "Burgers",
    price: 8.99,
    isVeg: false,
    image: "https://via.placeholder.com/150",
    description: "Juicy fried chicken patty with fresh lettuce and mayo."
  },
  {
    id: 3,
    name: "Paneer Tikka Roll",
    category: "Rolls",
    price: 7.49,
    isVeg: true,
    image: "https://via.placeholder.com/150",
    description: "Grilled cottage cheese wrapped in a spicy paratha."
  }
];

// Array to store cart items
let cart = [];