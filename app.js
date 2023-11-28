const endpoint = 'https://dummyjson.com/products';


const fetchData = async () => {
  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched data:', data);
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
};


fetchData();