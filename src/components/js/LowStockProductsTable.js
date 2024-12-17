import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/style.css';

const LowStockProductsTable = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch low stock products
        const lowStockResponse = await axios.get('http://localhost:3008/api/low-stock');
        const products = lowStockResponse.data;
        setLowStockProducts(products);

        // Fetch product details for each product_id
        const fetchProductDetails = async () => {
          const details = {};
          for (const product of products) {
            try {
              const productResponse = await axios.get(`http://localhost:3008/api/products/${product.product_id}`);
              console.log(`Fetched details for product ${product.product_id}:`, productResponse.data); // Debugging log
              
              // Ensure the response contains the product_name field
              if (productResponse.data && productResponse.data.product_name) {
                details[product.product_id] = productResponse.data.product_name;
              } else {
                console.warn(`No product_name found for product ${product.product_id}`, productResponse.data); // Debugging log
                details[product.product_id] = 'No name available';
              }
            } catch (error) {
              console.error(`Error fetching details for product ${product.product_id}:`, error);
              details[product.product_id] = 'Error'; // Handle errors gracefully
            }
          }
          console.log('Product details:', details); // Debugging log
          setProductDetails(details);
          setLoading(false); // Set loading to false after data is fetched
        };

        await fetchProductDetails();
      } catch (error) {
        console.error('Error fetching low stock products:', error);
        setLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div>
      <h1>Products going out of stock soon</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {lowStockProducts.length > 0 ? (
            lowStockProducts.map(product => (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>{productDetails[product.product_id] || 'No name available'}</td>
                <td>{product.quantity}</td>
                <td>{new Date(product.expiry_date).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LowStockProductsTable;
