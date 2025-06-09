import { createNavbarComponent } from "../COMPONENTS/NAV_BAR/navbar_func.js";
import { createFooterComponent } from "../COMPONENTS/FOOTER/footer_func.js";
import { createCartComponent } from "../COMPONENTS/CART/cart_function.js";
import { toggleTheme } from "../JS_General_Dark_Theme.js";
import { createCarouselComponent } from "../COMPONENTS/IMAGE_CAROUSEL/img_carousel_script.js";

// Componentele vanilla rămân neschimbate
createNavbarComponent();
createCarouselComponent();
createFooterComponent();
createCartComponent();
toggleTheme();

// Vanilla pentru conținutul paginii:
const reviewsList = document.getElementById("reviews-list");
const reviewForm = document.getElementById("review-form");
const reviewerInput = document.getElementById("reviewer");
const reviewTextInput = document.getElementById("review-text");

function loadReviews() {
  const saved = localStorage.getItem("reviews");
  return saved ? JSON.parse(saved) : [];
}

function saveReviews(reviews) {
  localStorage.setItem("reviews", JSON.stringify(reviews));
}

function renderReviews() {
  const reviews = loadReviews();
  reviewsList.innerHTML = "";
  if (reviews.length === 0) {
    reviewsList.innerHTML = `<div class="text-gray-500 text-center">No reviews yet.</div>`;
    return;
  }
  reviews.forEach(({ name, text, date }) => {
    reviewsList.innerHTML += `
      <div class="review-item">
        <div class="review-header">
          <span class="review-name">${name}</span>
          <span class="review-date">${date}</span>
        </div>
        <div class="review-text">${text}</div>
      </div>
    `;
  });
}

if (reviewForm) {
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = reviewerInput.value.trim();
    const text = reviewTextInput.value.trim();
    if (!name || !text) return;
    const reviews = loadReviews();
    reviews.unshift({
      name,
      text,
      date: new Date().toLocaleString(),
    });
    saveReviews(reviews);
    renderReviews();
    reviewForm.reset();
  });
}

renderReviews();
