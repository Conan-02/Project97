function addUser() {
    username = document.getElementById("usernameI").value;
    localStorage.setItem("username", username);

    window.location = "kwitter_room.html";
}