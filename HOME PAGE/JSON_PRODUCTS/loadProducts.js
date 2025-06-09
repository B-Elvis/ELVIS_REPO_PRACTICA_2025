// JSON_PRODUCTS/loadProducts.js

import { injectCards } from "../JSON_PRODUCTS/inject_product_cards.js";
import { updateCart } from "../../COMPONENTS/CART/cart_function.js";

export let globalProduse = [];
export let globalHeadings = [];

export async function loadProducts(lang = "en", shouldInject = false) {
  try {
    const [produse, header_produse] = await Promise.all([
      fetch("../HOME PAGE/JSON_PRODUCTS/produse.json").then((res) =>
        res.json()
      ),
      fetch("../HOME PAGE/JSON_PRODUCTS/headings.json").then((res) =>
        res.json()
      ),
    ]);

    globalProduse.length = 0;
    globalProduse.push(...produse);

    globalHeadings.length = 0;
    globalHeadings.push(...header_produse);

    if (shouldInject) {
      injectCards(produse, header_produse, lang);
    }

    updateCart(produse);
  } catch (e) {
    console.error("Eroare la încărcare JSON-uri:", e);
  }
}
