export function createCarouselComponent() {
  const Carousel = document.createElement("div");
  Carousel.classList.add("image-carousel");
  Carousel.innerHTML = `
  <div class="carousel-wrapper">
        <div class="carousel-track">
          <div class="carousel-item">
            <img
              src="https://img.freepik.com/premium-photo/thanksgiving-day-roasted-turkey-festive-autumn-decoration-copy-space-background_916191-185403.jpg"
              alt=""
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://img.freepik.com/premium-photo/top-view-italian-food-with-copy-space_23-2148574171.jpg"
              alt=""
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://img.freepik.com/premium-photo/fresh-vegetable-salad-healthy-food_93675-132452.jpg"
              alt=""
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://img.freepik.com/premium-photo/delicious-pizza-wooden-table_93675-132194.jpg"
              alt=""
            />
          </div>
        </div>
      </div>

      <div class="control_carousel_wrapper">
        <div id="left_slide"></div>
        <div id="right_slide"></div>
      </div>
  `;

  document.getElementsByTagName(
    "head"
  )[0].innerHTML += `<link rel="stylesheet" href="../COMPONENTS/IMAGE_CAROUSEL/img_carousel_styles.css" />`;

  document
    .getElementsByClassName("nav_all")[0]
    .insertAdjacentElement("afterend", Carousel);

  // --- Carousel Logic ---
  const track = Carousel.querySelector(".carousel-track");
  const slides = Array.from(Carousel.querySelectorAll(".carousel-item"));
  const leftButton = Carousel.querySelector("#left_slide");
  const rightButton = Carousel.querySelector("#right_slide");
  let currentIndex = 0;

  function updateSlidePosition() {
    const container = Carousel.querySelector(".carousel-wrapper");
    const slideWidth = container.offsetWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  function goToNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePosition();
  }

  function goToPrevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlidePosition();
  }

  rightButton.addEventListener("click", goToNextSlide);
  leftButton.addEventListener("click", goToPrevSlide);

  window.addEventListener("resize", updateSlidePosition);
  window.addEventListener("load", updateSlidePosition);

  // --- Auto Slide ---
  setInterval(goToNextSlide, 10000); // 10 secunde
}
