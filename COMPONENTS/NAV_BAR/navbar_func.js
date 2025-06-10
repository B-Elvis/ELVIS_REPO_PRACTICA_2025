/* <<< -o- >>> The Entire Navbar Component <<< -o- >>> */

export function createNavbarComponent() {
  const black_gtext = document.createElement("div");
  black_gtext.innerHTML = `
        <div class="pwrapper">
          <p>Holiday Offer!</p>
          <p>-50% Off</p>
          <p>Holiday Offer!</p>
          <p>-50% Off</p>
          <p>Holiday Offer!</p>
          <p>-50% Off</p>
          <p>Holiday Offer!</p>
          <p>-50% Off</p>
        </div>
      `;

  black_gtext.classList.add("black-gt");
  const nav_all = document.createElement("div");
  nav_all.classList.add("nav_all");
  nav_all.innerHTML = `
      
      <nav>
        <div class="left-side">
          <img src="" alt="" />
          <h1>Banqueta</h1>
        </div>
        <ul id="nav_menu_ul">
          <a href="../HOME PAGE/index.html" data-i18n="home">Home</a>
          <a href="../ABOUT_PAGE/about.html" data-i18n="about_us">About Us</a>
          <a href="../REVIEWS_PAGE/reviews.html" data-i18n="reviews">Reviews</a>
          <a href="../CONTACT_PAGE/contact.html">Contact</a>
          <a href="../PROFILE_PAGE/profile.html" data-i18n="account">Profile</a>

        </ul>
        <div class="right-side">
          <span>
            <input type="text" placeholder="Search" />
          </span>
          <div class="navbar_buttons">
          
          <div class="page_functionality_buttons">
          <div class="theme_toggler" id="theme" title="Page Theme"></div>
          <div class="language_toggler" id="page_language" title="Language & Currency">EN</div>
          </div>
          <div class="wishlist_heart" id="w_h" >
            <div class="w_h_c">0</div>
          </div>
          <div class="shopping-cart" id="s_c_b" >
            <div class="s_c_c">0</div>
          </div>
          <a href="#">Log in</a>
          </div>
        </div>
      </nav>

      <div class="nav_menu">
        <div class="dropdown_for_nav_menu"></div>
       
      </div>
`;

  document.getElementsByTagName(
    "head"
  )[0].innerHTML += `<link rel="stylesheet" href="../COMPONENTS/NAV_BAR/COMP_CSS_NAVBAR.css" />`;

  document.getElementsByTagName("body")[0].prepend(black_gtext, nav_all);

  /* <<< -o- >>> The Hide on Scroll Functionality <<< -o- >>> */

  const navbar = nav_all;
  const total_height_exception_nav = navbar.offsetHeight;
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    // if (window.innerWidth < 768) {
    //   return;
    // }

    if (nav_menu.classList.contains("hide_show_nav_menu")) {
      return;
    }

    if (currentScroll > 5 * total_height_exception_nav) {
      if (currentScroll > lastScroll) {
        navbar.style.transform = "translateY(-100%)";
        navbar.style.opacity = "0";
      } else {
        navbar.style.transform = "translateY(0)";
        navbar.style.opacity = "1";
      }
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
  });

  document.addEventListener("DOMContentLoaded", () => {
    function syncMenuPositionLoop() {
      const nav = document.querySelector(".nav_all");
      const menu = document.querySelector(".nav_under");
      if (!nav || !menu) return;

      let lastTransform = "";

      function updatePosition() {
        const navTransform = getComputedStyle(nav).transform;

        if (navTransform !== lastTransform) {
          menu.style.top = `${nav.offsetHeight}px`;
          menu.style.transform = navTransform;
          lastTransform = navTransform;
        }

        requestAnimationFrame(updatePosition);
      }

      requestAnimationFrame(updatePosition);
    }

    window.addEventListener("DOMContentLoaded", () => {
      syncMenuPositionLoop();
    });

    // const lang = localStorage.getItem("lang") || "en";
  });

  /* <<< -o- >>> The Menu Dropdown Page Navigation <<< -o- >>> */

  const nav_menu = document.querySelector("nav");
  const toggle_nav_menu = document.getElementsByClassName(
    "dropdown_for_nav_menu"
  )[0];
  toggle_nav_menu.addEventListener("click", () => {
    toggle_nav_menu.classList.toggle("reverse_arrow_menu");
    nav_menu.classList.toggle("hide_show_nav_menu");
  });

  const login_button = document.querySelector(".navbar_buttons a");
  login_button.addEventListener("click", () => {
    location.assign("../LOGIN_PAGE/login_page.html");
  });

  const theme_toggle = document.getElementById("theme");
  theme_toggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark_mode");
    localStorage.setItem("tema", isDark ? "dark" : "light");
  });

  const wishlistOpen = document.querySelector("#w_h");
  wishlistOpen.addEventListener("click", () => {
    location.assign("../WISHLIST_PAGE/wishlist.html");
  });

  wishlistOpen.querySelector(".w_h_c").textContent =
    JSON.parse(localStorage.getItem("wishlist"))?.length || 0;

  document.querySelector(".left-side").addEventListener("click", () => {
    location.assign("../HOME PAGE/index.html");
  });

  // --- SEARCH BAR FUNCTIONALITY ---
  // Caută inputul de search
  const searchInput = nav_all.querySelector(
    'input[type="text"][placeholder="Search"]'
  );
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = this.value.trim().toLowerCase();

      // Caută toate cardurile cu clasa .card sau .menu-card sau .service_card (adaptează după proiectul tău)
      const cardSelectors = [
        ".card", // pentru pagini de meniu/produse
        ".menu-card", // pentru pagini cu meniu
        ".service_card", // pentru about/services
        ".review-form-card", // pentru recenzii (dacă vrei să filtrezi și acolo)
        ".review-list-card",
      ];
      let cards = [];
      cardSelectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((card) => cards.push(card));
      });

      // Dacă nu există carduri, nu face nimic
      if (!cards.length) return;

      cards.forEach((card) => {
        // Încearcă să găsești textul relevant din card
        let text = card.textContent || "";
        text = text.toLowerCase();

        // Dacă query-ul e gol, arată tot
        if (!query) {
          card.style.display = "";
        } else {
          // Ascunde cardurile care nu conțin textul căutat
          card.style.display = text.includes(query) ? "" : "none";
        }
      });
    });
  }
    const accountBtn = document.querySelector(".nav_all ul > li:last-child a");
  if (accountBtn) {
    accountBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const logged = localStorage.getItem("loggedInUser");
      if (logged) {
        window.location.href = "../PROFILE_PAGE/profile.html";
      } else {
        window.location.href = "../LOGIN_PAGE/login_page.html";
      }
    });
  }
}

import { translatePage } from "../../translations.js";

document.addEventListener("DOMContentLoaded", () => {
  const lang_button = document.getElementsByClassName("language_toggler")[0];

  let currentLang = localStorage.getItem("lang") || "ro";
  translatePage(currentLang);

  lang_button.textContent = currentLang === "ro" ? "EN" : "RO";

  lang_button.addEventListener("click", () => {
    currentLang = currentLang === "ro" ? "en" : "ro";
    localStorage.setItem("lang", currentLang);
    lang_button.textContent = currentLang === "ro" ? "EN" : "RO";

    translatePage(currentLang);
    location.reload();
    // reloadHeadingsWithLang(currentLang);
  });
});

window.addEventListener("load", () => {
  document.body.classList.remove("hidden");
  document.body.classList.add("visible");
});
