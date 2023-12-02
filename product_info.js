// product_info.js
const endpoint = 'https://dummyjson.com/products';
const handleFetchErrors = (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};
document.addEventListener('DOMContentLoaded', () => {

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
  
    // Fetch data for the specific product based on the ID
    fetch(endpoint)
      .then(handleFetchErrors)
      .then((data) => {
        const product = data.products[productId-1];
        console.log(product)
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
        <h2>${product.title}</h2>
        <p>Price: $${product.price}</p>
        <p>Discount: ${product.discountPercentage}%</p>
        <p>Category: ${product.category}</p>
        <p>Stock: ${product.stock}</p>
        <p>Description: ${product.description}</p>
        <p>Rating: ${product.rating}</p>
  
        ${product.images && product.images.length > 0 ? 
          `<div class="gallery">
            ${product.images.map(image => `<img src="${image}" alt="${product.title} image">`).join('')}
          </div>` : ''
        }

        
      `;
    };
  });
  