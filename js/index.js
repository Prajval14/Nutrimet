import { gym_data_list } from './data.js';

const gym_data_container = document.getElementById('gym_data_container');

document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth < 1025) {
        createGymCards(gym_data_list[0], gym_data_container);
    }   
    else {        
        gym_data_list.forEach(data => {
            createGymCards(data, gym_data_container);
        });
    }    
});

document.getElementById('gym_left').addEventListener("click", function() {
    gymLeftClick(gym_data_container);
});

function createGymCards(gym_data_list, gym_data_container) {    
    const cardDiv = document.createElement('div');
    cardDiv.className = 'col p-3';
    cardDiv.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="./media/images/test.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${gym_data_list.productname}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${gym_data_list.productdetail}</h6>
                <p class="card-text">
                <span class="text-decoration-line-through text-secondary fw-light">$${gym_data_list.originalprice}</span>
                <span class="fw-bold text-danger ps-1 fs-5">$${gym_data_list.discountPrice}</span>
                </p>
            </div>
            <div class="card-footer">
                <a class="btn btn-primary">Add to cart</a>
            </div>
        </div>
    `;
    gym_data_container.appendChild(cardDiv);
}

function gymLeftClick(gym_data_container) {
    gym_data_container.innerHTML = '';
    createGymCards(gym_data_list[1], gym_data_container);
}