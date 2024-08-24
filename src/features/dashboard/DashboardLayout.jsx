import styled from "styled-components";
import React from "react";
import useBookings from "./useRecentBookings";
import useStaysAfterDate from "./useStaysAfterDate";
import Statistics from "./Statistics";
import Spinner from "../../ui/Spinner";
import ChartSales from "./ChartSales";
import PieChart from "./PieChart";
import TodayTable from "./TodayTable";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* عمودين متساويين */
  gap: 2.4rem;
  background-color: var(--color-grey-50);
  padding: 1rem;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  margin-top:2rem;

  /* تحديد الأبعاد لتناسب العرض المتاح */
  .pie-chart, .today-table {
    max-height: 400px; /* أو قيمة أخرى مناسبة */
    overflow: hidden; /* لتجنب تجاوز العنصر */
  }

  .pie-chart {
    grid-column: 1 / span 1; /* وضع الـ PieChart في العمود الأول */
  }

  .today-table {
    grid-column: 2 / span 18; /* وضع الـ TodayTable في العمود الثاني */
    overflow-x: auto; /* تمرير أفقي إذا لزم الأمر */
    overflow-y: auto; /* تمرير أفقي إذا لزم الأمر */
  }
`;

const DashboardLayout = () => {
  const { data: recentBookings, isLoading1 } = useBookings();
  const { data: staysToday, isLoading2 } = useStaysAfterDate();

  if (isLoading1 || isLoading2) return <Spinner />;

  return (
    <>
      <Statistics recentBookings={recentBookings} staysToday={staysToday} />
      <StyledDashboardLayout>
        <div className="pie-chart">
          <PieChart bookingsData={staysToday} />
        </div>
        <div className="today-table">
          <TodayTable />
        </div>
      </StyledDashboardLayout>
      <ChartSales salesData={recentBookings} />
    </>
  );
};

export default DashboardLayout;
