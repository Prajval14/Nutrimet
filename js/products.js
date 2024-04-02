import { gym_data_list, yoga_data_list, supplements_data_list } from './data.js';

const productsContainer = document.getElementById('products-row');
const filterSelect = document.getElementById('product_filter');

document.addEventListener('DOMContentLoaded', () => {
    displayProducts([...gym_data_list, ...yoga_data_list, ...supplements_data_list]);
    filterSelect.addEventListener('change', handleFilterChange);
});

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
function displayProducts(products) {
    productsContainer.innerHTML = ''; // Clear existing products
    products.forEach(product => {
        const productHTML = `
            <div class="col-md-3 mb-4"> <!-- Reduced column size to col-md-3 -->
                <div class="card h-100">
                    <img src="${product.imageURL}" class="card-img-top" alt="${product.productname}">
                    <div class="card-body">
                        <h5 class="card-title">${product.productname}</h5>
                        <p class="card-text">${product.productdetail}</p>
                        <div class="rating">
                            ${generateStarRating(product.rating)}
                        </div>
                        <p class="card-price">
                            <span class="text-decoration-line-through text-secondary fw-light">$${product.originalprice}</span>
                            <span class="fw-bold text-danger ps-1 fs-5">$${product.discountPrice || product.originalprice}</span>
                        </p>
                        <button class="btn btn-primary add-to-cart mb-2" data-productid="${product.productid}">Add to Cart</button>
                        <a href="#" class="btn btn-link" style="font-size: 0.7rem;">View Product Details</a>


                    </div>
                </div>
            </div>
        `;
        productsContainer.insertAdjacentHTML('beforeend', productHTML);
    });
}

function handleFilterChange() {
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

// Apply inline style for padding
productsContainer.style.padding = '0 60px';
