document.addEventListener("DOMContentLoaded", function() {
    var queryString = window.location.search;
    var params = new URLSearchParams(queryString);
    var arrayString = params.get('index_page_selected_products');    
    var index_page_selected_products = JSON.parse(arrayString);
    
    if (index_page_selected_products !== null) {
        //Process your data from here
        console.log(index_page_selected_products);        
        const cartBadge = document.getElementById('cart_items_badge');
        cartBadge.innerHTML = index_page_selected_products.length;
    }
});

var cart = document.getElementById('cart-nav');

cart.addEventListener('click', function(){
    window.location.href= '../html/cart.html'
});

import { gym_data_list, yoga_data_list, supplements_data_list } from "./data.js";

const discountedGymProducts = gym_data_list.filter(product => product.isondiscount);

document.addEventListener('DOMContentLoaded', function(){
    discountedGymProducts.forEach(data => createCards(data))

});

var cartProductContainer = document.getElementById('p');
function createCards(data){
    const cardDiv = document.createElement('div');
    cardDiv.innerHTML = `
    <div class="card mb-3" >
    <div class="row no-gutters">
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <img class="card-img img-thumbnail" src="${data.imageURL}" alt="product Image" width="100%">
        </div>
        <div class="col-xl-9 col-lg-8 col-md-6 col-sm-6">
            <div class="card-body">
                <h5 class="card-title">${data.productname}</h5>
                <p class="card-text mb-1"><small class="text-muted">${data.productdetail}</small></p>
                <p class="price-cart fs-5 fw-bold p-0 m-0" id="discounted-price">$ ${data.originalprice}</p>
                <div class="d-flex justify-content-between align-items-end mt-auto"  id="edit-product-cart">
                    <span>
                    <label for="qty">Qty:</label>
                    <input type="number" id="cart_qty" min="1" max="20" value="1">
                    </span>
                    <span>
                        <i class="bi bi-trash3 fs-4 bg" data-toggle="tooltip" data-placement="bottom" title="Delete from the cart"></i>
                        <i class="bi bi-bookmark-heart fs-4" data-toggle="tooltip" data-placement="bottom" title="Add to wish list"></i>
                    </span>                                    
                </div>
            </div>
        </div>
    </div>
</div>
    `;
    cartProductContainer.appendChild(cardDiv);
}