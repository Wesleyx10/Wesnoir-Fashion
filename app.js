const open = document.querySelector("#open");
const close = document.querySelector("#close");
const links = document.querySelector(".links");

open.addEventListener("click", () => {
  close.style.display = "block";
  open.style.display = "none";
  links.style.display = "flex";
});
close.addEventListener("click", () => {
  open.style.display = "block";
  close.style.display = "none";
  links.style.display = "none";
});
