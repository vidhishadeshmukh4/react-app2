// src/components/Sales.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Sales.css';
import SalesChart from './SalesChart';

const Sales = () => {
  const [salesData, setSalesData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(25); // Default to 25 rows

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('http://localhost:3008/api/sales');
        setSalesData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sales data:', error);
        setError('Failed to fetch sales data.');
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Determine how many rows to display
  const displayData = rowsPerPage === 'all' ? salesData : salesData.slice(0, rowsPerPage);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  return (
    <div className="sales">
      <h2>Sales Data</h2>
      <div className="charts-container">
        <SalesChart salesData={salesData} />
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
            <th>Sales ID</th>
            <th>Customer ID</th>
            <th>Employee ID</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {displayData.length > 0 ? (
            displayData.map((sale) => (
              <tr key={sale.sales_id}>
                <td>{sale.sales_id}</td>
                <td>{sale.customer_id}</td>
                <td>{sale.employee_id}</td>
                <td>{sale.total_cost}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No sales available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Sales;
