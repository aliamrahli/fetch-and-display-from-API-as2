const endpoint = 'https://dummyjson.com/products';
let products;
let allCategories;
let productDiv;
// const titles = None;

// Function to handle errors during the fetch operation
const handleFetchErrors = (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

const storeCategories = (data) => {
  allCategories = data
  filterByCategory()
}

const filterByCategory = () => {
    productDiv = document.getElementsByClassName("product")


    let categorySelect = document.getElementById("categorySelect");
    
    for (i=0;i<allCategories.length;i++) {
      let categoryOption = document.createElement('option')
      categoryOption.value = allCategories[i]
      categoryOption.text = allCategories[i]
      categorySelect.appendChild(categoryOption)
    }

    for(i=0;i<productDiv.length;i++){
      selectedCategory = categorySelect.value.toLowerCase();
      categoryP = productDiv[i].querySelector('.category').innerHTML;
      // console.log(selectedCategory)
      
      console.log(productDiv[i].category)
      if(selectedCategory == "all") {
        productDiv[i].style.display = "block";
        
      }

      else if(categoryP.toLowerCase().includes(selectedCategory))
      {
          productDiv[i].style.display = "";
      }

      else 
        productDiv[i].style.display = "none";
    }



}




const displayProducts = (data) => {
      const productContainer = document.getElementById('productContainer');
  
      products = data.products;

      products.forEach((product) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        // Display product details
        productDiv.innerHTML = `
          <h2>${product.title}</h2>
          <p class="description">Description: ${product.description}</p>
          <p>Price: $${product.price}</p>
          <p>Discount: ${product.discountPercentage}%</p>
          <p class="category">Category: ${product.category}</p>
          <p>Stock: ${product.stock}</p>
          <a href="product_info.html?id=${product.id}">
            <img src="${product.thumbnail}" alt="${product.title} thumbnail">
          </a>
        `;

        // Append the product div to the container
        productContainer.appendChild(productDiv);
      });
};

const searchProducts = () => {
    let productDiv = document.getElementsByClassName("product")
    input = document.getElementById("searchInput");
    filter = input.value.toLowerCase()
    

    for(i = 0; i < productDiv.length; i++) {
        categoryP = productDiv[i].querySelector('.category').innerHTML;
        titleH2 = productDiv[i].getElementsByTagName('h2')[0].innerHTML;
        descP = productDiv[i].querySelector('.description').innerHTML;

        if(categoryP.toLowerCase().includes(filter) || titleH2.toLowerCase().includes(filter) 
        || descP.toLowerCase().includes(filter)) {  

          productDiv[i].style.display = "";

    } else {
      productDiv[i].style.display = "none";
    }

    }

      



}


const displayProductInfo = (product, container) => {
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

  fetch('https://dummyjson.com/products/categories')
.then(handleFetchErrors)
.then((data)=>{
    storeCategories(data);
})
.catch((error) => {
  // Handle any errors that occurred during the fetch operation
  console.error('Error fetching data:', error.message);
});


