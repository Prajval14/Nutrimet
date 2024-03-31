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
                        <p class="price-cart fs-5 fw-bold p-0 m-0" id="discounted-price">$ <span class="only-price">${data.discountPrice}</span></p>
                        <div class="d-flex justify-content-between align-items-end mt-auto"  id="edit-product-cart">
                            <span>
                            <label for="qty">Qty:</label>
                            <input type="number" id="cart_qty" class="cart-qty" min="1" max="20" value="1">
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



function total_price(){
    var price = document.getElementsByClassName('only-price');
    var price_of_cart = parseFloat(0);
    for(var i=0; i<quantity.length; i++){
        price_of_cart = price_of_cart + (parseFloat(price[i].textContent) * parseFloat(quantity[i]));
    }

    // console.log(price_of_cart);
    var sub_total = document.getElementById('sub_total');
    var tax = document.getElementById('taxes');
    sub_total.innerHTML = `${price_of_cart}`
    var tax_calculation = price_of_cart * 0.13;
    tax_calculation = tax_calculation;
    tax.innerHTML = `${tax_calculation}`; 
    var sum = tax_calculation + price_of_cart;
    var total = document.getElementById('total');
    total.innerHTML = `${sum}`;
}

function changed_qty(){
    var qty = document.getElementsByClassName('cart-qty');
    var total_product = document.getElementById('total_quantity');
    var title = document.getElementsByClassName('card-title');
    const cartBadge = document.getElementById('cart_items_badge');
    var changed_q = 0;
    for (var i = 0; i < qty.length; i++) {
        quantity.push(parseInt(1));
        // Create a closure to capture the value of i for each iteration
        (function(index) {
            qty[index].addEventListener('change', function() {
                console.log(title[index].textContent); // Access title using captured index
                changed_q = this.value; //this will set the variabel with new quantity
                console.log(changed_q);
                quantity[index] = parseInt(changed_q);
                var product_name = title[index].textContent; // this will set the variable with the product name
                // console.log(quantity);
                var total = parseInt(0);
                for (var i = 0; i< quantity.length; i++){
                    // console.log(quantity[i]);
                    total = total + parseInt(quantity[i]);
                }
                cartBadge.innerHTML = total;
                
                total_product.innerHTML = `${total}`;
                total_price();
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
    var total_product = document.getElementById('total_quantity');
    total_product.innerHTML = `${index_page_selected_products.length}`;

    if (index_page_selected_products !== null) {
        // display_products(index_page_selected_products);
        console.log('display products');
        const cartBadge = document.getElementById('cart_items_badge');
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
        });
        changed_qty();      
        console.log(total_cart_price);
        total_price();

        var deleteBtns = document.querySelectorAll('.delete_cart_product');
        deleteBtns.forEach((btn, index) => {
            btn.addEventListener('click', function(event) {
                // Prevent the click event from propagating to parent elements
                event.stopPropagation();
    
                // Find the index of the clicked delete button
                var currentIndex = Array.from(deleteBtns).indexOf(btn);
    
                // Delete the product at the currentIndex
                deleteProduct(currentIndex);
            });
        });
        
    }
    if(index_page_selected_products.length<1)
    {
        console.log('hello');
        //I have to add text of empty cart
        cartProductContainer.innerHTML =`<h1 class="empty">Cart is Empty</h1>`;
    }    
    
    






    // checkout form
    var checkoutbtn = document.getElementById('btn_checkout');
    checkoutbtn.addEventListener('click', function(){
        var total = document.getElementById('total');
        if(parseInt(total.textContent) == 0){
            alert('your cart is empty!!');
        }
        else{
            console.log(total.textContent);
            var checkout_form = document.getElementById('checkout_form');
            var row1_1 = document.getElementById('row1_1');
            var products = document.getElementById('p');
            
            if(checkoutbtn.innerHTML == `Back`){
                checkoutbtn.innerHTML = `Checkout`;
            }
            else{
                checkoutbtn.innerHTML = `Back`;
            }
            row1_1.classList.toggle('hide');
            products.classList.toggle('hide');
            checkout_form.classList.toggle('hide');
        }
        
    })
});



function deleteProduct(index) {
    // Check if the index is valid
    if (index < 0 || index >= document.querySelectorAll('.card').length) {
        console.error("Invalid index:", index);
        return; // Exit the function if the index is invalid
    }

    // Remove the corresponding product from the DOM
    var productDiv = document.querySelectorAll('.card')[index];
    productDiv.parentNode.removeChild(productDiv);

    // Remove the corresponding quantity from the quantity array
    quantity.splice(index, 1);

    // Recalculate the total price and update the displayed total
    total_price();

    // Update the badge showing the total number of items in the cart
    var totalProduct = document.getElementById('total_quantity');
    totalProduct.innerHTML = quantity.length;
}

