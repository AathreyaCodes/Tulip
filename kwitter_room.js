var firebaseConfig = {
      apiKey: "AIzaSyB9xvjshUjzTusH8ErM6J15_rOdkjEbSfY",
      authDomain: "kwitter-social-media-c0fa9.firebaseapp.com",
      databaseURL: "https://kwitter-social-media-c0fa9-default-rtdb.firebaseio.com",
      projectId: "kwitter-social-media-c0fa9",
      storageBucket: "kwitter-social-media-c0fa9.appspot.com",
      messagingSenderId: "326766669415",
      appId: "1:326766669415:web:9326dd8aee7e6353d3eec2",
      measurementId: "G-PX9XG8YDB3"
};
    
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name"); 
document.getElementById("user_name").innerHTML = "Welcome, " + user_name + "!";

function addRoom(){
      room_name = document.getElementById("room_name").value;

      firebase.database().ref("/").child(room_name).update({
            purpose : "adding room name"
      })

      localStorage.setItem("room_name", room_name);

      window.location= "kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function(snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function(childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  
                  // Create card element for each room
                  const roomCard = document.createElement('div');
                  roomCard.className = 'room-card';
                  roomCard.id = Room_names;
                  roomCard.onclick = function() {
                        redirecToRoomName(this.id);
                  };
                  
                  // Add room name inside card
                  const roomName = document.createElement('h4');
                  roomName.className = 'room-name';
                  roomName.textContent = Room_names;
                  roomCard.appendChild(roomName);
                  
                  document.getElementById("output").appendChild(roomCard);
            });
      });
}
getData();

function redirecToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}

/* 
Required modifications in other files:

1. kwitter_room.html should have:
   - A div with id="output" and class="rooms-grid"
   
2. style.css should have:
   - .rooms-grid styling with grid layout
   - .room-card styling with gradients and hover effects
   - .room-name styling for text inside cards
   
The HTML and CSS modifications shown in the chat history will handle
the visual styling and layout of the cards. This JS code creates
the basic structure that those styles will be applied to.
*/
