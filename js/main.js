var signName = document.getElementById("signNameInput");
var signEmail = document.getElementById("signEmailInput");
var signPass = document.getElementById("signPassInput");

var logEmailInput = document.getElementById("logEmailInput");
var logPassInput = document.getElementById("logPassInput");
var logBtn = document.getElementById("logBtn");
var inValidMessage = document.getElementById("inValidMessage");
var signErrorMessage = document.getElementById("signErrorMessage");
var signSucessMessage = document.getElementById("signSucessMessage");
var logOut = document.getElementById("logOut");
var currentUser;
// sign up
var users = JSON.parse(localStorage.getItem("users")) || [];

function isEmailExsit() {
  for (var i = 0; i < users.length; i++) {
    if (users[i].email == signEmail.value) {
      return true;
    }
  }
  return false;
}

function signUp() {
  if (isEmailExsit()) {
    signSucessMessage.classList.add("d-none");
    signErrorMessage.classList.remove("d-none");
    signErrorMessage.classList.add("d-block");
  } else if (
    signName.value != "" &&
    signEmail.value != "" &&
    signPass.value != ""
  ) {
    var user = {
      name: signName.value,
      email: signEmail.value,
      password: signPass.value,
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    signSucessMessage.classList.remove("d-none");
    signErrorMessage.classList.add("d-none");
  }
}

// log in
function validateLogin() {
  for (var i = 0; i < users.length; i++) {
    if (
      users[i].email == logEmailInput.value &&
      users[i].password == logPassInput.value
    ) {
      localStorage.setItem("currentUser", i);
      return true;
    }
  }
  return false;
}

if (logBtn) {
  logBtn.addEventListener("click", function () {
    if (validateLogin()) {
      location.href = "home.html";
    } else {
      inValidMessage.classList.remove("d-none");
    }
  });
}

function welcomeUser() {
  currentUser = localStorage.getItem("currentUser");  // ← FIXED!
 
    document.getElementById("user").innerHTML = `${users[currentUser].name}`;
  
}

// Only call welcomeUser if we're on the home page
if (document.getElementById("user")) {
  welcomeUser();
}

// home - logout
if (logOut) {
  logOut.addEventListener("click", function () {
    localStorage.removeItem("currentUser");  // Clear session
    location.href = "index.html";
  });
}