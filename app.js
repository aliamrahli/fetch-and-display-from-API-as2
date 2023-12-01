const endpoint = 'https://dummyjson.com/products';

// Function to handle errors during the fetch operation
const handleFetchErrors = (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};


const displayProducts = (data) => {
  const productContainer = document.getElementById('productContainer');
  const products = data.products;

  // Check if products is an array
  if (Array.isArray(products)) {
    products.forEach((product) => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');

      // Display product details
      productDiv.innerHTML = `
        <h2>${product.title}</h2>
        <p>Price: $${product.price}</p>
        <p>Discount: ${product.discount}%</p>
        <p>Category: ${product.category}</p>
        <p>Stock: ${product.stock}</p>
        <img src="${product.thumbnail}" alt="${product.title} thumbnail">
      `;

      // Append the product div to the container
      productContainer.appendChild(productDiv);
    });
  } else {
    console.error('Invalid data format. Expected an array of products.');
  }
};

// Fetch data from the /products endpoint
fetch(endpoint)
  .then(handleFetchErrors)
  .then((data) => {
    // Handle the data received from the server
    displayProducts(data);
    console.log(data)
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch operation
    console.error('Error fetching data:', error.message);
  });
