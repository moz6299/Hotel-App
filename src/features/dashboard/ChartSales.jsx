import React from "react";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useDarkMode } from "../../context/DarkModeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StyledChartSales = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin-top:1.5rem
`;

const ChartSales = ({ salesData = [] }) => {
  const { isDarkMode } = useDarkMode();

  // تحقق من أن salesData ليس undefined
  if (!salesData || salesData.length === 0) {
    return <p>No data available</p>;
  }

  // إعداد بيانات الرسم البياني
  const data = {
    labels: salesData.map((item) =>
      new Date(item.created_at).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Total Price",
        data: salesData.map((item) => item.totalPrice || 0),
        borderColor: isDarkMode ? "#10b981" : "#059669",
        backgroundColor: isDarkMode
          ? "rgba(16, 185, 129, 0.2)"
          : "rgba(5, 150, 105, 0.2)",
      },
      {
        label: "Extras Price",
        data: salesData.map((item) => item.extrasPrice || 0),
        borderColor: isDarkMode ? "#f97316" : "#ea580c",
        backgroundColor: isDarkMode
          ? "rgba(245, 158, 11, 0.2)"
          : "rgba(234, 88, 12, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: isDarkMode ? "#4b5563" : "#d1d5db",
        },
        ticks: {
          color: isDarkMode ? "#e5e7eb" : "#374151",
        },
      },
      y: {
        grid: {
          color: isDarkMode ? "#4b5563" : "#d1d5db",
        },
        ticks: {
          color: isDarkMode ? "#e5e7eb" : "#374151",
        },
      },
    },
  };

  return (
    <StyledChartSales>
      <h3>Sales Chart</h3>

      <Line data={data} options={options} />
    </StyledChartSales>
  );
};

export default ChartSales;
