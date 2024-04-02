import { gym_data_list, yoga_data_list, supplements_data_list } from "./data.js";

const allProducts = [
  ...gym_data_list,
  ...yoga_data_list,
  ...supplements_data_list,
];
const cartBadge = document.getElementById("cart_items_badge");

// This will store the product IDs during the session
let myCart = [];

function attachEventListeners() {
  document.querySelectorAll(".add_to_cart_button").forEach((button) => {
    button.addEventListener("click", (event) => {
      addProductToCart(event);
    });
  });
}

function addProductToCart(event) {
  // Set add to cart on click to added for a few seconds
  const button = event.target;
  button.innerHTML = `Added <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>`;
  button.classList.add('added');
  setTimeout(function() {
    button.innerHTML = 'Add to Cart';
    button.classList.remove('added');
  }, 1000);

  // Add product ID to cart
  const productID = button.getAttribute('data-productid');
  myCart.push(productID);
  updateCartBadge();
}

function updateCartBadge() {
  cartBadge.textContent = myCart.length; // Update the cart badge
}

function renderProducts(products) {
  const productsRow = document.getElementById("products-row");
  if (!productsRow) {
    console.error('Element with id "products-row" not found!');
    return;
  }

  products.forEach((product) => {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-md-4", "mb-4");

    const price = product.isondiscount
      ? `$${product.discountPrice}`
      : `$${product.originalprice}`;

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

document.addEventListener("DOMContentLoaded", () => {
  renderProducts(allProducts);
});

