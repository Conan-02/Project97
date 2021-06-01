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

roomName = localStorage.getItem("clickedRoom");
username = localStorage.getItem("username")

function send() {
      msg = document.getElementById("chatI").value;
      localStorage.setItem("msg", msg);

      firebase.database().ref(roomName).push({
            name: username,
            message: msg,
            likes: 0
      });
      document.getElementById("chatI").value = "";
      
      getData();
}

function getData() { firebase.database().ref("/"+roomName).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;

         console.log(firebase_message_id);
         console.log(message_data);

         name = message_data["name"];
         message = message_data["message"];
         likes = message_data["likes"];

         nameArea = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
         messageArea = "<h4 class='message_h4'>" + message + "</h4>"
         likeBtn = "<button class='btn btn-danger' id=" + firebase_message_id +" value=" + like +" onclick='like(this.id)'>"
         iconArea = "<span class='glyphicon glyphicon-thumbsup'>Likes: " + likes + "</span><button><hr>";

         row = nameArea + messageArea + likeBtn + iconArea;
         document.getElementById("output").innerHTML += row;
      } });  }); }
getData();

function like(msgId) {
      console.log(msgId + " liked");
      btnId = msgId;
      likes = Number(document.getElementById(btnId).value) + 1;
      console.log(likes);
      
      firebase.database().ref(roomName).child(msgId).update({
            likes: likes
      })
}