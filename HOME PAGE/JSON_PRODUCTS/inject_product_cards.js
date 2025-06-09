import {
  cart_array,
  cart_quantities,
  alertSucces,
  saveCartToLocalStorage,
  updateCart,
} from "../../COMPONENTS/CART/cart_function.js";
import { translations } from "../../translations.js";
import { globalProduse } from "../JSON_PRODUCTS/loadProducts.js";
const lang = localStorage.getItem("lang") || "en";

export function injectCards(produse, header_produse, lang = "en") {
  const html_cards_main = document.getElementsByTagName("main")[0];

  for (let i = 0; i < header_produse.length; i++) {
    const html_cards_section = document.createElement("section");
    html_cards_section.classList.add("cards");
    const header = header_produse[i];
    const html_cards_wrapper = document.createElement("div");
    html_cards_wrapper.classList.add("cards-wrapper");

    html_cards_section.innerHTML += `<div class="cards-heading" id="${header.id}">
        <div class="c-h-wrapper">
        <h1>${header.heading[lang]}</h1>
         <p>${header.subheading[lang]}</p>
         </div>
        <div class="sort active_expand"></div>
        </div>`;

    for (let j = 0; j < produse.length; j++) {
      const card = produse[j];
      let cantitate = "g";
      if (String(card.categorie_produs) === "Drinks_ID") cantitate = "l";

      if (String(card.categorie_produs) === String(header.id)) {
        html_cards_wrapper.innerHTML += `
       
          <div class="card" data-id="${card.id}">




<div class="modal_grid_container">
                <div class="modal_wrapper">
                 
                  <div class="modal_body">

                    <div class="img_body_wrapper"><img src="${
                      card.imagine_produs
                    }" alt="" />
                    <div class="close_modal"></div>
                    </div>
                    <div class="product_info">
                    <div class="price_and_title_flex">
                    <h4>${card.denumire_produs}</h4>
                    <div class="p_price_flex">
                    <p class="price">$${card.pret_produs}</p>

                    </div>
                    </div>
                        
                        <div class="p_info_field">
                          
                            <p class="category">${card.categorie_produs}</p>
                        </div>
                        <div class="p_info_field">
                            <h4 class="p_info_title">Description: </h4>
                            <p class="description">${card.descriere_produs}</p>
                            
                        </div>
                        <div class="p_info_field">
              <button class="order_button" href="">Order</button>
              </div>
                      
                    </div>
                    
                  </div>
                </div>
              </div>







            <div class="type_promo">${card.tip_promotie_produs}</div>
            <div class="wishlist_heart"></div>
            <img
              src="${card.imagine_produs}"
              alt=""
            />
            <div class="name-price">
              <div class="np_h_wrapper"><h1>${card.denumire_produs}</h1></div>
              <h3>${card.gramaj_produs}${cantitate}</h3>
            </div>
            <p>
              ${card.descriere_produs}
            </p>
            <div class="order-price">
              <h3>$${card.pret_produs.toFixed(2)}</h3>
              <button class="order_button" href="">${
                translations[lang].order_button
              }</button>
            </div>
          </div>
        `;
      }
      html_cards_section.appendChild(html_cards_wrapper);
    }
    html_cards_main.appendChild(html_cards_section);

    const menu_items_nav = document.querySelector(".nav_under > ul");

    menu_items_nav.innerHTML = "";
    for (let i = 0; i < header_produse.length; i++) {
      menu_items_nav.innerHTML += `
  <li><a href="#${header_produse[i].id}">${header_produse[i].heading[lang]}</a></li>
  `;
    }
  }

  const expand_array = document.querySelectorAll(".sort");

  expand_array.forEach((sort_elem) => {
    sort_elem.addEventListener("click", () => {
      console.log("este mesaj");
      sort_elem.classList.toggle("active_expand");

      const cardsSection = sort_elem.closest(".cards");
      const wrapper = cardsSection?.querySelector(".cards-wrapper");
      if (wrapper) {
        if (
          wrapper.style.display === "none" ||
          getComputedStyle(wrapper).display === "none"
        ) {
          wrapper.style.display = "grid";
          wrapper.style.opacity = "0";

          setTimeout(() => {
            wrapper.style.transition = "opacity 0.4s ease";
            wrapper.style.opacity = "1";
          }, 10);
        } else {
          wrapper.style.opacity = "0";
          setTimeout(() => {
            wrapper.style.display = "none";
          }, 0);
        }
      }
    });
  });
  attachOrderButtonFunctionality();
  attachWishlistFunctionality();
  attachModalFunctionality();
  applyScrollTitleAnimation();
  applyMobileNavMenuScrollOnPress();
  convertCurrency(document.querySelectorAll(".card > .order-price h3"), lang);
}

function attachModalFunctionality() {
  const card_md = document.querySelectorAll(".card");
  convertCurrency(document.querySelectorAll(".modal_body .price"), lang);
  console.log(card_md);

  card_md.forEach((card) => {
    const modal = card.querySelector(".modal_grid_container");

    card.addEventListener("click", () => {
      console.log("pa");
      modal.classList.toggle("modal_show");
    });
  });

  // const close_modal = document.querySelectorAll(".close_modal");
  // close_modal.forEach((element2) => {
  //   element2.addEventListener("click", () => {
  //     modal.classList.remove("modal_show");
  //     console.log("tolea");
  //   });
  // });
}

function attachOrderButtonFunctionality() {
  const orderButtons = document.querySelectorAll(".order_button");
  orderButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const card_temp = button.closest(".card");
      const card_temp_id = card_temp.dataset.id;
      if (!cart_array.includes(card_temp_id)) {
        cart_array.push(card_temp_id);
        cart_quantities[card_temp_id] = 1;
      } else {
        cart_quantities[card_temp_id] =
          (cart_quantities[card_temp_id] || 1) + 1;
      }
      saveCartToLocalStorage();
      updateCart(globalProduse);
      alertSucces(`
        ${
          card_temp.querySelector(".card > .name-price h1").textContent
        } Adaugat cu Succes !`);
    });
  });
}
let heart_counter = 0;

function attachWishlistFunctionality() {
  const wishlistButtons = document.querySelectorAll(".wishlist_heart");
  const wishlistCounter = document.querySelector(".w_h_c");

  if (!wishlistCounter || wishlistButtons.length === 0) return;

  const wishlistSet = new Set(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  function updateLocalStorage() {
    localStorage.setItem("wishlist", JSON.stringify([...wishlistSet]));
  }

  wishlistButtons.forEach((button) => {
    const card = button.closest(".card");
    if (!card) return;

    const cardId = card.dataset.id;
    if (!cardId) return;

    // Restore state
    if (wishlistSet.has(cardId)) {
      button.classList.add("flagged");
    }

    // Attach click event
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      button.classList.toggle("flagged");

      if (button.classList.contains("flagged")) {
        wishlistSet.add(cardId);
        alertSucces(`
        ${
          card.querySelector(".card > .name-price h1").textContent
        } adaugat la Wishlist !`);
      } else {
        wishlistSet.delete(cardId);
        alertSucces(`
        ${
          card.querySelector(".card > .name-price h1").textContent
        } scos din Wishlist !`);
      }

      updateLocalStorage();
      wishlistCounter.textContent = wishlistSet.size;
    });
  });

  // Update counter initially
  wishlistCounter.textContent = wishlistSet.size;
}

function applyScrollTitleAnimation() {
  document.querySelectorAll(".np_h_wrapper").forEach((wrapper) => {
    const text = wrapper.querySelector("h1");
    if (text.scrollWidth > wrapper.clientWidth) {
      text.style.animation = "scroll-title 6s linear infinite";
    } else {
      text.style.animation = "none";
      text.style.zIndex = 899;
    }
  });
}

function applyMobileNavMenuScrollOnPress() {
  const buttons = document.querySelectorAll(".nav_under > ul > li > a");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      button.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
    });
  });
}

export async function convertCurrency(replacement, lang) {
  if (lang === "en") return;

  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await res.json();
    const rate = data.rates.MDL;

    const prices =
      replacement instanceof NodeList || Array.isArray(replacement)
        ? Array.from(replacement)
        : [replacement];

    prices.forEach((price) => {
      let usdAmount = price.getAttribute("data-usd");
      if (usdAmount) {
        usdAmount = parseFloat(usdAmount);
      } else {
        const usdText = price.textContent.trim();
        usdAmount = parseFloat(usdText.replace(/[^0-9.]/g, ""));
      }
      if (isNaN(usdAmount)) return;
      const mdlAmount = (usdAmount * rate).toFixed(0);
      price.textContent = `${mdlAmount} MDL`;
    });
  } catch (err) {
    console.error("Eroare la conversie:", err);
  }
}
