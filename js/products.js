import { gym_data_list, yoga_data_list, supplements_data_list } from './data.js';

const myCart = [];
const navbarBadge = document.getElementById('navbar_toggler_icon_badge');
const cartBadge = document.getElementById('cart_items_badge');

document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-row');
    displayProducts([...gym_data_list, ...yoga_data_list, ...supplements_data_list], productsContainer);
    handleAddToCart();
    const filterSelect = document.getElementById('product_filter');
    filterSelect.addEventListener('change', handleFilterChange(filterSelect));
});


function handleAddToCart() {
    const addToCartButtons = document.querySelectorAll('.add_to_cart_button');
    addToCartButtons.forEach(button => button.addEventListener("click", (event) => addProductToCart(event)));
}


function addProductToCart(event) {
    //Set add to cart on click to addded for few seconds
    const button = event.target;
    button.innerHTML = `Added <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>`;
    button.classList.add('added');
    setTimeout(function() {
        button.textContent = 'Add to Cart';
        button.classList.remove('added');
    }, 1000);

    //Add product ID to cart and a list 
    const productID = event.target.closest('.card').querySelector('.product-id').textContent;        
    myCart.push(productID);
    navbarBadge.style.display = 'flex';
    cartBadge.innerHTML = myCart.length;
}


// Function to generate star rating HTML with star symbols
function generateStarRating(rating) {
    const starTotal = 5;
    const roundedRating = Math.round(parseFloat(rating)); // Round the rating to the nearest integer
    let starHTML = '';
    for (let i = 0; i < starTotal; i++) {
        if (i < roundedRating) {
            starHTML += '⭐'; // Add a star symbol if the current index is less than the rounded rating
        } else {
            starHTML += '☆'; // Add an empty star symbol for the remaining stars
        }
    }
    return starHTML;
}

// Function to display products with reduced card size and star ratings
function displayProducts(products, productsContainer) {
    productsContainer.innerHTML = ''; // Clear existing products
    products.forEach(product => {
        const productHTML = `
            <div class="col-md-3 mb-4"> <!-- Reduced column size to col-md-3 -->
                <div class="card h-100">
                    <img src="${product.imageURL}" class="card-img-top" alt="${product.productname}">
                    <div class="card-body">
                        <h5 class="product-id d-none">${product.productid}</h5>
                        <h5 class="card-title">${product.productname}</h5>
                        <p class="card-text">${product.productdetail}</p>
                        <div class="rating">
                            ${generateStarRating(product.rating)}
                        </div>
                        <p class="card-price">
                            <span class="text-decoration-line-through text-secondary fw-light">$${product.originalprice}</span>
                            <span class="fw-bold text-danger ps-1 fs-5">$${product.discountPrice || product.originalprice}</span>
                        </p>
                        <button class="btn btn-primary border-0 fw-medium add_to_cart_button" id="add_to_cart_button">Add to cart</button>
                        <a href="#" class="btn btn-link" style="font-size: 0.7rem;">View Product Details</a>
                    </div>
                </div>
            </div>
        `;
        // Apply inline style for padding
        productsContainer.insertAdjacentHTML('beforeend', productHTML);
        productsContainer.style.padding = '0 60px';
    });
}

function handleAddToCart() {
    const addToCartButtons = document.querySelectorAll('.add_to_cart_button');
    addToCartButtons.forEach(button => button.addEventListener("click", (event) => addProductToCart(event)));
}

function addProductToCart(event) {
    //Set add to cart on click to addded for few seconds
    const button = event.target;
    button.innerHTML = `Added <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>`;
    button.classList.add('added');
    setTimeout(function() {
        button.textContent = 'Add to Cart';
        button.classList.remove('added');
    }, 1000);
    
    //Add product ID to cart and a list 
    const productID = event.target.closest('.card').querySelector('.product-id').textContent;
    myCart.push(productID);
    navbarBadge.style.display = 'flex';
    cartBadge.innerHTML = myCart.length;
}

function handleFilterChange(filterSelect) {
    let filteredProducts = [];
    const filterValue = filterSelect.value;
    switch (filterValue) {
        case 'gym':
            filteredProducts = gym_data_list;
            break;
        case 'yoga':
            filteredProducts = yoga_data_list;
            break;
        case 'supplements':
            filteredProducts = supplements_data_list;
            break;
        default:
            filteredProducts = [...gym_data_list, ...yoga_data_list, ...supplements_data_list];
    }
    displayProducts(filteredProducts);
}

document.getElementById('nav_cart_button').addEventListener("click", () => window.location.href = './cart.html?index_page_selected_products=' + JSON.stringify(myCart));