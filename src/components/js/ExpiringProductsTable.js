import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/style.css';

const ExpiringProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpiringProducts = async () => {
      try {
        // Fetch expiring products with token
        const response = await axios.get('http://localhost:3008/api/expiring_products', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Fetched products:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching expiring products:', error);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchExpiringProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Products nearing the expiry</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.product_name}</td>
              <td>{product.quantity}</td>
              <td>{new Date(product.expiry_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpiringProductsTable;
