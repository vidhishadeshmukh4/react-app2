// src/components/ProductTypeChart.js
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const ProductTypeChart = ({ productsData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const productTypes = {};
    productsData.forEach(product => {
      productTypes[product.product_type] = (productTypes[product.product_type] || 0) + 1;
    });

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(productTypes),
        datasets: [
          {
            label: 'Number of Products',
            data: Object.values(productTypes),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Product Type',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Number of Products',
            },
            beginAtZero: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => {
      chart.destroy();
    };
  }, [productsData]);

  return <canvas ref={chartRef} style={{ maxHeight: '400px' }}></canvas>;
};

export default ProductTypeChart;