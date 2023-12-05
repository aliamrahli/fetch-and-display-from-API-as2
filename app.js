const endpoint = 'https://dummyjson.com/products';
let products;
let allCategories;
let productDiv;
let productContainer;

const clearInput = () => {
  document.getElementById('searchInput').value = '';
};

window.addEventListener('unload', clearInput);

const handleFetchErrors = (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};


const storeCategories = (data) => {
    allCategories = data
    productDiv = document.getElementsByClassName("product")
    let categorySelect = document.getElementById("categorySelect");
    
    for (i=0;i<allCategories.length;i++) {
      let categoryOption = document.createElement('option')
      categoryOption.value,categoryOption.text = allCategories[i]
      categorySelect.appendChild(categoryOption)
    }
  }
    

const searchProducts = () => {
  let searchInput = document.getElementById("searchInput")
  let filter = searchInput.value.toLowerCase()
  let apiURL = "https://dummyjson.com/products/search?q=" + encodeURIComponent(filter)
  fetch(apiURL)
    .then(handleFetchErrors)
    .then((data)=> {
        filterProducts(data)
    })
    .catch((error) => {
      console.error('Error fetching data:', error.message);
    });

}

const filterProducts = (data) => {
  let categorySelect = document.getElementById("categorySelect");
  selectedCategory = categorySelect.value.toLowerCase();
  productContainer = document.getElementById('productContainer');
  productContainer.innerHTML = ""
  products = data.products;
  products.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    if(selectedCategory=="all" || product.category == selectedCategory) {

      productDiv.innerHTML = `
      <a href="product_info.html?id=${product.id}">
          <h2>${product.title}</h2>
          <p class="description">Description: ${product.description}</p>
          <p>Price: $${product.price}</p>
          <p>Discount: ${product.discountPercentage}%</p>
          <p class="category">Category: ${product.category}</p>
          <p>Stock: ${product.stock}</p>
          <img src="${product.thumbnail}" alt="${product.title} thumbnail">
      </a>
    `;

    productContainer.appendChild(productDiv);
    }
  });
}

const displayProductInfo = (product, container) => {
  container.style.display = 'block';
  document.getElementById('productContainer').style.display = 'none';
};

fetch('https://dummyjson.com/products?limit=100')
  .then(handleFetchErrors)
  .then((data) => {
    filterProducts(data);
    console.log(data)
  })
  .catch((error) => {
    console.error('Error fetching data:', error.message);
  });

  fetch('https://dummyjson.com/products/categories')
.then(handleFetchErrors)
.then((data)=>{
    storeCategories(data);
})
.catch((error) => {
  console.error('Error fetching data:', error.message);
});


