function onPageLoad() {
  var F_Name = sessionStorage.getItem("f_name");
  var L_Name = sessionStorage.getItem("l_name");
  var Email = sessionStorage.getItem("userName_R");
  var Password = sessionStorage.getItem("password_R");
  var Full_Name = F_Name + " " + L_Name;
  var name = document.getElementById("Full_Name");
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  name.value = Full_Name;
  email.value = Email;
  password.value = Password;
}

function closeDetails() {
  window.location.href = "../index.html";
}

function resetSession() {
  sessionStorage.clear();
  window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", function (event) {
  // Call onPageLoad when the DOM content is fully loaded
  onPageLoad();
});
