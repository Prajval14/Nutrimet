import { gym_data_list, yoga_data_list, supplements_data_list } from './data.js';

const gymContainer = document.getElementById('gym_data_container');
const yogaContainer = document.getElementById('yoga_data_container');
const supplementsContainer = document.getElementById('supplements_data_container');

let gymIndex = 0;
let yogaIndex = 0;
let supplementsIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth < 1025) {        
        createCards(gym_data_list[0], gymContainer);
        createCards(yoga_data_list[0], yogaContainer);
        createCards(supplements_data_list[0], supplementsContainer);
    } else {        
        gym_data_list.forEach(data => createCards(data, gymContainer));
        yoga_data_list.forEach(data => createCards(data, yogaContainer));
        supplements_data_list.forEach(data => createCards(data, supplementsContainer));
    }
});

function createCards(data, container) {    
    const cardDiv = document.createElement('div');
    cardDiv.className = 'col p-3';
    cardDiv.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="./media/images/test.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.productname}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${data.productdetail}</h6>
                <p class="card-text">
                <span class="text-decoration-line-through text-secondary fw-light">$${data.originalprice}</span>
                <span class="fw-bold text-danger ps-1 fs-5">$${data.discountPrice}</span>
                </p>
            </div>
            <div class="card-footer">
                <a class="btn btn-primary">Add to cart</a>
            </div>
        </div>
    `;
    container.appendChild(cardDiv);
}

function handleNavigation(direction, category, dataList, container) {
    switch (category) {
        case 'gym':
            gymIndex = (gymIndex + direction + dataList.length) % dataList.length;
            showCard(gymIndex, dataList, container);
            break;
        case 'yoga':
            yogaIndex = (yogaIndex + direction + dataList.length) % dataList.length;
            showCard(yogaIndex, dataList, container);
            break;
        case 'supplements':
            supplementsIndex = (supplementsIndex + direction + dataList.length) % dataList.length;
            showCard(supplementsIndex, dataList, container);
            break;
        default:
            console.error('Invalid category');
    }
}

document.getElementById('gym_left').addEventListener("click", () => handleNavigation(-1, 'gym', gym_data_list, gymContainer));
document.getElementById('gym_right').addEventListener("click", () => handleNavigation(1, 'gym', gym_data_list, gymContainer));
document.getElementById('yoga_left').addEventListener("click", () => handleNavigation(-1, 'yoga', yoga_data_list, yogaContainer));
document.getElementById('yoga_right').addEventListener("click", () => handleNavigation(1, 'yoga', yoga_data_list, yogaContainer));
document.getElementById('supplement_left').addEventListener("click", () => handleNavigation(-1, 'supplements', supplements_data_list, supplementsContainer));
document.getElementById('supplement_right').addEventListener("click", () => handleNavigation(1, 'supplements', supplements_data_list, supplementsContainer));

function showCard(index, dataList, container) {
    container.innerHTML = '';
    createCards(dataList[index], container);
}