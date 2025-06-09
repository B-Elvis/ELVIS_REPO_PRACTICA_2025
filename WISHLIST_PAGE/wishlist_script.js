import { createNavbarComponent } from "../COMPONENTS/NAV_BAR/navbar_func.js";
import { createFooterComponent } from "../COMPONENTS/FOOTER/footer_func.js";
import {
  alertSucces,
  createCartComponent,
} from "../COMPONENTS/CART/cart_function.js";
import { toggleTheme } from "../JS_General_Dark_Theme.js";
import { loadProducts } from "../HOME PAGE/JSON_PRODUCTS/loadProducts.js";

const lang = localStorage.getItem("lang") || "en";
createNavbarComponent();
loadProducts(lang, true);
createFooterComponent();
createCartComponent();
toggleTheme();

function delete_wishlist() {
  const empty_Wishlist = document.querySelector(".menu_header h4");
  if (localStorage.getItem("wishlist") === null) {
    empty_Wishlist.classList.add("disabled_ew");
    return;
  }
  empty_Wishlist.addEventListener("click", () => {
    localStorage.removeItem("wishlist");
    alertSucces("Wishlist cleared successfully!");

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  });
}
delete_wishlist();
