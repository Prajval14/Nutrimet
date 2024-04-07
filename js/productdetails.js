const selected_product = JSON.parse(new URLSearchParams(window.location.search).get('selected_product') ?? 'null');
console.log(selected_product);
debugger
import { gym_data_list, yoga_data_list, supplements_data_list } from './data.js';

document.addEventListener('DOMContentLoaded', function() {
// Combine all product lists into one array
const allProducts = [...gym_data_list, ...yoga_data_list, ...supplements_data_list];

// Find the product with the matching name
const product = allProducts.find(prod => prod.productid === selected_product);
    debugger
    createCards(product);
    
})

const gymContainer = document.getElementById('product_detail_container');

//Functions defined
function createCards(product) {    
    const cardDiv = document.createElement('div');
    cardDiv.className = 'container';
    gymContainer.innerHTML = `
    <div class="col-sm-6">
        <!-- Carousel -->
        <div id="demo" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators" id="carousel_image">
                <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
            </div>
            <!-- The slideshow/carousel -->
            <div class="carousel-inner">
                <div class="carousel-item active" id="carousel_img_1">
                
                </div>
                <div class="carousel-item" id="carousel_img_2">
                
                </div>
                <div class="carousel-item" id="carousel_img_3">
                <img src="${product.imageURL}" class="card-img-top" alt="${product.productname}">   
                </div>
            </div>
            <!-- Left and right controls/icons -->
            <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
            </button>
        </div>
    </div>

    <div class="col-sm-6">
        <h2>${product.productname}</h2>
        <h4>${product.originalprice}</h4>
        <p>${product.productdetail}</p>
        <p>${product.productdescription}</p>

        <div class="add">
             <lable>Quantity: </lable>
            <select name="quantity" id="product-quantity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            </select>
        </div>
        <button class=".add_to_cart_button">Add to cart</button>
    </div>
    `;

    document.getElementById('');

    var img1 = document.getElementById('carousel_img_1');
    img1.style.width = "100%";
    img1.style.height = "500px";
    img1.style.backgroundImage= `url('${product.imageURL}')`;

    var img2 = document.getElementById('carousel_img_2');
    img2.style.width = "100%";
    img2.style.height = "500px";
    img2.style.backgroundImage= `url('${product.imageURL}')`;

    var img3 = document.getElementById('carousel_img_3');
    img3.style.width = "100%";
    img3.style.height = "500px";
    img3.style.backgroundImage= `url('${product.imageURL}')`;
    container.appendChild(cardDiv);
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