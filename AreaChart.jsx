import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const StocksChart = ({ stocks }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line', // Use 'line' type for area charts
      data: {
        labels: stocks.map(stock => stock.symbol), // Stock names as labels
        datasets: [
          {
            label: 'Price',
            data: stocks.map(stock => stock.price),
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Light blue
            borderColor: 'rgba(54, 162, 235, 1)',
            fill: true, // Fill area under the line
          },
          {
            label: 'Market Value',
            data: stocks.map(stock => stock.market_value),
            backgroundColor: 'rgba(255, 206, 86, 0.2)', // Light yellow
            borderColor: 'rgba(255, 206, 86, 1)',
            fill: true,
          },
          // Add more datasets for 'Change', 'Percentage Owned' as needed
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => chart.destroy(); // Clean up the chart instance on component unmount
  }, [stocks]); // Re-run effect if stocks data changes

  return <canvas ref={chartRef}></canvas>;
};

export default StocksChart;
