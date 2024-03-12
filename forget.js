
let submit_data =document.getElementById("submit-data");
let forgetEmail=document.querySelector(".forgetEmail");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
const firebaseConfig = {
      apiKey: "AIzaSyCcicHvJR8SsPppjverjAVmWUbxz4fWRrU",
      authDomain: "final-venue-booking.firebaseapp.com",
      projectId: "final-venue-booking",
      storageBucket: "final-venue-booking.appspot.com",
      messagingSenderId: "130315557712",
      appId: "1:130315557712:web:10ee9fc8cea3aeb1d7ea55"
    };
    
    // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
submit_data.addEventListener("click",(e)=>{
      e.preventDefault()
      sendPasswordResetEmail(auth,forgetEmail.value)
      .then(() => {
            forgetEmail ="";
            alert("Mail Sent");
            window.location.href = "login.html"

      })
      .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
      });
})