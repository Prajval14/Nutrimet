// animation.js

// Function to animate the image
function animateImage() {
    const image = document.getElementById('leadership-image');
    let position = 0;
    const interval = setInterval(() => {
        position += 5; // Adjust this value to control the speed of the animation
        image.style.transform = `translateY(${position}px)`;
        // console.log("hi");
        if (position >= 20) {
            clearInterval(interval);
            setTimeout(() => {
                image.style.transform = 'translateY(0)';
                setTimeout(animateImage, 1000); // To restart the animation after a delay
            }, 1000); // To adjust this value to control the delay before restarting the animation
        }
    }, 100); // To adjust this value to control the interval between each movement
}

// Call the animateImage function when the page loads
window.onload = function() {
    animateImage();
};
