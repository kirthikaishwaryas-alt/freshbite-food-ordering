// Mock Food Items Dataset
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

// Shopping Cart State
let cart = [];

// Display Menu Items
function renderMenu(items) {
  const container = document.getElementById("food-container");
  if (!container) return;
  
  container.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "food-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div class="card-footer">
        <strong>$${item.price.toFixed(2)}</strong>
        <button onclick="addToCart(${item.id})">Add to Cart</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Category Filter Logic
function filterCategory(category) {
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

// Add Item to Cart
function addToCart(id) {
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const product = foodItems.find(p => p.id === id);
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
}

// Adjust Item Quantity (+ / -)
function updateQuantity(id, change) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  updateCartUI();
}

// Render Cart Modal Items
function renderCartItems() {
  const cartContainer = document.getElementById("cart-items");
  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p style='margin-top:1rem;'>Your cart is empty.</p>";
    return;
  }

  cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
      </div>
      <div class="quantity-controls">
        <button onclick="updateQuantity(${item.id}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity(${item.id}, 1)">+</button>
      </div>
    </div>
  `).join("");
}

// Update Totals and Cart Badge Counter
function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  document.getElementById("cart-count").innerText = totalCount;
  document.getElementById("cart-total").innerText = totalPrice.toFixed(2);
  renderCartItems();
}

// Toggle Modal Window
function toggleCartModal() {
  const modal = document.getElementById("cart-modal");
  modal.classList.toggle("hidden");
}

// Checkout Logic
function handleCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("🎉 Order placed successfully! Thank you for ordering from FreshBite.");
  cart = [];
  updateCartUI();
  toggleCartModal();
}

// Application Initialization
document.addEventListener("DOMContentLoaded", () => {
  renderMenu(foodItems);

  document.getElementById("cart-btn")?.addEventListener("click", toggleCartModal);
  document.getElementById("checkout-btn")?.addEventListener("click", handleCheckout);
});