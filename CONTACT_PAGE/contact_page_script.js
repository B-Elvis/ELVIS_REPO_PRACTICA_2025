import { createNavbarComponent } from "../COMPONENTS/NAV_BAR/navbar_func.js";
import { createFooterComponent } from "../COMPONENTS/FOOTER/footer_func.js";
import { createCartComponent } from "../COMPONENTS/CART/cart_function.js";
import { toggleTheme } from "../JS_General_Dark_Theme.js";
import { createCarouselComponent } from "../COMPONENTS/IMAGE_CAROUSEL/img_carousel_script.js";
// import { loadProducts } from "../HOME PAGE/JSON_PRODUCTS/loadProducts.js";

const lang = localStorage.getItem("lang") || "en";

createNavbarComponent();
createCarouselComponent();
createFooterComponent();
toggleTheme();
createCartComponent();

// loadProducts(lang); // Load products and updateCart automatically
