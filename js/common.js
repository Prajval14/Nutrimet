document.addEventListener('DOMContentLoaded', function() {
    // Navbar JS
    document.getElementById('nav_login_button').addEventListener("click", () => window.location.href = './signup.html');

    //Footer JS
    const footerYear = document.getElementById('current_Year');
    footerYear.innerHTML = new Date().getFullYear();
});