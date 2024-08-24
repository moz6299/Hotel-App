import React from "react";
import styled from "styled-components";
import { useDarkMode } from "../../context/DarkModeContext";


const StyledStatistics = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.4rem;
  padding: 2rem;
  background-color: ${({ isDarkMode }) => isDarkMode ? 'var(--color-grey-100)' : 'var(--color-grey-0)'};
  border-radius: var(--border-radius-lg);
  box-shadow: ${({ isDarkMode }) => isDarkMode ? 'var(--shadow-lg)' : 'var(--shadow-md)'};
  margin-top:1.5rem;
`;

const StatBox = styled.div`
  background-color: ${({ isDarkMode }) => isDarkMode ? 'var(--color-brand-700)' : 'var(--color-brand-100)'};
  padding: 1.6rem;
  border-radius: var(--border-radius-md);
  text-align: center;
  box-shadow: ${({ isDarkMode }) => isDarkMode ? 'var(--shadow-md)' : 'var(--shadow-sm)'};
`;

const StatNumber = styled.div`
  font-size: 3.2rem;
  font-weight: 700;
  color: ${({ isDarkMode }) => isDarkMode ? 'var(--color-brand-100)' : 'var(--color-brand-600)'};
`;

const StatLabel = styled.div`
  font-size: 1.4rem;
  color: ${({ isDarkMode }) => isDarkMode ? 'var(--color-brand-100)' : 'var(--color-grey-700)'};
`;

const Statistics = ({ recentBookings, staysToday }) => {
  const { isDarkMode } = useDarkMode(); // استخدام الوضع الداكن

  const totalBookings = recentBookings ? recentBookings.length : 0;
  const totalSales = recentBookings
    ? recentBookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0)
    : 0;

  const checkIns = staysToday
    ? staysToday.filter(stay => stay.status === "checked-in").length
    : 0;

  const occupancyRate = staysToday
    ? (staysToday.filter(stay => stay.status === "checked-in").length / staysToday.length) * 100
    : 0;

    
  return (
    <StyledStatistics isDarkMode={isDarkMode}>
      <StatBox isDarkMode={isDarkMode}>
        <StatNumber isDarkMode={isDarkMode}>{totalBookings}</StatNumber>
        <StatLabel isDarkMode={isDarkMode}>Total Bookings</StatLabel>
      </StatBox>
      <StatBox isDarkMode={isDarkMode}>
        <StatNumber isDarkMode={isDarkMode}>{`$${totalSales}`}</StatNumber>
        <StatLabel isDarkMode={isDarkMode}>Total Sales</StatLabel>
      </StatBox>
      <StatBox isDarkMode={isDarkMode}>
        <StatNumber isDarkMode={isDarkMode}>{checkIns}</StatNumber>
        <StatLabel isDarkMode={isDarkMode}>Check-ins</StatLabel>
      </StatBox>
      <StatBox isDarkMode={isDarkMode}>
        <StatNumber isDarkMode={isDarkMode}>{occupancyRate.toFixed(2)}%</StatNumber>
        <StatLabel isDarkMode={isDarkMode}>Occupancy Rate</StatLabel>
      </StatBox>
    </StyledStatistics>
  );
};

export default Statistics;
