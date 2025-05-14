import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBG20no3XF_uFWu5RX-hkqS4YEjjxPYxgc",
  authDomain: "wesnoir-fashion.firebaseapp.com",
  projectId: "wesnoir-fashion",
  storageBucket: "wesnoir-fashion.firebasestorage.app",
  messagingSenderId: "638215644793",
  appId: "1:638215644793:web:7ba1eab7963d738f9f96a8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const button = document.querySelector("#send");

if (button) {
  button.addEventListener("click", async (e) => {
    e.preventDefault();
    const firstName = document.querySelector("#name1").value;
    const secondName = document.querySelector("#name2").value;
    const email = document.querySelector("#email").value;
    const number = document.querySelector("#number").value;
    const message = document.querySelector("#message").value;
    const popup = document.querySelector("#popup");

    // Check if all fields are filled
    if (!firstName || !secondName || !email || !number || !message) {
      alert("Please Fill In All Fields");
      return;
    }

    const data = {
      firstName,
      secondName,
      email,
      number,
      message,
    };

    try {
      // Firebase: Add feedback
      await addDoc(collection(db, "UserFeedback"), data);
      popup.style.opacity = 1;
      popup.style.right = "50px";
      setTimeout(() => {
        popup.style.right = "-340px";
      }, 3000);
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } catch (err) {
      console.log("Can't Send Feedback", err);
    }
  });
}
