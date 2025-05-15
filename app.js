const open = document.querySelector("#open");
const close = document.querySelector("#close");
const links = document.querySelector(".links");
const sub = document.querySelector("#sub");
const adding = document.querySelector("#add");
const numbers = document.querySelector("#num");
let quantity = 1;

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

const productLinks = document.querySelectorAll(".tLink");

productLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const product = link.closest(
      ".product, .product3, .product4, .products1, .products2, .product1, .product2, .shirt, .shirt1, .shirt2"
    );

    if (product) {
      const imageEl = product.querySelector(".tImg");
      const headerEl = product.querySelector(".tHead");
      const priceEl = product.querySelector(".tPrice");

      if (imageEl && headerEl && priceEl) {
        const image = imageEl.src;
        const header = headerEl.textContent;
        const price = priceEl.textContent;

        localStorage.setItem("productImage", image);
        localStorage.setItem("productHeader", header);
        localStorage.setItem("productPrice", price);
        console.log("redirecting now......");
        window.location.href = "items.html";
      }
    }
  });
});

window.onload = () => {
  const img = localStorage.getItem("productImage");
  const title = localStorage.getItem("productHeader");
  const price = localStorage.getItem("productPrice");

  const mainImg = document.querySelector("#mainImg");
  const heading = document.querySelector("#heading");
  const shirtPrice = document.querySelector("#shirtPrice");

  if (img && mainImg) mainImg.src = img;
  if (title && heading) heading.textContent = title;
  if (price && shirtPrice) shirtPrice.textContent = price;
};

adding.addEventListener("click", () => {
  quantity++;
  numbers.textContent = quantity;
});
sub.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    numbers.textContent = quantity;
  }
});
