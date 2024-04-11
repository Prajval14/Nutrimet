document.addEventListener('DOMContentLoaded', function() {
    // Navbar JS
    document.getElementById('nav_login_button').addEventListener("click", () => toggleValidation());
    document.getElementById('search_input').addEventListener("keypress", (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            window.location.href = './products.html?searched_product=' + document.getElementById('search_input').value;
        }
    });

    //Footer JS
    const footerYear = document.getElementById('current_Year');
    footerYear.innerHTML = new Date().getFullYear();
});

//Urvesh Patel
function toggleValidation() {
    var isValid = sessionStorage.getItem("isValid");
    // If isValid is null or false, redirect to signup.html
    if (!isValid || isValid === "false") {
        window.location.href = './signup.html';
    } else {
        window.location.href = './details.html';
    }
}