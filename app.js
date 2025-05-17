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
      const imageItem = product.querySelector(".tImg");
      const headerItem = product.querySelector(".tHead");
      const priceItem = product.querySelector(".tPrice");
      const paymentLink = product.getAttribute("data-payment-link");

      if (imageItem && headerItem && priceItem) {
        const image = imageItem.src;
        const header = headerItem.textContent;
        const price = priceItem.textContent;

        localStorage.setItem("productImage", image);
        localStorage.setItem("productHeader", header);
        localStorage.setItem("productPrice", price);
        localStorage.setItem("productPaymentLink", paymentLink);

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
  const paymentLink = localStorage.getItem("productPaymentLink");

  const mainImg = document.querySelector("#mainImg");
  const heading = document.querySelector("#heading");
  const shirtPrice = document.querySelector("#shirtPrice");

  if (img && mainImg) mainImg.src = img;
  if (title && heading) heading.textContent = title;
  if (price && shirtPrice) shirtPrice.textContent = price;
  if (paymentLink) {
    localStorage.setItem("currentPaymentLink", paymentLink);
  }
};

if (adding && sub) {
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
}

const sizeButton = document.querySelectorAll("#sizeBtn");
let selectedSize = "";

if (sizeButton.length > 0) {
  sizeButton.forEach((btn) => {
    btn.addEventListener("click", () => {
      sizeButton.forEach((b) => {
        b.style.backgroundColor = "";
        b.style.color = "";
      });
      btn.style.backgroundColor = "#6D7F67";
      btn.style.color = "white";
      selectedSize = btn.textContent;
      console.log("Selected size:", selectedSize);
    });
  });
}

const cartButton = document.querySelector("#cartBtn");
if (cartButton) {
  cartButton.addEventListener("click", () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const product = document.querySelector(".item");
    const image = product.querySelector("#mainImg").src;
    const title = product.querySelector("#heading").textContent;
    const price = product.querySelector("#shirtPrice").textContent;
    const paymentLink = localStorage.getItem("currentPaymentLink");

    const newItem = {
      image,
      title,
      price,
      size: selectedSize,
      paymentLink,
    };

    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    cart.push(newItem);
    localStorage.setItem("cartItems", JSON.stringify(cart));

    alert("Item added to cart!");
    window.location.reload();
  });
}

const container = document.querySelector(".orders");
if (container) {
  const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartItems = container.querySelectorAll(".order");
  cart.forEach((item, index) => {
    const cartItem = cartItems[index];
    if (cartItem) {
      cartItem.querySelector(".cartImg").src = item.image;
      cartItem.querySelector(".cartHead").textContent = item.title;
      cartItem.querySelector(".cartPrice").textContent = item.price;
      cartItem.querySelector(".cartSize").textContent = `Size: ${item.size}`;
    }
  });
}

const deleteButtons = container.querySelectorAll(".deleteBtn");

deleteButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    cart.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cart));

    const orderItem = btn.closest(".order");
    if (orderItem) {
      orderItem.remove();
    }

    const payment = document.querySelector(".payment");
    if (payment) {
      payment.style.display = "none";
    }
  });
});

const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

let subtotal = 0;
cart.forEach((item) => {
  const price = parseFloat(item.price.replace("$", ""));
  subtotal += price;
});

const deliveryFee = 15;
const total = subtotal + deliveryFee;

// Update DOM
document.getElementById("subTotalPrice").textContent = `$${subtotal}`;
document.getElementById("finalPrice").textContent = `$${total}`;
document.getElementById("deliveryPrice").textContent = `$${deliveryFee}`;
