const open_nav = document.querySelector(".fa-bars");
const close_nav = document.querySelector(".x-mark");
const nav_active = document.querySelectorAll(".active-open");

open_nav.addEventListener("click", (elem) => {
  nav_active.forEach((elem) => {
    elem.classList.add("activate");
    console.log(`${elem} "open"`);
    /*   open_nav = document.body = "overflow:hidden;"; */
  });
});
close_nav.addEventListener("click", (elem) => {
  nav_active.forEach((elem) => {
    elem.classList.remove("activate");
    console.log(`${elem} "open"`);
    /*   open_nav = document.body = "overflow:hidden;"; */
  });
});

const main_img = document.getElementById("main-img");
const list_img = document.getElementsByClassName("list-img");

list_img[0].onclick = function () {
  main_img.src = list_img[0].src;
};
list_img[1].onclick = function () {
  main_img.src = list_img[1].src;
  if (!true) console.log("NotChanged");
  else {
    console.log("Changed");
  }
};
list_img[2].onclick = function () {
  main_img.src = list_img[2].src;
};
list_img[3].onclick = function () {
  main_img.src = list_img[3].src;
};

console.log(new Date());
