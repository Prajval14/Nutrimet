import { gym_data_list, yoga_data_list, supplements_data_list } from './data.js';

// Assuming all product lists are combined into one for rendering
const allProducts = [...gym_data_list, ...yoga_data_list, ...supplements_data_list];
const navbarBadge = document.getElementById('navbar_toggler_icon_badge');
const cartBadge = document.getElementById('cart_items_badge');

// Function to render all products
function renderProducts(products) {
  const productsRow = document.getElementById("products-row");
  if (!productsRow) {
    console.error('Element with id "products-row" not found!');
    return;
  }

  products.forEach(product => {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-md-4", "mb-4");

    const price = product.isondiscount ? `$${product.discountPrice}` : `$${product.originalprice}`;
    
    // Include the Add to Cart button in the card HTML
    const cardHTML = `
      <div class="card h-100">
        <img src="${product.imageURL}" class="card-img-top" alt="${product.productname}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.productname}</h5>
          <p class="card-text">${product.productdetail}</p>
          <div class="mt-auto">
            <div class="d-flex justify-content-between align-items-center">
              <span class="text-primary">${price}</span>
              <button class="btn btn-primary add_to_cart_button" data-productid="${product.productid}">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    colDiv.innerHTML = cardHTML;
    productsRow.appendChild(colDiv);
  });

  attachEventListeners();
}

// Function to attach event listeners to the Add to Cart buttons
function attachEventListeners() {
  document.querySelectorAll('.add_to_cart_button').forEach(button => {
    button.addEventListener('click', event => {
      const productID = event.target.getAttribute('data-productid');
      addProductToCart(productID);
    });
  });
}

// Function to add a product to the cart
function addProductToCart(productID) {
  // Retrieve the current cart from localStorage, or initialize an empty array if null
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(productID);

  // Update the cart in localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Optionally, update cart badge count here
  if (cartBadge && navbarBadge) {
    navbarBadge.style.display = 'flex';
    cartBadge.textContent = cart.length;
  }
  
  // Provide user feedback
  alert("Product added to cart!");
}

// Render products on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => renderProducts(allProducts));
