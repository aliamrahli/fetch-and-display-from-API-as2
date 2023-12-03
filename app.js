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


  // Populate category select options
  // let categories = [...new Set(products.map(product => product.category))];
  // categories.forEach(category => {
  //     const option = document.createElement('option');
  //     option.value = category;
  //     option.textContent = category;
  //     categorySelect.appendChild(option);
  // });

  

  // Check if products is an array
    if (Array.isArray(products)) {
      products.forEach((product) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        // Display product details
        productDiv.innerHTML = `
          <h2>${product.title}</h2>
          <p>Price: $${product.price}</p>
          <p>Discount: ${product.discountPercentage}%</p>
          <p>Category: ${product.category}</p>
          <p>Stock: ${product.stock}</p>
          <a href="product_info.html?id=${product.id}">
            <img src="${product.thumbnail}" alt="${product.title} thumbnail">
          </a>
        `;

        // Append the product div to the container
        productContainer.appendChild(productDiv);
      });
    } else {
      console.error('Invalid data format. Expected an array of products.');
    }
};


const searchProducts = () => {
  const searchInput = document.getElementById('searchInput');
  const keyword = searchInput.value.trim();

  // Check if a keyword is provided
  if (keyword !== '') {
    const searchEndpoint = `https://dummyjson.com/products/search?q=phone`;

    fetch(searchEndpoint)
      .then(handleFetchErrors)
      .then((data) => {
        // Handle the data received from the server
        displayProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error.message);
      });
  } else {
    console.error('Please enter a keyword to search.');
  }
};


const displayProductInfo = (product, container) => {
  container.innerHTML = `
    <h2>${product.title}</h2>
    <p>Price: $${product.price}</p>
    <p>Discount: ${product.discountPercentage}%</p>
    <p>Category: ${product.category}</p>
    <p>Stock: ${product.stock}</p>
    <img src="${product.thumbnail}" alt="${product.title} thumbnail">
    <!-- Add additional details as needed -->

    <!-- Gallery Section -->
    <div class="gallery">
      <!-- Add gallery images dynamically -->
      ${product.gallery.map(image => `<img src="${image}" alt="${product.title} gallery image">`).join('')}
    </div>
  `;

  // Show the product info container and hide the product container
  container.style.display = 'block';
  document.getElementById('productContainer').style.display = 'none';
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
