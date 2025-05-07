// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const auth = getAuth(app);
const db = getFirestore(app);
const signup = document.querySelector("#sign");
const login = document.querySelector("#login");

if (signup) {
  signup.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    if (!email || !password) {
      alert("Please Fill In All Fields");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userData = {
          uid: user.uid,
          email: user.email,
        };

        try {
          await setDoc(doc(db, "users", user.uid), userData);
          console.log("Successfully Created Account");
          alert("✨ Welcome to the bold side.");
          window.location.href = "login.html";
        } catch (err) {
          console.log("Cannot Create User");
          alert("Error saving user data.");
        }
      })
      .catch((error) => {
        console.error("Signup error:", error.message);
        alert("Signup failed: " + error.message);
      });
  });
}

if (login) {
  login.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.querySelector("#mail").value;
    const password = document.querySelector("#pass").value;
    signInWithEmailAndPassword(auth, email, password).then(
      async (userCredential) => {
        const user = userCredential.user;
        try {
          const userDocData = await getDoc(doc(db, "users", user.uid));
          if (userDocData.exists()) {
            alert("Welcome To WesNoir!");
            window.location.href = "main.html";
          } else {
            alert("User Not Found");
          }
        } catch (err) {
          console.log(err);
          alert("Kindly Create An Account");
        }
      }
    );
  });
}
