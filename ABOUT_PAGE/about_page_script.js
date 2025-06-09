import { createNavbarComponent } from "../COMPONENTS/NAV_BAR/navbar_func.js";
import { createFooterComponent } from "../COMPONENTS/FOOTER/footer_func.js";
import { createCartComponent } from "../COMPONENTS/CART/cart_function.js";
import { toggleTheme } from "../JS_General_Dark_Theme.js";
// import { loadProducts } from "../HOME PAGE/JSON_PRODUCTS/loadProducts.js";

const lang = localStorage.getItem("lang") || "en";

createNavbarComponent();
createFooterComponent();
toggleTheme();
createCartComponent();

// loadProducts(lang); // Load products and updateCart automatically

document
  .getElementsByClassName("service_button")[0]
  .addEventListener("click", () => {
    location.assign("../HOME PAGE/index.html");
  });

document
  .getElementsByClassName("service_button")[1]
  .addEventListener("click", () => {
    location.assign("../WISHLIST_PAGE/wishlist.html");
  });

document
  .getElementsByClassName("service_button")[2]
  .addEventListener("click", () => {
    location.assign("../REVIEWS_PAGE/reviews.html");
  });

// Pentru toate butoanele "see reviews" (data-i18n="see_reviews" sau clasa .see_reviews)
document
  .querySelectorAll('[data-i18n="see_reviews"], .see_reviews')
  .forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "../REVIEWS_PAGE/reviews.html";
    });
  });
