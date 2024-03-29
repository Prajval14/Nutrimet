import { gym_data_list, yoga_data_list, supplements_data_list } from "./data.js";
var gym_products = gym_data_list;
var yoga_products = yoga_data_list;
var supplement_products = supplements_data_list;

var quantity = [];

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
                        <p class="price-cart fs-5 fw-bold p-0 m-0" id="discounted-price">$ ${data.discountPrice}</p>
                        <div class="d-flex justify-content-between align-items-end mt-auto"  id="edit-product-cart">
                            <span>
                            <label for="qty">Qty:</label>
                            <input type="number" id="cart_qty" class="cart-qty" min="1" max="20" value="1">
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

function changed_qty(){
    var qty = document.getElementsByClassName('cart-qty');
    var title = document.getElementsByClassName('card-title');
    const cartBadge = document.getElementById('cart_items_badge');
    var changed_q = 0;
    
    for (var i = 0; i < qty.length; i++) {
        quantity.push(parseInt(1));
        console.log(quantity[i]);
        // Create a closure to capture the value of i for each iteration
        (function(index) {
            qty[index].addEventListener('change', function() {
                var found = false;
                console.log(title[index].textContent); // Access title using captured index
                changed_q = this.value; //this will set the variabel with new quantity
                console.log(changed_q);
                quantity[index] = parseInt(changed_q);
                var product_name = title[index].textContent; // this will set the variable with the product name
                console.log(quantity);
                var total = parseInt(0);
                for (var i = 0; i< quantity.length; i++){
                    
                    console.log(quantity[i]);
                    total = total + parseInt(quantity[i]);
                }
                cartBadge.innerHTML = total;
            });
        })(i); // Pass current value of i to the closure
    }
}

document.addEventListener('DOMContentLoaded', function(){
    // from changes
    var queryString = window.location.search;
    var params = new URLSearchParams(queryString);
    var arrayString = params.get('index_page_selected_products');    
    var index_page_selected_products = JSON.parse(arrayString);
    const cartBadge = document.getElementById('cart_items_badge');
    cartBadge.innerHTML =  index_page_selected_products.length;
    console.log(index_page_selected_products);
    
    if (index_page_selected_products !== null) {
        
        //Process your data from here
        const cartBadge = document.getElementById('cart_items_badge');
        let total_cart_quantity = parseInt(0);
        var total_cart_price = parseFloat(0);
        index_page_selected_products.forEach(item => {
            var cart_single_product1 = gym_products.filter(product => {
                if(product.productid === item){
                    createCards(product);
                    total_cart_price = total_cart_price + product.discountPrice;
                }
            });
            var cart_yoga_product1 = yoga_products.filter(product => {
                if(product.productid === item){
                    createCards(product);
                    total_cart_price = total_cart_price + product.discountPrice;
                }
            });
            var cart_supplement_product1 = supplement_products.filter(product => {
                if(product.productid === item){
                    createCards(product);
                    total_cart_price = total_cart_price + product.discountPrice;
                }
            });
        })
        changed_qty();      
    }
    if(index_page_selected_products.length<1)
    {
        console.log('hello');
        //I have to add text of empty cart
        cartProductContainer.innerHTML =`<h1 class="empty">Cart is Empty</h1>`;
    }     
});
