import { gym_data_list, yoga_data_list, supplements_data_list } from "./data.js";

// this function will display all the products from the dataset and total all the product price

function loading_all_products_details(){
    var cart_total = 0;
    const discountedGymProducts = gym_data_list;
    discountedGymProducts.forEach(data => {
        createCards(data);      //this will display the product cards on the cart page from the data set
        var qty = data.quantity;
        // single product Price
        var single_product_price = data.discountPrice;
        // multiplyting with quantity
        var total_price = single_product_price * qty;
        // adding into total to find out the total price of the all products
        cart_total = cart_total + total_price;
    });   

    let final_price_container = document.getElementById('final_price');
    final_price_container.innerHTML = `: $ ${cart_total}`; //this will print the total price to the front end

    return cart_total;
}

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

function badge(count){
    // product quantity on the cart logo in the navbar
    var total_product_count =  count;
    let cart_logo = document.getElementById('cart-nav');
    cart_logo.innerHTML = `<span class="badge bg-danger">${total_product_count}</span>`;
}

function count_from_data(dataset){
    var count = parseInt(0);
    var badge_count_quanity = dataset; //I have to replce this dym_data_list to cart dataset
    badge_count_quanity.forEach(p_qty =>{
        count =  count + parseInt(p_qty.quantity); //this will count total quantity from the data set
    });

    return count; //this will return the total
}


function changed_qty(){
    var changed_count = 0;
    var dataset = gym_data_list;
    var qty = document.getElementsByClassName('cart-qty');
    var title = document.getElementsByClassName('card-title');
    var changed_q = 0;
    for (var i = 0; i < qty.length; i++) {
        // Create a closure to capture the value of i for each iteration
        (function(index) {
            qty[index].addEventListener('change', function() {
                var found = false;
                console.log(title[index].textContent); // Access title using captured index
                changed_q = this.value; //this will set the variabel with new quantity
                var product_name = title[index].textContent; // this will set the variable with the product name
                // Find the product in the gym_data_list
                var product = gym_data_list.find(item => item.productname === product_name);
                if (product) {
                    // Update the quantity of the product
                      product.quantity = this.value;
                      console.log(gym_data_list);            
                      dataset = gym_data_list; 
                    //   console.log(dataset);   
                    found = true;    
                }
                if(found)
                {
                    console.log(dataset);
                    changed_count = count_from_data(dataset);
                    badge(changed_count);
                }
            });

            
        })(i); // Pass current value of i to the closure
    }
    return dataset;
}

document.addEventListener('DOMContentLoaded', function(){
    
    loading_all_products_details();     // This will show all the products from the cart

    var initial_count = count_from_data(gym_data_list);  //whenever the page is loaded this will count the quantity from the dataset data.js
    badge(initial_count);       // this will disaply the badge on the cart

    changed_qty();  //this will detect the chanege inside the cart for quantity     
});
