import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import '../css/StocksChart.css'; // Ensure you have the CSS file for styling

const StocksChart = ({ stocks }) => {
  const productChartRef = useRef(null);
  const supplierChartRef = useRef(null);
  const productChartInstance = useRef(null);
  const supplierChartInstance = useRef(null);

  useEffect(() => {
    if (productChartRef.current && supplierChartRef.current) {
      const ctxProduct = productChartRef.current.getContext('2d');
      const ctxSupplier = supplierChartRef.current.getContext('2d');

      if (ctxProduct && ctxSupplier) {
        // Destroy previous chart instances if they exist
        if (productChartInstance.current) {
          productChartInstance.current.destroy();
        }
        if (supplierChartInstance.current) {
          supplierChartInstance.current.destroy();
        }

        // Prepare data for the product quantity chart
        const productQuantities = stocks.reduce((acc, stock) => {
          acc[stock.product_id] = (acc[stock.product_id] || 0) + stock.quantity;
          return acc;
        }, {});
        const productLabels = Object.keys(productQuantities);
        const productData = Object.values(productQuantities);

        // Prepare data for the supplier quantity chart
        const supplierQuantities = stocks.reduce((acc, stock) => {
          acc[stock.supplier_id] = (acc[stock.supplier_id] || 0) + stock.quantity;
          return acc;
        }, {});
        const supplierLabels = Object.keys(supplierQuantities);
        const supplierData = Object.values(supplierQuantities);

        // Create the product quantity bar chart
        productChartInstance.current = new Chart(ctxProduct, {
          type: 'bar',
          data: {
            labels: productLabels,
            datasets: [
              {
                label: 'Quantity per Product',
                data: productData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Product ID',
                },
                ticks: {
                  autoSkip: true,
                  maxRotation: 45,
                  minRotation: 45,
                },
                grid: {
                  offset: true,
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Quantity',
                },
                ticks: {
                  beginAtZero: true,
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
                labels: {
                  font: {
                    size: 12,
                  },
                },
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    return `Quantity: ${tooltipItem.raw}`;
                  },
                },
              },
            },
          },
        });

        // Create the supplier quantity bar chart
        supplierChartInstance.current = new Chart(ctxSupplier, {
          type: 'bar',
          data: {
            labels: supplierLabels,
            datasets: [
              {
                label: 'Quantity per Supplier',
                data: supplierData,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Supplier ID',
                },
                ticks: {
                  autoSkip: true,
                  maxRotation: 45,
                  minRotation: 45,
                },
                grid: {
                  offset: true,
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Quantity',
                },
                ticks: {
                  beginAtZero: true,
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
                labels: {
                  font: {
                    size: 12,
                  },
                },
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    return `Quantity: ${tooltipItem.raw}`;
                  },
                },
              },
            },
          },
        });
      }
    }
  }, [stocks]);

  return (
    <div className="stocks-chart">
      <div className="chart-wrapper">
        <h2>Quantity per Product</h2>
        <canvas ref={productChartRef}></canvas>
      </div>
      <div className="chart-wrapper">
        <h2>Quantity per Supplier</h2>
        <canvas ref={supplierChartRef}></canvas>
      </div>
    </div>
  );
};

export default StocksChart;
