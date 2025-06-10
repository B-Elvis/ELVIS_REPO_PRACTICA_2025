export function createFooterComponent() {
  const Footer = document.createElement("div");
  Footer.classList.add("footer_all");
  Footer.innerHTML = `
  <div class="animation_footer">
  <div class="wrapper_animation">
      <div class="middle-side">
    <a id="call_us" href="tel:+123456789">
      <div class="phone-icon"></div>
    <div class="call-text">
      <p>Need help?</p>
      <h2>Call Us Now</h2>
    </div>
  </div>
    </a>

      <div class="middle-side">
    <a id="call_us" href="tel:+123456789">
      <div class="phone-icon"></div>
    <div class="call-text">
      <p>Feel Hungry?</p>
      <h2>Call Us Now</h2>
    </div>
  </div>
    </a>

      <div class="middle-side">
    <a id="call_us" href="tel:+123456789">
      <div class="phone-icon"></div>
    <div class="call-text">
      <p>Host a Party?</p>
      <h2>Call Us Now</h2>
    </div>
  </div>
    </a>

      <div class="middle-side">
    <a id="call_us" href="tel:+123456789">
      <div class="phone-icon"></div>
    <div class="call-text">
      <p>Mom Left?</p>
      <h2>Call Us Now</h2>
    </div>
  </div>
    </a>

      <div class="middle-side">
    <a id="call_us" href="tel:+123456789">
      <div class="phone-icon"></div>
    <div class="call-text">
      <p>Best Prices?</p>
      <h2>Call Us Now</h2>
    </div>
  </div>
    </a>
  </div>
  <div class="wrapper_animation">
      <div class="middle-side">
    <a id="call_us" href="tel:+123456789">
      <div class="phone-icon"></div>
    <div class="call-text">
      <p>Need help?</p>
      <h2>Call Us Now</h2>
    </div>
  </div>
    </a>

      <div class="middle-side">
    <a id="call_us" href="tel:+123456789">
      <div class="phone-icon"></div>
    <div class="call-text">
      <p>Feel Hungry?</p>
      <h2>Call Us Now</h2>
    </div>
  </div>
    </a>

      <div class="middle-side">
    <a id="call_us" href="tel:+123456789">
      <div class="phone-icon"></div>
    <div class="call-text">
      <p>Host a Party?</p>
      <h2>Call Us Now</h2>
    </div>
  </div>
    </a>

      <div class="middle-side">
    <a id="call_us" href="tel:+123456789">
      <div class="phone-icon"></div>
    <div class="call-text">
      <p>Mom Left?</p>
      <h2>Call Us Now</h2>
    </div>
  </div>
    </a>

      <div class="middle-side">
    <a id="call_us" href="tel:+123456789">
      <div class="phone-icon"></div>
    <div class="call-text">
      <p>Best Prices?</p>
      <h2>Call Us Now</h2>
    </div>
  </div>
    </a>
  </div>
  </div>
  
      <div class="underfooter">
        
        <ul class="uf_bttns">
          <li><a href="../MENU_PAGE/menu_page.html" data-i18n="menu">MENU</a></li>
          <li><a href="../ABOUT_PAGE/about_page.html" data-i18n="about_us">ABOUT US</a></li>
          <li><a href="../REVIEWS_PAGE/reviews.html" data-i18n="reviews">REVIEWS</a></li>
          <li><a href="../CONTACT_PAGE/contact_page.html" data-i18n="contact_us">CONTACT</a></li>
          <li><a href="../PROFILE_PAGE/profile.html" data-i18n="account">ACCOUNT</a></li>
        </ul>

        <div class="rsuf">
          <h4 data-i18n="our_newsletter">Our Newsletter</h4>
        <div class="i-b-wrapper">
            <input type="text" name="" id="" placeholder="Your Email Address" data-i18n-placeholder="your_email_address" />
            <button data-i18n="subscribe">Subscribe</button>
          </div>

          </div>
       
      </div>


      <footer>
        
        <div class="stn-wrapper">
       

          


           <div class="left-side">
        <div class="bimgtitle">
          <img src="https://www.svgrepo.com/show/33388/pizza.svg" alt="" />
          <h1>Banqueta</h1>
          </div>
           <div class="socialicons">
          <a href=""></a>
          <a href=""></a>
          <a href=""></a>
          </div>
        </div>

        <div class="ul_lists">
        <ul>
        <p>Contacts</p>
        <li><p>+37369990090</p></li>
        <li><p>banqueta@gways.com</p></li>
        </ul>
        <ul>
        <p>Address</p>
        <li><p>Florilor 32/1, Chisinau</p></li>
        <li><p>Sperantei 15/6, Balti</p></li>
        </ul>
        <ul>
        <p>Policies</p>
        <li><p>Quality Notice</p></li>
        <li><p>Privacy Notice</p></li>
        </ul>
        </div>
        </div>
      </footer>


      <div class="last_underfooter">
        <div class="p_wrapper_lu">
          <p>MADE BY Elvis Babara™ | W-2231 | CEITI | All Rights Reserved</p>
        </div>
      </div>
    </div>
  `;

  document.getElementsByTagName(
    "head"
  )[0].innerHTML += `<link rel="stylesheet" href="../COMPONENTS/FOOTER/COMP_FOOTER_CSS.css" />`;
  document.getElementsByTagName("body")[0].appendChild(Footer);

  // Adaugă funcționalitate pentru butonul ACCOUNT din footer:
  const accountBtn = Footer.querySelector(".uf_bttns li:last-child a");
  if (accountBtn) {
    accountBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const logged = localStorage.getItem("loggedInUser");
      if (logged) {
        window.location.href = "/PROFILE_PAGE/profile.html";
      } else {
        window.location.href = "/LOGIN_PAGE/login_page.html";
      }
    });
  }
}
