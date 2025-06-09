import { convertCurrency } from "../../HOME PAGE/JSON_PRODUCTS/inject_product_cards.js";
const lang = localStorage.getItem("lang") || "en";
import { globalProduse } from "../../HOME PAGE/JSON_PRODUCTS/loadProducts.js";
import { loadProducts } from "../../HOME PAGE/JSON_PRODUCTS/loadProducts.js";
import { translatePage } from "../../translations.js";
export function createCartComponent() {
  document.getElementsByTagName(
    "head"
  )[0].innerHTML += `<link rel="stylesheet" href="../COMPONENTS/CART/COMP_shopping_cart.css" />`;

  const cartElem = document.createElement("div");
  cartElem.id = "shopping-cart_id";
  cartElem.classList.add("shopping_cart");

  cartElem.innerHTML = `
      <div class="s_cart_wrapper">
        <div class="s_cart_upper">
          <h2 data-i18n="shopping_cart">Shopping Cart</h2>
          <div class="close_cart_button"></div>
        </div>
        <div class="wrapper_for_middle_part"><div class="s_cart_middle"></div></div>
        <div class="s_cart_lower">
          <div class="totals">
  <h4><span data-i18n="total_price_label">Total Price:</span> <span class="total-price-value">$0</span></h4>
  <h3><span data-i18n="total_items_label">Nr. of Items:</span> <span class="total-items-value">0</span></h3>
  <p data-i18n="empty_cart">Empty Cart</p>
</div>
          <div class="chk_bttn"><p data-i18n="place_order"></p><div id="empty_cart"></div><div id="empty_coin"></div></div>
        </div>
      </div>
    `;

  document.body.appendChild(cartElem);

  const open_cart_button = document.getElementById("s_c_b");
  const shopping_cart = document.getElementById("shopping-cart_id");
  const close_cart_button = document.querySelector(".close_cart_button");
  open_cart_button.addEventListener("click", () => {
    shopping_cart.classList.toggle("opened_cart");
  });

  close_cart_button.addEventListener("click", () => {
    shopping_cart.classList.remove("opened_cart");
  });

  const delete_cart_items = document.querySelector(".totals p");
  delete_cart_items.addEventListener("click", () => {
    deleteCartItems();
  });

  assignCheckoutButtonFunctionality();
  loadProducts(lang);
}

export const cart_array = [];
export const cart_quantities = {}; // { [productId]: quantity }

document.addEventListener("DOMContentLoaded", () => {
  loadCartFromLocalStorage();
});

export function alertSucces(mesaj) {
  const body = document.querySelector("body");
  const alert_element = document.createElement("div");
  alert_element.classList.add("alert_popup");
  alert_element.textContent = `${mesaj}`;
  body.appendChild(alert_element);
  setTimeout(() => {
    body.removeChild(alert_element);
  }, 1800);
}

export function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart_array));
  localStorage.setItem("cart_quantities", JSON.stringify(cart_quantities));
}

export function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem("cart");
  const savedQuantities = localStorage.getItem("cart_quantities");
  if (savedCart) {
    cart_array.length = 0;
    const parsed = JSON.parse(savedCart);
    parsed.forEach((item) => cart_array.push(item));
  }
  if (savedQuantities) {
    const parsedQ = JSON.parse(savedQuantities);
    Object.keys(parsedQ).forEach((k) => (cart_quantities[k] = parsedQ[k]));
  }
  updateCart(globalProduse);
}

export function updateCart(produse) {
  let suma_total = 0;
  const getCart = document.querySelector(".s_cart_middle");
  if (!getCart) return;

  getCart.innerHTML = "";
  for (let i = 0; i < cart_array.length; i++) {
    const id_checker = cart_array[i];
    for (let j = 0; j < produse.length; j++) {
      const produse_id_checker = produse[j].id;
      if (String(id_checker) === String(produse_id_checker)) {
        const qty = cart_quantities[id_checker] || 1;
        getCart.innerHTML += `
          <div class="cart_card" data-id="${id_checker}">
            <img src="${produse[j].imagine_produs}"></img>
            <div class="flex_all_but_image">
              <div class="c_c_name_price">
                <h2>${produse[j].denumire_produs} (${
          produse[j].gramaj_produs
        }g)</h2>
                <h2 class="pret_produs_in_cart" data-usd="${(
                  produse[j].pret_produs * qty
                ).toFixed(2)}">$${(produse[j].pret_produs * qty).toFixed(
          2
        )}</h2>
              </div>
              <div class="quantity_buttons">
                <div class="minus_quantity">-</div>
                <div class="indicator_quantity">${qty}</div>
                <div class="plus_quantity">+</div>
              </div>
            </div>
          </div>
        `;
        suma_total += parseFloat(produse[j].pret_produs) * qty;
      }
    }
  }
  UpdateCartCounter(cart_array.length);
  UpdateTotalPrice(suma_total);
  assignCheckoutButtonFunctionality();
  convertCurrency(document.querySelectorAll(".pret_produs_in_cart"), lang);
  translatePage(lang);

  // Add quantity button listeners
  document.querySelectorAll(".cart_card").forEach((card) => {
    const id = card.getAttribute("data-id");
    const plusBtn = card.querySelector(".plus_quantity");
    const minusBtn = card.querySelector(".minus_quantity");
    const indicator = card.querySelector(".indicator_quantity");
    plusBtn.addEventListener("click", () => {
      cart_quantities[id] = (cart_quantities[id] || 1) + 1;
      saveCartToLocalStorage();
      updateCart(globalProduse);
    });
    minusBtn.addEventListener("click", () => {
      if ((cart_quantities[id] || 1) > 1) {
        cart_quantities[id] = cart_quantities[id] - 1;
        saveCartToLocalStorage();
        updateCart(globalProduse);
      } else {
        // Remove from cart if quantity goes to 0
        delete cart_quantities[id];
        const idx = cart_array.indexOf(id);
        if (idx !== -1) cart_array.splice(idx, 1);
        saveCartToLocalStorage();
        updateCart(globalProduse);
      }
    });
  });
}

export function UpdateTotalPrice(suma_total) {
  const getPriceTotal = document.querySelector(".total-price-value");

  if (!getPriceTotal) return;

  getPriceTotal.setAttribute("data-usd", suma_total.toFixed(2));
  getPriceTotal.textContent = `$${suma_total.toFixed(2)}`;
  console.log(getPriceTotal, "anif");
  convertCurrency([getPriceTotal], lang);
}

export function UpdateCartCounter(total_items_in_cart) {
  const getCounterCart = document.querySelector(".s_c_c");
  const getItemsTotal = document.querySelector(".total-items-value");

  getCounterCart.textContent = total_items_in_cart;
  getItemsTotal.textContent = `${total_items_in_cart}`;
}

export function deleteCartItems() {
  cart_array.length = 0;
  Object.keys(cart_quantities).forEach((k) => delete cart_quantities[k]);
  localStorage.removeItem("cart");
  localStorage.removeItem("cart_quantities");
  loadCartFromLocalStorage();
  updateCart(globalProduse);
  alertSucces("Cart Emptied");
  assignCheckoutButtonFunctionality();
}

export function assignCheckoutButtonFunctionality() {
  const checkoutBtn = document.querySelector(".chk_bttn");

  const newBtn = checkoutBtn.cloneNode(true);
  checkoutBtn.parentNode.replaceChild(newBtn, checkoutBtn);

  if (!cart_array || cart_array.length === 0) {
    newBtn.disabled = true;
    newBtn.classList.add("disabled");
    return;
  }

  newBtn.disabled = false;
  newBtn.classList.remove("disabled");
  newBtn.addEventListener("click", () => {
    location.assign("../CHECKOUT_PAGE/checkout_page.html");
  });
}
