import React, { useState } from 'react';
import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import useBookings from "./useBookings";
import BookingTableOperations from "./BookingTableOperations";
import Pagination from "../../ui/Pagination";
import { ITEMS_PER_PAGE } from "../../utils/globalConsts";

function BookingTable() {
  const { isLoading, data: { bookings, total } = {} } = useBookings();
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleToggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  if (isLoading) return <Spinner />;

  if (!bookings?.length) return <Empty resourceName="Bookings" />;

  return (
    <>
      <Table>
        <Table.Header columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
          <Table.Cell>Cabin</Table.Cell>
          <Table.Cell>Guest</Table.Cell>
          <Table.Cell>Dates</Table.Cell>
          <Table.Cell>Status</Table.Cell>
          <Table.Cell>Amount</Table.Cell>
          <Table.Cell> </Table.Cell>
        </Table.Header>
        
        {bookings.map((booking) => (
          <BookingRow
            key={booking.id}
            booking={booking}
            openMenuId={openMenuId}
            onToggleMenu={handleToggleMenu}
          />
        ))}
      </Table>
      
      <Pagination itemsPerPage={ITEMS_PER_PAGE} totalItems={total} />
    </>
  );
}

export default BookingTable;
