// products.js
// Assuming ES6 imports are supported or processed through a bundler
import { gym_data_list, yoga_data_list, supplements_data_list } from './data.js';

function renderProducts(products) {
  const productsRow = document.getElementById("products-row");
  if (!productsRow) {
    console.error('Element with id "products-row" not found!');
    return;
  }

  products.forEach((product) => {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-md-4", "mb-4");

    const price = product.isondiscount ? `$${product.discountPrice}` : `$${product.originalprice}`;
    const starRating = getStarRating(product.rating);
    
    const card = `
        <div class="card h-100">
          <img src="${product.imageURL}" class="card-img-top" alt="${product.productname}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.productname}</h5>
            <p class="card-text">${product.productdetail}</p>
            <div class="mt-auto">
              <div class="d-flex justify-content-between align-items-center">
                <span class="text-primary">${price}</span>
                <span class="star-rating">${starRating}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    
    colDiv.innerHTML = card;
    productsRow.appendChild(colDiv);
  });
}

function getStarRating(rating) {
  const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5
  let starRating = '';
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(roundedRating)) {
      starRating += '★'; // Full star
    } else if (i < roundedRating) {
      starRating += '⭐'; // Half star (use a different character if you prefer)
    } else {
      starRating += '☆'; // Empty star
    }
  }
  return starRating;
}

const allProducts = [...gym_data_list, ...yoga_data_list, ...supplements_data_list];

document.addEventListener("DOMContentLoaded", () => renderProducts(allProducts));
