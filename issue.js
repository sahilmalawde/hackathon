import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase,ref,child,get,update} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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
const auth = getAuth(app);
const database = getDatabase();
// const user = auth.currentUser;
//       const userId = user.uid;
//       const userRef = ref(database, 'users/' + userId);

//       get(userRef).then((snapshot) => {
//           const userData = snapshot.val();
//           const username = userData.username;
//           return username;
//       })



document.getElementById("search").addEventListener('click',(e)=>{
  var opt = document.getElementById('opt').value;
  get(child(ref(database),'books/'+opt))
  .then((snapshot)=>{
    var data = snapshot.val();
    document.getElementById('r11').innerText=data.id
    document.getElementById('r12').innerText=data.name
    
    document.getElementById('r16').innerText=data.status
    if(data.status == "available"){
      document.getElementById('r16').style.color = "green" ;

    }
    else if(data.status == "Due"){
      document.getElementById('r16').style.color = "red" ;
      alert('book already issued');
      window.location.href = "issue.html";
    }
    else if(data.status == "waiting for approval"){
      document.getElementById('r16').style.color = "grey" ;
      alert('book already issued');
      window.location.href = "issue.html";
    }
    else if(data.status == "issued"){
      document.getElementById('r16').style.color = "rgb(151, 4, 117)" ;
      alert('book already issued');
      window.location.href = "issue.html";
    }
    
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  alert(errorMessage);})
})

document.getElementById("issue").addEventListener('click',issueBook);

function issueBook(){
  const user = auth.currentUser;
  const userId = user.uid;
  const userRef = ref(database, 'users/' + userId);

  get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const username = userData.username;
          const bookRef = ref(database, "books/"+opt);
          update(bookRef, { doi: Date.now(),user: username, status: 'issued' }).then(() => {
            alert('Book issued successfully.');
          }).catch((error) => {
            console.error('Error issuing book:', error);
          });
        } else {
          console.error('User data not found.');
        }
      }).catch((error) => {
        console.error('Error retrieving user data:', error);
      });
  var opt = document.getElementById('opt').value;
 
 

}













    




















    






