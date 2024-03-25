
function toggleForms(formId) {
    var signupForm = document.getElementById('signupForm');
    var loginForm = document.getElementById('loginForm');
    var signupButton = document.getElementById('signupButton');
    var loginButton = document.getElementById('loginButton');
  
    if (formId === 'signupForm') {
      signupForm.style.display = 'block';
      loginForm.style.display = 'none';
      signupButton.classList.add('active-button');
      loginButton.classList.remove('active-button');
    } else if (formId === 'loginForm') {
      signupForm.style.display = 'none';
      loginForm.style.display = 'block';
      loginButton.classList.add('active-button');
      signupButton.classList.remove('active-button');
    }
  }

  
 


  function validateForms() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("cnfpassword").value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    // Check password strength (contains at least one number and one special character)
    var containsNumber = /\d/.test(password);
    var containsSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    if (!containsNumber || !containsSpecialChar) {
        alert("Password must contain at least one number and one special character.");
        return false;
    }
    
    function closeSuccessCard() {
        document.getElementById("successCard").style.display = "none";
    }

    var userId = document.getElementById('email').value;
    var passWordId = document.getElementById('password').value;
    localStorage.setItem('userName_R',userId);
    localStorage.setItem('password_R',passWordId);
    var myModal = new bootstrap.Modal(document.getElementById('successModal'),{});
    myModal.show();

    document.getElementById('form-data').reset();
    return false;
}


function loginValidation()
{
    var userName = document.getElementById('loginEmail').value;
    var l_Password = document.getElementById('loginPassword').value;

    var R_Id = localStorage.getItem('userName_R');
    var R_Pass = localStorage.getItem('password_R');

    console.log(R_Id);
    console.log(R_Pass);
    if(R_Id == userName && l_Password == R_Pass)
    {
        
        window.location.href= "../index.html";
    }

    else
    {
        alert("Invalid email or password. Please try again.");
    }
    
    return false
    
}


