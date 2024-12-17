import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const ProductPieChart = ({ productsData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const productNames = {};
    productsData.forEach(product => {
      productNames[product.package_type] = (productNames[product.package_type] || 0) + 1;
    });

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(productNames),
        datasets: [
          {
            label: 'Number of Packages',
            data: Object.values(productNames),
            backgroundColor: Object.keys(productNames).map((_, i) => `hsl(${i * 360 / Object.keys(productNames).length}, 100%, 75%)`),
          },
        ],
      },
      options: {
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

export default ProductPieChart;
