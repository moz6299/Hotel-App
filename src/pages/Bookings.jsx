import { useQuery } from "@tanstack/react-query";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "./../features/bookings/BookingTable";
import { getBookings } from "../services/apiBookings";
import Spinner from "../ui/Spinner";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import styled from "styled-components";

const StyledBookingTable = styled.div`
  margin-top: 2rem; 
`;

function Bookings() {
  

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <StyledBookingTable>
        <BookingTable />
      </StyledBookingTable>
    </>
  );
}

export default Bookings;
