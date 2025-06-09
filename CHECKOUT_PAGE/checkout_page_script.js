import { createNavbarComponent } from "../COMPONENTS/NAV_BAR/navbar_func.js";
import { createFooterComponent } from "../COMPONENTS/FOOTER/footer_func.js";
import { createCartComponent } from "../COMPONENTS/CART/cart_function.js";
import { toggleTheme } from "../JS_General_Dark_Theme.js";
const lang = localStorage.getItem("lang") || "en";
createNavbarComponent();
createFooterComponent();
createCartComponent();
toggleTheme();

// --- ORDER HISTORY LOGIC ---

function getLoggedInUserEmail() {
  return localStorage.getItem("loggedInUser");
}

function getOrderHistory(email) {
  const allOrders = JSON.parse(localStorage.getItem("orderHistory") || "{}");
  return allOrders[email] || [];
}

function saveOrderHistory(email, orders) {
  const allOrders = JSON.parse(localStorage.getItem("orderHistory") || "{}");
  allOrders[email] = orders;
  localStorage.setItem("orderHistory", JSON.stringify(allOrders));
}

function clearCart() {
  localStorage.removeItem("cart");
}

function getCartItems() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

document.addEventListener("DOMContentLoaded", () => {
  updateOrderSummary();

  const form = document.getElementById("shipping-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = getLoggedInUserEmail();
    if (!email) {
      alert("You must be logged in to place an order.");
      window.location.href = "/LOGIN_PAGE/login_page.html";
      return;
    }

    // Collect order data
    const order = {
      date: new Date().toISOString(),
      items: getCartItems(),
      shipping: {
        name: form["full-name"].value,
        email: form["email"].value,
        address: form["address"].value,
        city: form["city"].value,
        zip: form["zip"].value,
        country: form["country"].value,
        phone: form["phone"].value,
      },
      payment: {
        card_number: form["card-number"].value,
        expiration_date: form["expiry"].value,
        name_on_card: form["card-name"].value,
      },
      total:
        document.getElementById("total_price_cart_checkout")?.textContent || "",
    };

    // Save order to user's order history
    const history = getOrderHistory(email);
    history.push(order);
    saveOrderHistory(email, history);

    // Clear cart
    clearCart();

    alert("Order placed successfully!");
    window.location.href = "/PROFILE_PAGE/profile.html";
  });
});

// --- UPDATE ORDER SUMMARY ---
function updateOrderSummary() {
  const cartItems = getCartItems();
  let totalItems = 0;
  let totalPrice = 0;

  cartItems.forEach((item) => {
    totalItems += item.quantity || 1;
    totalPrice += (item.price || 0) * (item.quantity || 1);
  });

  const itemsElem = document.getElementById("nr_items_cart_checkout");
  const priceElem = document.getElementById("total_price_cart_checkout");

  if (itemsElem) itemsElem.textContent = totalItems;
  if (priceElem) priceElem.textContent = totalPrice.toFixed(2) + " $";
}
