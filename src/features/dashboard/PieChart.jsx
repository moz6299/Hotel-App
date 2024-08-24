import React from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useDarkMode } from '../../context/DarkModeContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const StyledPieChart = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  max-height: 400px; /* أو قيمة أخرى مناسبة */
  overflow: hidden; /* لتجنب تجاوز العنصر */
`;

const PieChart = ({ bookingsData=[] }) => {
  const { isDarkMode } = useDarkMode();

  const checkedInBookings = bookingsData.filter(booking => booking.status === 'checked-in');
  const nightsData = checkedInBookings.reduce((acc, booking) => {
    const nights = booking.numNights;
    if (!acc[nights]) acc[nights] = 0;
    acc[nights] += 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(nightsData).map(nights => `${nights} Nights`),
    datasets: [
      {
        label: 'Number of Nights',
        data: Object.values(nightsData),
        backgroundColor: Object.keys(nightsData).map((_, index) => {
          const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
          return colors[index % colors.length];
        }),
        borderColor: Object.keys(nightsData).map((_, index) => {
          const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
          return colors[index % colors.length];
        }),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDarkMode ? '#e5e7eb' : '#374151',
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label;
          },
        },
      },
    },
  };

  return (
    <>
    <h3>Nights Chart</h3>
    <StyledPieChart>
      <Pie data={data} options={options} />
    </StyledPieChart>
    </>
  );
};

export default PieChart;
