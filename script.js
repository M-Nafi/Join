/*-------------------------------------
Include HTML Templates (header/footer)
--------------------------------------*/
async function includeHTML() {
    let includeElements = document.querySelectorAll("[w3-include-html]");
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = "Page not found";
        }
    }
    checkPath();
}

let users = [];
let currentUser;

async function summaryInit(){
  await loadUsers();
  includeHTML();
  loadCurrentUser();
  greetUser();
  displayGreeting();
}


async function init() {
    loadUsers();
    renderLogIn();
}

/**
 *
 * This Function render login window
 *
 */
function renderLogIn() {
    let log_container = document.getElementById("log_container");
    log_container.innerHTML = "";
    log_container.classList.remove("height-sing-up");
    log_container.innerHTML += renderHtmlLogIn();
}
/**
 * Function for render the Sign Up window
 */
function renderSignUp() {
    let log_container = document.getElementById("log_container");
    log_container.innerHTML = "";
    log_container.classList.add("height-sing-up");
    log_container.innerHTML += renderSignUpHTML();
}

// sign up //

/**
 * function for save user data in remoteStorage, first we push infos from register inputs in array "users",
 * then we send that to remoteStorage
 */
async function registerUser() {
    let email = document.getElementById("sign_email").value;
    if (isEmailExists(email)) {
        emailExist();
    } else {
        userToRemoteStorage();
        successfulRegistration();
    }
}

async function userToRemoteStorage() {
    users.push({
        name: sign_name.value,
        email: sign_email.value,
        password: sign_password.value,
    });
    await setItem("users", JSON.stringify(users));
}
/**
 * Information that registration was successful and we will be redirected
 */
function successfulRegistration() {
  const sing_up_container = document.getElementById('sing_up_container');
  sing_up_container.innerHTML = '<span class="register-succesful">Registration successful</span>';
  
  setTimeout(() => {
    renderLogIn();
  }, 1000);
}
/**
 * 
This function checks whether email exists in Array Users
 */
function isEmailExists(email) {
    return users.some((user) => user.email === email);
}
/**This function tells us that email is available
 * 
 */
function emailExist() {
    let messageElement = document.getElementById("message");
    messageElement.innerText = "Die E-Mail ist bereits vorhanden.";
    messageElement.style.color = "red";
}

/**
 * This function load the users from remoteStorage to local array
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem("users"));
    } catch (e) {
        console.error("Loading error:", e);
    }
}

/**
 * function to check out if password and confirm password are the same, if yes change button status to clickable.
 */
function checkPass() {
    if (
        document.getElementById("sign_password").value ==
        document.getElementById("sign_password_confirm").value
    ) {
        document.getElementById("register_btn").disabled = false;
        document.getElementById("message").style.color = "green";
        document.getElementById("message").innerHTML = "matching";
    } else {
        document.getElementById("register_btn").disabled = true;
        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerHTML = "not matching";
    }
}

/**
 * This function reset  inputs fields from form
 */
function resetForm() {
    document.getElementById("sign_name").value = "";
    document.getElementById("sign_email").value = "";
    document.getElementById("sign_password").value = "";
    document.getElementById("sign_password_confirm").value = "";
}

// Log in //

/**
 * The function checks whether all operations are fulfilled, if so the user is logged in
 */
function logIn() {
  let email = document.getElementById('log_in_email').value;
  let password = document.getElementById('log_in_password').value;
  let user = logInValidation(email, password);
  if (user) {
    indexOfUser(email);
    logInSuccedMsg();
  }
  else {
    document.getElementById('log_message').innerText = 'Email or password not found';
    document.getElementById('log_message').style = 'color: red'
  }
}
/**
 * This function searches for the index in the array users of specified "email",
 * if email is found the index is stored in localStorage
 
 */
function indexOfUser(email){
  let userIndex = users.findIndex(user => user.email === email);
  localStorage.setItem('currentUserIndex', userIndex);
}
/**
 * 
 This function checks whether the same email and password are in the array
 */
function logInValidation(email, password){
 let user = users.find(u => u.email == email && u.password == password);
  return user;
}
/**
 * This function tells us that the registration was successful. Then we will be redirected to the next website
 */
function logInSuccedMsg(){
  document.getElementById('log_message').innerText = "Log in successful";
  setTimeout(() => {
      window.location.href = 'summary.html';
    }, 1000);
}
/**
 * This function loads the index number from localStorage, it is needed for further functions. so that the site knows who exactly is logged in
 */
function loadCurrentUser(){
  currentUser = localStorage.getItem('currentUserIndex');
}
/**
 * The function uses the value of index to transfer from the array Users which user should be welcomed.
 */
function greetUser(){
  let greet = document.getElementById('user_name');
  i = currentUser;
  if(i >= 0){
  greet.innerHTML = `${users[i]['name']}`;
  }
} 
/**
 * This function is for guest registration. This sets the index to -1 so that if query in greetUser() does not come into effect. and the standard greeting is displayed
 */
function logInGuest(){
  window.location.href = 'summary.html';
  userIndex = -1;
  localStorage.setItem('currentUserIndex', userIndex);
  document.getElementById('user_name') = 'Sophia Müller';
}
/**
 * This function determines the time and depending on what hour it is, a greeting is displayed accordingly
 */
function displayGreeting() {
  let today = new Date();
  let hour = today.getHours();

  let greeting;
  if (hour >= 4 && hour < 12) {
    greeting = 'Good morning,';
  } else if (hour >= 12 && hour < 18) {
    greeting = 'Good afternoon,';
  } else {
    greeting = 'Good evening,';
  }

  let greetBox = document.getElementById('greet_box');
  greetBox.textContent = greeting;
}

