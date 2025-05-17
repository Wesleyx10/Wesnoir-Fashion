const paymentLinks = {
  "T-shirt With Tape Details":
    "https://buy.stripe.com/test_7sYeVc6UdbrS5Jg9WI9fW01",
  "Skinny Fit Jeans": "https://buy.stripe.com/test_fZu7sKa6pfI80oWecY9fW00",
  "Checkered Shirt": "https://buy.stripe.com/test_14A9AS4M5eE4efM4Co9fW02",
  "Sleeve Stripped T-shirt":
    "https://buy.stripe.com/test_fZu5kCguN7bC5Jgc4Q9fW03",
  "Vertical Striped Shirt":
    "https://buy.stripe.com/test_eVq5kC5Q90Ne3B81qc9fW04",
  "Courage Graphic T-Shirt":
    "https://buy.stripe.com/test_6oU4gy4M5brS2x4ecY9fW05",
  "Loose Fit Bermuda Shorts":
    "https://buy.stripe.com/test_3cI3cu6UdeE4fjQc4Q9fW06",
  "Faded Skinny Jeans": "https://buy.stripe.com/test_9B6dR8guN53ub3Ac4Q9fW07",
  "Polo With Tipping Details":
    "https://buy.stripe.com/test_8x28wOa6p8fGfjQ6Kw9fW08",
  "Gradient Graphic T-shirt":
    "https://buy.stripe.com/test_6oU6oG1zTgMc0oW8SE9fW09",
  "Polo With Contrast Trims":
    "https://buy.stripe.com/test_cNi8wO1zT0Ne3B84Co9fW0a",
  "Black Striped T-shirt":
    "https://buy.stripe.com/test_3cI6oGbat8fGc7EecY9fW0b",
  "Faded Black Jeans": "https://buy.stripe.com/test_fZudR83I1eE48Vs3yk9fW0c",
  "Black Denim Jacket": "https://buy.stripe.com/test_4gMfZg92l67y6Nk1qc9fW0d",
  "Air Max": "https://buy.stripe.com/test_7sY6oG0vP1RifjQd8U9fW0e",
  "Black Leather Oxfords":
    "https://buy.stripe.com/test_bJe00i5Q9anO7Rob0M9fW0f",
  "Brown Leather Oxfords":
    "https://buy.stripe.com/test_aFafZgbat2Vm3B8d8U9fW0g",
  "Sleek Sneakers": "https://buy.stripe.com/test_7sY3cu3I1cvWdbI6Kw9fW0h",
};

document.addEventListener("DOMContentLoaded", () => {
  const payButton = document.getElementById("paymentBtn");

  if (payButton) {
    payButton.addEventListener("click", () => {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      if (cartItems.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      const firstItem = cartItems[0];
      const productName = firstItem.title;

      const link = paymentLinks[productName];

      if (link) {
        window.location.href = link;
      } else {
        alert("No payment link found for this product.");
      }
    });
  }
});
