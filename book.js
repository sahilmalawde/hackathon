import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase,ref,child,get,update} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const database = getDatabase();
document.getElementById("search").addEventListener('click',(e)=>{
  var opt = document.getElementById('opt').value;
  get(child(ref(database),'books/'+opt))
  .then((snapshot)=>{
    var data = snapshot.val();
    document.getElementById('r11').innerText=data.id
    document.getElementById('r12').innerText=data.name
    document.getElementById('r13').innerText=data.user
    document.getElementById('r14').innerText=data.DOI
    document.getElementById('r15').innerText=data.DOS
    document.getElementById('r16').innerText=data.status
    if(data.status == "available"){
      document.getElementById('r16').style.color = "green" ;
    }
    else if(data.status == "Due"){
      document.getElementById('r16').style.color = "red" ;
    }
    else if(data.status == "waiting for approval"){
      document.getElementById('r16').style.color = "grey" ;
    }
    else if(data.status == "issued"){
      document.getElementById('r16').style.color = "rgb(151, 4, 117)" ;
    }
    
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  alert(errorMessage);})
})

document.getElementById("approve").addEventListener('click',changestat);

function changestat(){
  var opt = document.getElementById('opt').value;
  var updates = {
    status : "available"
  }
  update(ref(database,"books/" + opt),updates)
  .then(()=>{
    alert("updated!")
    window.location.href = "book.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);})
  

}










    






