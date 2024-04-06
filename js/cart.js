import { gym_data_list, yoga_data_list, supplements_data_list } from "./data.js";
var gym_products = gym_data_list;
var yoga_products = yoga_data_list;
var supplement_products = supplements_data_list;
var cartProductContainer = document.getElementById('p');   
var total_cart_price = 0; 
 


document.addEventListener('DOMContentLoaded',function(){
    var queryString = window.location.search;
    var params = new URLSearchParams(queryString);
    var arrayString = params.get('index_page_selected_products');   
    var index_page_selected_products = JSON.parse(arrayString);
    // 1 -- checking weather the cart is empty or not
    if(index_page_selected_products.length <1){
        check_empty_cart(index_page_selected_products);
    }
    else{
        //if cart is not empty then this code will be executed.
        display_products(index_page_selected_products);
        total_price();
        let proxy = new Proxy(index_page_selected_products, {
        get(target, property, receiver) {
            if (property === 'splice') {
                return function (...args) {
                    return Reflect.apply(target[property], target, args);
                }
            }
            return Reflect.get(target, property, receiver);
        }
        });
        var list_product1 = document.querySelectorAll('.product_card');
        list_product1.forEach(function(button){
            button.addEventListener('click', function(){
                var delete_btn = document.querySelectorAll('.delete_cart_product');        
                var list_product = document.querySelectorAll('.product_card');
                for (var i = 0; i < delete_btn.length; i++) {
                    (function(index) {
                        delete_btn[index].addEventListener('click', function() {
                            proxy.splice(index, 1);
                                list_product[index].remove();
                                total_price();
                        });
                    })(i);
                }
                
            });

            changed_qty();
        });
    }    
});

// 1 -- function to check weather the cart is empty or not
function check_empty_cart(product_list){
    
        var empty_div = document.createElement('div');
        empty_div.classList = 'empty';
        
        
        // fetching the products div from cart.html
        var products = document.querySelector('.products');
        products.style.position = 'relative';
        products.appendChild(empty_div);
        products.style.minHeight = '400px'; 
        // products.style.border = '1px solid black';

        empty_div.innerHTML = '<h3>Cart is Empty</h3>';
        // empty_div.style.top = '50%';
        // empty_div.style.left = '50%';
        // empty_div.style.transform = ''
}

// 2-- function to display product on the screen
function display_products(product_list){
    product_list.forEach(item => {
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
    });
}

// 3-- function to create design for the product in the cart
function createCards(data){
    const cardDiv = document.createElement('div');
        cardDiv.classList.add('product_card');
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
                        <p class="price-cart fs-5 fw-bold p-0 m-0" id="discounted-price">$ <span class="only-price">${data.discountPrice}</span></p>
                        <div class="d-flex justify-content-between align-items-end mt-auto"  id="edit-product-cart">
                            <span>
                            <label for="qty">Qty:</label>
                            <input type="number" id="cart_qty" class="cart-qty" min="1" max="${data.total_quantity}" value="1">

                            <p>In stock: ${data.total_quantity}</p>
                            </span>
                            <span>
                                <i class="bi bi-trash3 fs-4 bg delete_cart_product" data-toggle="tooltip" data-placement="bottom" title="Delete from the cart"></i>
                            </span>                                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
     `;
    cartProductContainer.appendChild(cardDiv);
}

// 4 -- function to calculate total price

function total_price(){
    var price = document.getElementsByClassName('only-price');
    var cart_quantity = document.querySelectorAll('.cart-qty');
    var total_product = document.getElementById('total_quantity');
    var badge = document.getElementById('cart_items_badge');
    var total_count = 0;
    var price_of_cart = parseFloat(0);
    for(var i=0; i<price.length; i++){
        console.log(price[i].textContent);
        console.log(cart_quantity[i].value);
        price_of_cart = price_of_cart + (price[i].textContent * cart_quantity[i].value);
        total_count = total_count + parseInt(cart_quantity[i].value); 
    }

    console.log(price_of_cart);
    var sub_total = document.getElementById('sub_total');
    var tax = document.getElementById('taxes');
    sub_total.innerHTML = `${price_of_cart}`
    var tax_calculation = price_of_cart * 0.13;
    tax_calculation = tax_calculation;
    tax.innerHTML = `${tax_calculation}`; 
    var sum = tax_calculation + price_of_cart;
    var total = document.getElementById('total');
    total.innerHTML = `${sum}`;
    total_product.innerHTML = total_count;
    badge.innerHTML = total_count;

    if(total_count == 0){
        check_empty_cart();
    }
}

// 5 - function to keep any eye on the quantity
function changed_qty(){
    var qty = document.getElementsByClassName('cart-qty');
    var total_product = document.getElementById('total_quantity');
    // var total_count = 0;
    var title = document.getElementsByClassName('card-title');
    var changed_q = 0;
    for (var i = 0; i < qty.length; i++) {
        // Create a closure to capture the value of i for each iteration
        // total_count = total_count + parseInt(qty[i].value); 
        (function(index) {
            qty[index].addEventListener('change', function() {
                console.log(title[index].textContent); // Access title using captured index
                changed_q = this.value; //this will set the variabel with new quantity
                console.log(changed_q);
                total_price();
            });
        })(i); // Pass current value of i to the closure
        // total_count = total_count + parseInt(qty[i].value); 
    }
    // total_product.innerHTML = total_count;
    
}