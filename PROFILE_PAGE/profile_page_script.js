import { createNavbarComponent } from "../COMPONENTS/NAV_BAR/navbar_func.js";
import { createFooterComponent } from "../COMPONENTS/FOOTER/footer_func.js";
import { createCartComponent } from "../COMPONENTS/CART/cart_function.js";
import { toggleTheme } from "../JS_General_Dark_Theme.js";

createNavbarComponent();
createFooterComponent();
toggleTheme();
createCartComponent();

const main = document.createElement("main");
main.className = "profile-main";

const email = localStorage.getItem("loggedInUser");
let users = JSON.parse(localStorage.getItem("users") || "[]");
let user = users.find((u) => u.email === email);

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function getOrderHistory(email) {
  const allOrders = JSON.parse(localStorage.getItem("orderHistory") || "{}");
  return allOrders[email] || [];
}

function renderOrderHistory() {
  const orders = getOrderHistory(user.email);
  if (!orders.length) {
    return `<div class="profile-orders"><h3>Order History</h3><p>No orders yet.</p></div>`;
  }
  return `
    <div class="profile-orders">
      <h3>Order History</h3>
      <ul>
        ${orders
          .map(
            (order, idx) => `
          <li style="margin-bottom:1.5rem;">
            <b>Order #${idx + 1}</b> <br/>
            <b>Date:</b> ${new Date(order.date).toLocaleString()}<br/>
            <b>Total:</b> ${order.total || "-"}<br/>
            <b>Items:</b>
            <ul>
              ${
                order.items && order.items.length
                  ? order.items
                      .map(
                        (item) =>
                          `<li>${item.name || item.title || "Product"} x${
                            item.quantity || 1
                          }</li>`
                      )
                      .join("")
                  : "<li>No items</li>"
              }
            </ul>
            <details>
              <summary>Show Details</summary>
              <div>
                <b>Shipping:</b>
                <ul>
                  <li><b>Name:</b> ${order.shipping?.name || ""}</li>
                  <li><b>Email:</b> ${order.shipping?.email || ""}</li>
                  <li><b>Address:</b> ${order.shipping?.address || ""}</li>
                  <li><b>City:</b> ${order.shipping?.city || ""}</li>
                  <li><b>ZIP:</b> ${order.shipping?.zip || ""}</li>
                  <li><b>Country:</b> ${order.shipping?.country || ""}</li>
                  <li><b>Phone:</b> ${order.shipping?.phone || ""}</li>
                </ul>
                <b>Payment:</b>
                <ul>
                  <li><b>Name on Card:</b> ${
                    order.payment?.name_on_card || ""
                  }</li>
                  <li><b>Card Number:</b> ****${(
                    order.payment?.card_number || ""
                  ).slice(-4)}</li>
                  <li><b>Expiration:</b> ${
                    order.payment?.expiration_date || ""
                  }</li>
                </ul>
              </div>
            </details>
          </li>
        `
          )
          .join("")}
      </ul>
    </div>
  `;
}

function updateProfileCard() {
  user = users.find((u) => u.email === localStorage.getItem("loggedInUser"));
  main.innerHTML = `
    <div class="profile-card">
      <h2>Welcome, ${user.name} ${user.surname}!</h2>
      <form id="profile-form" autocomplete="off">
        <div class="profile-row">
          <label for="profile-name"><b>Name:</b></label>
          <input id="profile-name" type="text" value="${user.name}" required />
        </div>
        <div class="profile-row">
          <label for="profile-surname"><b>Surname:</b></label>
          <input id="profile-surname" type="text" value="${
            user.surname
          }" required />
        </div>
        <div class="profile-row">
          <label for="profile-email"><b>Email:</b></label>
          <input id="profile-email" type="email" value="${
            user.email
          }" required />
        </div>
        <div class="profile-row">
          <label for="profile-password"><b>New Password:</b></label>
          <input id="profile-password" type="password" placeholder="Leave blank to keep current" autocomplete="new-password" />
        </div>
        <button type="submit" class="profile-save-btn">Save Changes</button>
      </form>
      <button id="logout-btn" class="profile-logout-btn" style="margin-top:1.5rem;">Log Out</button>
    </div>
    ${renderOrderHistory()}
  `;

  document.getElementById("logout-btn").onclick = function () {
    localStorage.removeItem("loggedInUser");
    window.location.href = "../LOGIN_PAGE/login_page.html";
  };

  document.getElementById("profile-form").onsubmit = function (e) {
    e.preventDefault();
    const newName = document.getElementById("profile-name").value.trim();
    const newSurname = document.getElementById("profile-surname").value.trim();
    const newEmail = document
      .getElementById("profile-email")
      .value.trim()
      .toLowerCase();
    const newPassword = document.getElementById("profile-password").value;

    // Check if email is changed and not already used
    if (newEmail !== user.email && users.some((u) => u.email === newEmail)) {
      alert("This email is already used by another account.");
      return;
    }

    user.name = newName;
    user.surname = newSurname;
    if (newEmail !== user.email) {
      // Update loggedInUser if email changed
      localStorage.setItem("loggedInUser", newEmail);
      user.email = newEmail;
    }
    if (newPassword) {
      user.password = newPassword;
    }
    saveUsers();
    alert("Profile updated!");
    updateProfileCard();
  };
}

if (!user) {
  main.innerHTML = `<div class="profile-card"><h2>Not logged in</h2><a href="../LOGIN_PAGE/login_page.html">Go to Login</a></div>`;
}

// Adaugă main înainte de footer (ca pe celelalte pagini)
const navbarall = document.getElementsByClassName("nav_all")[0];
navbarall.insertAdjacentElement("afterend", main);
// Dacă user există, afișează profilul
if (user) {
  updateProfileCard();
}
