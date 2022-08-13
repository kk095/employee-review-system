let navbar = document.querySelector(".nav_links");
let i = document.querySelector(".bars");
function phoneNavbar() {
  // function will run when bars will click
  document.addEventListener("click", () => {
    if (navbar.classList[1] == "nav_dis") {
      navbar.classList.remove("nav_dis");
    } else {
      navbar.classList.add("nav_dis");
    }
  });
}

if (window.innerWidth <= 500) {
  phoneNavbar();
}
document.addEventListener("resize", () => {
  if (window.innerWidth <= 500) {
    phoneNavbar();
  }
});
