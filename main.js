// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, set } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZ-3myzZ6ZGSOzl2PPeQfLfuk2VVKL2LY",
    authDomain: "class-chatting-f0676.firebaseapp.com",
    projectId: "class-chatting-f0676",
    storageBucket: "class-chatting-f0676.appspot.com",
    messagingSenderId: "908020593712",
    appId: "1:908020593712:web:bf54b3285f7116890ba9f5",
    databaseURL: "https://class-chatting-f0676-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const chatRef = ref(db, "/chat");

// listens for database changes
onChildAdded(chatRef, function (data) {

    // create element and append to list element
    const message = document.createElement("li")
    message.innerText = new Date(data.key).toLocaleDateString("fi-FI") + ": " + data.val();

    list.appendChild(message)
})

const input = document.querySelector("input");
const list = document.querySelector("ul")

input.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {

        // create 'unique' id for message
        const messageId = new Date().toUTCString();

        // send to database
        set(ref(db, "chat/" + messageId), input.value)


        // clear input
        input.value = "";
    }
})
