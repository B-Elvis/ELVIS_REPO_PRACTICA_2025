import { createNavbarComponent } from "../COMPONENTS/NAV_BAR/navbar_func.js";
import { createFooterComponent } from "../COMPONENTS/FOOTER/footer_func.js";
import { createCartComponent } from "../COMPONENTS/CART/cart_function.js";
import { toggleTheme } from "../JS_General_Dark_Theme.js";
toggleTheme();

const form = document.querySelector(".login_form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = form.querySelector("#email").value.trim().toLowerCase();
  const password = form.querySelector("#password").value;

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password!");
    return;
  }

  localStorage.setItem("loggedInUser", email);
  window.location.href = "../PROFILE_PAGE/profile.html";
});
