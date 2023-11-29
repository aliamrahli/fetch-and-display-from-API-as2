const endpoint = 'https://dummyjson.com/products';

const fetchData = async () => {
  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();
    displayData(data); // Call the function to display data
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
};

const displayData = (data) => {
  const productList = document.getElementById('productList');

  data.forEach((product) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>Title:</strong> ${product.title}<br>
      <strong>Price:</strong> ${product.price}<br>
      <strong>Discount:</strong> ${product.discount}<br>
      <strong>Category:</strong> ${product.category}<br>
      <strong>Stock:</strong> ${product.stock}<br>
      <img src="${product.thumbnail}" alt="Thumbnail"><br><br>
    `;
    productList.appendChild(listItem);
  });
};

fetchData();
