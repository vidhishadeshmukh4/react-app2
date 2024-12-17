// src/components/SaleDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SaleDetails = () => {
  const { sales_id } = useParams();
  const [saleDetails, setSaleDetails] = useState(null);

  useEffect(() => {
    axios.get('/api/sales_details/${sales_id}')
      .then(response => setSaleDetails(response.data))
      .catch(error => console.error('Error fetching sale details:', error));
  }, [sales_id]);

  if (!saleDetails) return <div>Loading...</div>;

  return (
    <div className="sale-details">
      <h2>Sale Details</h2>
      <p><strong>ID:</strong> {saleDetails.sales_id}</p>
      <p><strong>Customer ID:</strong> {saleDetails.customer_id}</p>
      <p><strong>Employee ID:</strong> {saleDetails.employee_id}</p>
      <p><strong>Total Amount:</strong> {saleDetails.total_amount}</p>
      <p><strong>Date:</strong> {saleDetails.date}</p>
    </div>
  );
};

export default SaleDetails;