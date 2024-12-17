import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import '../css/SalesChart.css'; // Import the CSS file for styling

const SalesChart = ({ salesData }) => {
  const barChartRef = useRef(null);
  const employeeChartRef = useRef(null);
  const barChartInstance = useRef(null);
  const employeeChartInstance = useRef(null);

  useEffect(() => {
    if (barChartRef.current && employeeChartRef.current) {
      const ctxBar = barChartRef.current.getContext('2d');
      const ctxEmployee = employeeChartRef.current.getContext('2d');
      
      if (ctxBar && ctxEmployee) {
        // Destroy previous chart instances if they exist
        if (barChartInstance.current) {
          barChartInstance.current.destroy();
        }
        if (employeeChartInstance.current) {
          employeeChartInstance.current.destroy();
        }

        // Prepare data for the sales ID vs. total cost bar chart
        const labels = salesData.map(sale => `Sale ID: ${sale.sales_id}`);
        const data = salesData.map(sale => parseFloat(sale.total_cost));

        // Prepare data for the total sales by employee bar chart
        const employeeSales = salesData.reduce((acc, sale) => {
          acc[sale.employee_id] = (acc[sale.employee_id] || 0) + parseFloat(sale.total_cost);
          return acc;
        }, {});
        const employeeLabels = Object.keys(employeeSales);
        const employeeData = Object.values(employeeSales);

        // Create the sales ID vs. total cost bar chart
        barChartInstance.current = new Chart(ctxBar, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Total Cost',
                data: data,
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
                  text: 'Sales ID',
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
                  text: 'Total Cost',
                },
                ticks: {
                  beginAtZero: true,
                  callback: (value) => `₹${value.toFixed(2)}`, // Format y-axis values with ₹
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
                  label: function(tooltipItem) {
                    return `Total Cost: ₹${tooltipItem.raw.toFixed(2)}`; // Format tooltip values with ₹
                  },
                },
              },
            },
          },
        });

        // Create the total sales by employee bar chart
        employeeChartInstance.current = new Chart(ctxEmployee, {
          type: 'bar',
          data: {
            labels: employeeLabels,
            datasets: [
              {
                label: 'Total Sales by Employee',
                data: employeeData,
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
                  text: 'Employee ID',
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
                  text: 'Total Sales',
                },
                ticks: {
                  beginAtZero: true,
                  callback: (value) => `₹${value.toFixed(2)}`, // Format y-axis values with ₹
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
                  label: function(tooltipItem) {
                    return `Total Sales: ₹${tooltipItem.raw.toFixed(2)}`; // Format tooltip values with ₹
                  },
                },
              },
            },
          },
        });
      }
    }
  }, [salesData]);

  return (
    <div className="sales-chart">
      <div className="chart-wrapper">
        <h2>Total Cost by Sales ID</h2>
        <canvas ref={barChartRef}></canvas>
      </div>
      <div className="chart-wrapper">
        <h2>Total Sales by Employee</h2>
        <canvas ref={employeeChartRef}></canvas>
      </div>
    </div>
  );
};

export default SalesChart;
