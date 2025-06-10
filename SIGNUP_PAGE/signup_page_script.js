import { createNavbarComponent } from "../COMPONENTS/NAV_BAR/navbar_func.js";
import { createFooterComponent } from "../COMPONENTS/FOOTER/footer_func.js";
import { createCartComponent } from "../COMPONENTS/CART/cart_function.js";
import { toggleTheme } from "../JS_General_Dark_Theme.js";
toggleTheme();

const form = document.querySelector(".login_form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = form.querySelector("#name").value.trim();
  const surname = form.querySelector("#surname").value.trim();
  const email = form.querySelector("#email").value.trim().toLowerCase();
  const password = form.querySelector("#password").value;

  if (!name || !surname || !email || !password) {
    alert("Please fill all fields!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.find((u) => u.email === email)) {
    alert("Account with this email already exists!");
    return;
  }

  users.push({ name, surname, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("loggedInUser", email);
  window.location.href = "../PROFILE_PAGE/profile.html";
});
