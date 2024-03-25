
function toggleForms(formId) {
    var signupForm = document.getElementById('signupForm');
    var loginForm = document.getElementById('loginForm');
  
    if (formId === 'signupForm') {
        console.log(formId)
      signupForm.style.display = 'block';
      loginForm.style.display = 'none';
    } else if (formId === 'loginForm') {
      signupForm.style.display = 'none';
      loginForm.style.display = 'block';
    }
  }
  