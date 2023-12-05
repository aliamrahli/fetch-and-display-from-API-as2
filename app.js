let products;
let allCategories;
let productDiv;
let productContainer;
let pageNumber=1;

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
    

const searchProducts = (data) => {
  let searchInput = document.getElementById("searchInput")
  let filter = searchInput.value.toLowerCase()
  let apiURL = "https://dummyjson.com/products/search?q=" + encodeURIComponent(filter)+"&limit=100"
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
  min = (pageNumber-1)*10 + 1
  max = (pageNumber)*10
  selectedCategory = categorySelect.value.toLowerCase();
  productContainer = document.getElementById('productContainer');
  productContainer.innerHTML = ""
  products = data.products;
  
  products.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    if(product.id >= min && product.id <=max) {
      if(selectedCategory=="all" || product.category == selectedCategory) {

        productDiv.innerHTML = `
        <a href="product_info.html?id=${product.id}">
            <h2>${product.title}</h2>
            <p>Price: $${product.price}</p>
            <p>Discount: ${product.discountPercentage}%</p>
            <p class="category">Category: ${product.category}</p>
            <p>Stock: ${product.stock}</p>
            <img src="${product.thumbnail}" alt="${product.title} thumbnail">
        </a>
      `;
  
      productContainer.appendChild(productDiv);
      }
    }
  })
        if(productContainer.innerHTML=='') {
          const h1 = document.createElement('h1')
          h1.id = "text"
          productContainer.appendChild(h1)
          document.getElementById('text').innerHTML = "Not found any products"
      }
  
}


const fetchPages = (event) => {
  id = event.target.id.match(/\d+/)[0]
  pageNumber = id 
  // automatically setting the endpoint of fetching. Limit will stay same.
  // skip will change depending on which page is clicked. Let's say 3rd page clicked, so we
  // need to skip 20 pages, (id-1)*10 gives us that result for each page
  fetch(`https://dummyjson.com/products?limit=10&skip=${(id-1)*10}`)
  .then(handleFetchErrors)
  .then((data) => {
    filterProducts(data);
   
  })
  .catch((error) => {
    console.error('Error fetching data:', error.message);
  });

}

const handlePagination = () => {
 
  // I hardcoded here, because fetching from API doesn't exactly give us the number of products
  // so we can manually set the number of pages
  pagebarDiv = document.getElementById("pagebar")
  for(i=1; i<=10; i++) {
      let pageButton = document.createElement("button")
      pageButton.id = `"page${i}"`
      pageButton.classList.add('pages')
      pageButton.onclick = fetchPages;
      pageButton.innerHTML = i
      pagebarDiv.appendChild(pageButton)
  }
  pagebarDiv.style.display = "flex"
  pagebarDiv.style.justifyContent = "center"
}

fetch('https://dummyjson.com/products?limit=10')
  .then(handleFetchErrors)
  .then((data) => {
    filterProducts(data);
   
  })
  .catch((error) => {
    console.error('Error fetching data:', error.message);
  });

  fetch('https://dummyjson.com/products/categories')
.then(handleFetchErrors)
.then((data)=>{
    storeCategories(data);
    handlePagination()
})
.catch((error) => {
  console.error('Error fetching data:', error.message);
});


