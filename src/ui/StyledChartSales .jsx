import styled from "styled-components";

const StyledChartSales = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.box};
`;

export default StyledChartSales;
