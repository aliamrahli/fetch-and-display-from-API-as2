const endpoint = 'https://dummyjson.com/products';

// Function to handle errors during the fetch operation
const handleFetchErrors = (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};


const displayProducts = (products) => {
  const productContainer = document.getElementById('productContainer');

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
};

// Fetch data from the /products endpoint
fetch(endpoint)
  .then(handleFetchErrors)
  .then((data) => {
    // Handle the data received from the server
    console.log('Products data:', data);
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch operation
    console.error('Error fetching data:', error.message);
  });
