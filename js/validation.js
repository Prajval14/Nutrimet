function toggleValidation() {
    
    var isValid = sessionStorage.getItem("isValid");

    // If isValid is null or false, redirect to signup.html
    if (!isValid || isValid === "false") {
        // Redirect to signup.html
        window.location.href = './html/signup.html';
    } else {
        // Redirect to products.html
        window.location.href = './html/details.html';
    }
}

