import React from "react";
import { useStaysTodayActivity } from "./useStaysTodayActivity";
import Tableitem from "./Tableitem";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  overflow-x: auto; /* تمرير أفقي إذا لزم الأمر */
  
  h3 {
    color: var(--color-grey-900);
    margin-bottom: 1rem;
  }

  p {
    color: var(--color-grey-500);
  }

  /* استخدام flexbox لعرض العناصر في أعمدة مع توفير مساحة مناسبة */
  .items-container {
    display: flex;
    flex-direction: column; /* عرض العناصر في أعمدة */
    gap: 1rem; /* المسافة بين الصفوف */
  }
`;

const TodayTable = () => {
  const { isLoading3, data: todayData } = useStaysTodayActivity();

  if (isLoading3) return <Spinner />;
  

  return (
    <Container>
      <h3>Today Activities</h3>
      {!todayData?.length && <p>No activity today.</p>}
      <div className="items-container">
        {todayData?.map((item) => (
          <Tableitem tableItem={item} key={item.id} />
        ))}
      </div>
    </Container>
  );
};

export default TodayTable;
