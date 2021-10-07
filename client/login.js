

function logIn() {

  const userid = document.getElementById(`userid`).value;
  const password = document.getElementById(`password`).value;
  
  let valueCheck = "";

  fetch(`http://localhost:3000/user/login`, {
    method: "POST",
    headers: { 'Content-type': "application/json" },
    body: JSON.stringify({ "user_id": userid, "password": password })
  })
  .then(response => response.json())
  .then(userData => {
    sessionStorage.setItem("userid", userData['user_id']);
    sessionStorage.setItem("user", userData['First_Name'] + ' ' + userData['Last_Name'] );
    window.location.href = 'index.html';
  })
  .catch((error) => {
    console.log("error", error)
    alert('Wrong username/password... please try again')
  });
}

const userid = document.getElementById(`userid`);
const password = document.getElementById(`password`);

// This allows us to login by hitting the 'Enter' key
userid.addEventListener("keypress", function(event) {
  if (event.defaultPrevented) return;
  
  switch (event.key) {
    case "Enter":
      logIn();
      break;
    default:
      return;
  }
  event.preventDefault();
});

// This allows us to login by hitting the 'Enter' key
// when cursor at password form
password.addEventListener("keypress", function(event) {
  if (event.defaultPrevented) return;

  switch (event.key) {
    case "Enter":
      logIn();
      break;
    default:
      return;
  }
  event.preventDefault();
});
