import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Tag from './../../ui/Tag';
import { useUpdateBooking } from "../bookings/useUpdateBooking";

const TableRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-200);
  min-width: 60rem; /* عرض ثابت لصف الجدول، يمكنك تعديله حسب الحاجة */
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.6rem;
  }
`;

const GuestInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Flag = styled.img`
  width: 2rem;
  height: auto;
  border-radius: 50%;
`;

const GuestName = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-800);
`;

const Nights = styled.span`
  font-size: 1.2rem;
  color: var(--color-grey-600);

  @media (max-width: 768px) {
    width: 100%;
    text-align: left;
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.6rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background-color: var(--color-brand-700);
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-brand-800);
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const Tableitem = ({ tableItem }) => {
  const { status, guests, numNights, id } = tableItem;
  const navigate = useNavigate();

  const { updatingBooking, isUpdating } = useUpdateBooking();

  const handleCheckIn = () => {
    navigate(`/checkin/${id}`);
  };

  const handleCheckOut = () => {
    updatingBooking({
      bookingId: id,
      updates: { status: "checked-out" },
      shouldNavigate: false 
    });
  };

  return (
    <TableRow>
      <Tag type={status === "checked-in" ? "blue" : "green"}>
        {status === "checked-in" ? "Departing" : "Arriving"}
      </Tag>
      <GuestInfo>
        <Flag src={guests.countryFlag} alt={`${guests.nationality} flag`} />
        <GuestName>{guests.fullName}</GuestName>
      </GuestInfo>
      <Nights>{numNights} Nights</Nights>
      {status === "checked-in" ? (
        <Button onClick={handleCheckOut} disabled={isUpdating}>
          {isUpdating ? "Checking Out..." : "Check Out"}
        </Button>
      ) : (
        <Button onClick={handleCheckIn}>Check In</Button>
      )}
    </TableRow>
  );
};

export default Tableitem;
