import { createNavbarComponent } from "../COMPONENTS/NAV_BAR/navbar_func.js";
import { createCarouselComponent } from "../COMPONENTS/IMAGE_CAROUSEL/img_carousel_script.js";
import { createFooterComponent } from "../COMPONENTS/FOOTER/footer_func.js";
import {
  createCartComponent,
  updateCart,
} from "../COMPONENTS/CART/cart_function.js";
// import { injectCards } from "./JSON_PRODUCTS/inject_product_cards.js";
import { toggleTheme } from "../JS_General_Dark_Theme.js";

createNavbarComponent();
createCarouselComponent();
createFooterComponent();
createCartComponent();
toggleTheme();
// document.addEventListener("DOMContentLoaded", () => {
//   injectCards();
// });

import { loadProducts } from "./JSON_PRODUCTS/loadProducts.js";

const lang = localStorage.getItem("lang") || "en";
loadProducts(lang, true); // loads and injects cards only on homepage

const track = document.querySelector(".carousel-track");
const slides = Array.from(document.querySelectorAll(".carousel-item"));
const leftButton = document.getElementById("left_slide");
const rightButton = document.getElementById("right_slide");

let currentIndex = 0;

function updateSlidePosition() {
  const container = document.querySelector(".carousel-wrapper");
  const slideWidth = container.offsetWidth;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

rightButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlidePosition();
});

leftButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlidePosition();
});

window.addEventListener("resize", updateSlidePosition);
window.addEventListener("load", updateSlidePosition);
