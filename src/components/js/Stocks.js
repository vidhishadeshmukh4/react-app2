// src/components/Stocks.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Stocks.css';
import StocksChart from './StocksChart';

const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(25); // Default to 25 rows

  useEffect(() => {
    axios.get('http://localhost:3008/api/stocks')
      .then(response => {
        setStocks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the stocks data!', error);
      });
  }, []);

  // Determine how many rows to display
  const displayData = rowsPerPage === 'all' ? stocks : stocks.slice(0, parseInt(rowsPerPage, 10));

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  return (
    <div className="stocks-container">
      <h1>Stocks</h1>
      <StocksChart stocks={stocks} />
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
      {stocks.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Stock ID</th>
              <th>Inward ID</th>
              <th>Product ID</th>
              <th>Supplier ID</th>
              <th>Quantity</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map(stock => (
              <tr key={stock.stock_id}>
                <td>{stock.stock_id}</td>
                <td>{stock.inward_id}</td>
                <td>{stock.product_id}</td>
                <td>{stock.supplier_id}</td>
                <td>{stock.quantity}</td>
                <td>{new Date(stock.expiry_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No stock data available.</p>
      )}
    </div>
  );
};

export default Stocks;
