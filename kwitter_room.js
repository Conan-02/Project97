// Your web app's Firebase configuration
var firebaseConfig = {
      apiKey: "AIzaSyC3X2QsqzBpG61_YFFvTnJ5V1AQDKucXE0",
      authDomain: "kwitter-f6530.firebaseapp.com",
      databaseURL: "https://kwitter-f6530-default-rtdb.firebaseio.com",
      projectId: "kwitter-f6530",
      storageBucket: "kwitter-f6530.appspot.com",
      messagingSenderId: "523270584276",
      appId: "1:523270584276:web:1304cbb55d88ccb9a44841"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("username");
document.getElementById("usernameDisplay").innerHTML = "Welcome " + username;

function addRoom() {
      roomName = document.getElementById("roomnameI").value;
      firebase.database().ref("/").child(roomName).update({
            purpose: "add room"
      });
      localStorage.setItem("roomname", roomName);
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function(childSnapshot) {
      childKey  = childSnapshot.key;
      roomNames = childKey;
      console.log("added room = " + roomNames);
      row = "<div class='room_name' id="+ roomNames +" onclick='redirectToRoomName(this.id)'>#" + roomNames + "</div><hr>";
      document.getElementById("output").innerHTML += row;
      });});}

getData();

function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("clickedRoomName", name);

      window.location = "kwitter_page.html";
}

function logout() {
      window.location = "index.html";
}
