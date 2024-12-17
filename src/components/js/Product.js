// src/components/Products.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Product.css';
import '../css/ChartConatiner.css';
import ProductTypeChart from './ProductTypeChart';
import ProductPieChart from './ProductPieChart';

const Product = () => {
  const [productsData, setProductsData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(25); // Default to 25 rows

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await axios.get('http://localhost:3008/products');
        setProductsData(response.data);
      } catch (error) {
        console.error('Error fetching products data:', error);
      }
    };

    fetchProductsData();
  }, []);

  // Determine how many rows to display
  const displayData = rowsPerPage === 'all' ? productsData : productsData.slice(0, parseInt(rowsPerPage, 10));

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  return (
    <div className="products">
      <h2>Products Data</h2>
      <div className="chart-container">
        <div className="chart-box">
          <ProductTypeChart productsData={productsData} />
        </div>
        <div className="chart-box">
          <ProductPieChart productsData={productsData} />
        </div>
      </div>
      <div className="pagination-controls">
        <label htmlFor="rows-per-page">Show:</label>
        <select
          id="rows-per-page"
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value="all">All</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Package</th>
            <th>Flavor</th>
            <th>Product Type</th>
          </tr>
        </thead>
        <tbody>
          {displayData.length > 0 ? (
            displayData.map((product) => (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>{product.product_name}</td>
                <td>{product.package_type}</td>
                <td>{product.flavour}</td>
                <td>{product.product_type}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
