// Mock Data Array for Food Items
const foodItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 12.99,
    isVeg: true,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300",
    description: "Classic cheese and fresh basil tomato sauce."
  },
  {
    id: 2,
    name: "Crispy Chicken Burger",
    category: "Burgers",
    price: 8.99,
    isVeg: false,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300",
    description: "Juicy fried chicken patty with mayo and lettuce."
  },
  {
    id: 3,
    name: "Paneer Tikka Roll",
    category: "Rolls",
    price: 7.49,
    isVeg: true,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=300",
    description: "Grilled cottage cheese wrapped in a warm roll."
  }
];

// Array to hold cart items
let cart = [];

// Function to render food items to the grid dynamically
function renderMenu(items) {
  const container = document.getElementById("food-container");
  if (!container) return;
  
  container.innerHTML = ""; // Clear existing content

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "food-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width:100%; height:160px; object-fit:cover; border-radius:8px;">
      <h3 style="margin-top:0.5rem;">${item.name}</h3>
      <p style="font-size:0.9rem; color:#666;">${item.description}</p>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem;">
        <strong>$${item.price.toFixed(2)}</strong>
        <button onclick="addToCart(${item.id})" style="background:#FF6B35; color:#fff; border:none; padding:0.4rem 0.8rem; border-radius:5px; cursor:pointer;">Add</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Function to filter menu by category
function filterCategory(category) {
  // Update active state on buttons
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.classList.toggle("active", btn.textContent === category);
  });

  if (category === 'All') {
    renderMenu(foodItems);
  } else {
    const filtered = foodItems.filter(item => item.category === category);
    renderMenu(filtered);
  }
}

// Function to handle adding items to the cart
function addToCart(id) {
  const item = foodItems.find(p => p.id === id);
  if (item) {
    cart.push(item);
    document.getElementById("cart-count").innerText = cart.length;
    updateCartTotal();
  }
}

// Function to update cart total calculation
function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const totalElement = document.getElementById("cart-total");
  if (totalElement) {
    totalElement.innerText = total.toFixed(2);
  }
}

// Initial rendering on page load
document.addEventListener("DOMContentLoaded", () => {
  renderMenu(foodItems);
});