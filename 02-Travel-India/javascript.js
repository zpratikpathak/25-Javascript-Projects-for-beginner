const slideShow = document.getElementById("slideshow");
const slides = slideShow.getElementsByTagName("video");
var index = 0;

const slideShowText = document.getElementById("slideShowText");
const slidesText = slideShowText.getElementsByTagName("div");
var i = 0;

document.getElementById("prevSlide").addEventListener("click", () => {
  slides[index].classList.remove("active");
  index = (index - 1 + slides.length) % slides.length;
  slides[index].classList.add("active");

  slidesText[i].classList.remove("active");
  i = (i - 1 + slidesText.length) % slidesText.length;
  slidesText[i].classList.add("active");
});

document.getElementById("nextSlide").addEventListener("click", () => {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");

  slidesText[i].classList.remove("active");
  i = (i + 1) % slidesText.length;
  slidesText[i].classList.add("active");
});

// function toggleMenu() {
//   const menuIcon = document.querySelector(".menuIcon");
//   menuIcon.classList.toggle("active");
// }

document.getElementById("menuIcon").addEventListener("click", () => {
  const menuIcon = document.querySelector(".menuIcon");
  const navbar = document.getElementById("navbar");
  menuIcon.classList.toggle("active");
  navbar.classList.toggle("active");
});
