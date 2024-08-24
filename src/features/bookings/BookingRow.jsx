// BookingRow.js
import React from "react";
import { format, isToday } from "date-fns";
import styled from "styled-components";
import Tag from "../../ui/Tag";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import ThreeDotsMenu from "../../ui/ThreeDotsMenu";
import { FaEye } from "react-icons/fa";
import Table from "../../ui/Table";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useUpdateBooking } from "./useUpdateBooking";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
  openMenuId,
  onToggleMenu,
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const { updatingBooking, isUpdating } = useUpdateBooking();

  const navigate = useNavigate();

  const handleCheckOut = () => {
    if (bookingId)
      updatingBooking({ bookingId, updates: { status: "checked-out" } });
  };

 

  return (
    <Table.Row columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Cell>
        <Cabin>{cabinName}</Cabin>
      </Table.Cell>

      <Table.Cell>
        <Stacked>
          <span>{guestName}</span>
          <span>{email}</span>
        </Stacked>
      </Table.Cell>

      <Table.Cell>
        <Stacked>
          <span>
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}{" "}
            &rarr; {numNights} night stay
          </span>
          <span>
            {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
            {format(new Date(endDate), "MMM dd yyyy")}
          </span>
        </Stacked>
      </Table.Cell>

      <Table.Cell>
        <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
      </Table.Cell>

      <Table.Cell>
        <Amount>{formatCurrency(totalPrice)}</Amount>
      </Table.Cell>

      <Table.Cell>
        <ThreeDotsMenu
          id={bookingId}
          openMenuId={openMenuId}
          onToggleMenu={onToggleMenu}
        >
          <ThreeDotsMenu.Button />
          <ThreeDotsMenu.List>
            <ThreeDotsMenu.Item
              icon={<FaEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See Details
            </ThreeDotsMenu.Item>
            {status === "unconfirmed" && (
              <ThreeDotsMenu.Item
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </ThreeDotsMenu.Item>
            )}
            {status === "checked-in" && (
              <ThreeDotsMenu.Item
                icon={<HiArrowUpOnSquare />}
                onClick={handleCheckOut}
              >
                Check Out
              </ThreeDotsMenu.Item>
            )}
          </ThreeDotsMenu.List>
        </ThreeDotsMenu>
      </Table.Cell>
    </Table.Row>
  );
}

export default BookingRow;
