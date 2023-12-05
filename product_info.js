// product_info.js
let endpoint;
const handleFetchErrors = (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};
document.addEventListener('DOMContentLoaded', () => {

    const urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get('id');

    endpoint = 'https://dummyjson.com/products/'+`${productId}`
    console.log(endpoint)
    fetch(endpoint)
      .then(handleFetchErrors)
      .then((data) => {
        const product = data;
        if (product) {
          displayProductInfo(product);
        } else {
          console.error('Product not found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error.message);
      });
  
    const displayProductInfo = (product) => {
      const productInfoContainer = document.getElementById('productInfoContainer');
      productInfoContainer.innerHTML = `
        <h2 class="info">${product.title}</h2>
        <p class="pinfo">Price: $${product.price}</p>
        <p class="pinfo">Discount: ${product.discountPercentage}%</p>
        <p class="pinfo">Category: ${product.category}</p>
        <p class="pinfo">Stock: ${product.stock}</p>
        <p class="pinfo">Rating: ${product.rating}</p>
        <p class="pinfo">Description: ${product.description}</p>
  
        ${product.images && product.images.length > 0 ? 
          `<div class="gallery">
            ${product.images.map(image => `<img src="${image}" alt="${product.title} image">`).join('')}
          </div>` : ''
        }

        
      `;
    };
  });
  