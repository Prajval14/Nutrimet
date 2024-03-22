const products = [
  {
    name: "Medium Everyday Gym Bag",
    price: 56,
    imageSrc: "path-to-image-of-gym-bag.jpg",
    rating: 4.5,
    isNew: true,
    description: "A versatile bag for all your gym essentials.",
    // ... any other product details
  },

  {
    name: "Medium Everyday Gym Bag",
    price: 56,
    imageSrc: "path-to-image-of-gym-bag.jpg",
    rating: 4.5,
    isNew: true,
    description: "A versatile bag for all your gym essentials.",
  },
  {
    name: "Medium Everyday Gym Bag",
    price: 56,
    imageSrc: "path-to-image-of-gym-bag.jpg",
    rating: 4.5,
    isNew: true,
    description: "A versatile bag for all your gym essentials.",
  },
  // ... more products
];

function renderProducts(products) {
  const productsRow = document.getElementById("products-row");
  products.forEach((product) => {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-md-4", "mb-4");

    const card = `
        <div class="card">
          <img src="${product.imageSrc}" class="card-img-top" alt="${
      product.name
    }">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="text-primary">$${product.price}</span>
              <span class="star-rating">${"★".repeat(
                Math.round(product.rating)
              )}</span>
            </div>
          </div>
        </div>
      `;
    colDiv.innerHTML = card;
    productsRow.appendChild(colDiv);
  });
}

document.addEventListener("DOMContentLoaded", () => renderProducts(products));
