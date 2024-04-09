import {
  gym_data_list,
  yoga_data_list,
  supplements_data_list,
} from "./data.js";

const myCart = [];
const navbarBadge = document.getElementById("navbar_toggler_icon_badge");
const cartBadge = document.getElementById("cart_items_badge");

document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("products-row");
  displayProducts(
    [...gym_data_list, ...yoga_data_list, ...supplements_data_list],
    productsContainer
  );

  // Event listeners for desktop filter buttons
  document.querySelectorAll(".btn-group button").forEach((button) => {
    button.addEventListener("click", function () {
      const filterValue = this.getAttribute("data-filter");
      handleFilterChange(filterValue, productsContainer);
    });
  });

  // Event listener for mobile filter dropdown
  const mobileFilterSelect = document.getElementById("mobile_product_filter");
  mobileFilterSelect.addEventListener("change", function () {
    handleFilterChange(this.value, productsContainer);
  });

  handleAddToCart();
});

// function for rendering the products on screen
function displayProducts(products, productsContainer) {
  productsContainer.innerHTML = ""; // Clear the container before displaying new products

  products.forEach((product) => {
    const productHTML = `
          <div class="col-md-3 mb-4 animate__animated animate__jackInTheBox">
              <div class="card h-100">
                  <img src="${product.imageURL}" class="card-img-top" alt="${
      product.productname
    }">
                  <div class="card-body">
                      <h5 class="product-id d-none">${product.productid}</h5>
                      <h5 class="card-title">${product.productname}</h5>
                      <p class="card-text">${product.productdetail}</p>
                      <div class="rating">
                          ${generateStarRating(product.rating)}
                      </div>
                      <p class="card-price">
                          <span class="text-decoration-line-through text-secondary fw-light">$${
                            product.originalprice
                          }</span>
                          <span class="fw-bold text-danger ps-1 fs-5">$${
                            product.discountPrice || product.originalprice
                          }</span>
                      </p>
                      <button class="btn btn-primary border-0 fw-medium add_to_cart_button">Add to cart</button>
                      <a href="../html/productdetails.html?productid=${
                        product.productid
                      }" class="btn btn-link" style="font-size: 0.7rem;">View Product Details</a>
                  </div>
              </div>
          </div>
      `;
    productsContainer.insertAdjacentHTML("beforeend", productHTML);
  });

  // Re-bind the "Add to Cart" buttons event listeners
  handleAddToCart();
}

function handleAddToCart() {
  // Now listens for button clicks to add products to the cart.
  document.querySelectorAll(".add_to_cart_button").forEach((button) => {
    button.addEventListener("click", function (event) {
      addProductToCart(event);
    });
  });
}

function addProductToCart(event) {
  const productID = event.target
    .closest(".card")
    .querySelector(".product-id").textContent;
  myCart.push(productID);
  navbarBadge.style.display = "flex";
  cartBadge.textContent = myCart.length;

  // Update button to show added status
  const button = event.target;
  button.classList.add("added");
  button.innerHTML = `Added <i class="bi bi-check-circle-fill"></i>`;
  setTimeout(() => {
    button.classList.remove("added");
    button.innerHTML = "Add to cart";
  }, 1000);
}

function generateStarRating(rating) {
  const starTotal = 5;
  let stars = "";
  for (let i = 0; i < starTotal; i++) {
    stars += i < rating ? "⭐" : "☆";
  }
  return stars;
}

function handleFilterChange(filterValue, productsContainer) {
  let filteredProducts = [];
  switch (filterValue) {
    case "gym":
      filteredProducts = gym_data_list;
      break;
    case "yoga":
      filteredProducts = yoga_data_list;
      break;
    case "supplements":
      filteredProducts = supplements_data_list;
      break;
    default:
      filteredProducts = [
        ...gym_data_list,
        ...yoga_data_list,
        ...supplements_data_list,
      ];
  }
  displayProducts(filteredProducts, productsContainer);
}

document.getElementById("nav_cart_button").addEventListener("click", () => {
  window.location.href =
    "./cart.html?index_page_selected_products=" + JSON.stringify(myCart);
});
