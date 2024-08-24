// CheckinBooking.js

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useUpdateBooking } from "../bookings/useUpdateBooking";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  margin-bottom: 2rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-top: 2rem;
`;

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 0.25rem;
  border: 1px solid var(--color-grey-400);
  background-color: var(--color-grey-100);
  cursor: pointer;
`;

function CheckinBooking() {
  const { data: booking, isLoading: isLoadingBooking } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const moveBack = useMoveBack();
  const { updatingBooking, isUpdating } = useUpdateBooking();

  const [breakFastOption, setBreakFastOption] = useState(false);
  const [confirmPaid, setConfirmPaid] = useState(false);

  useEffect(() => {
    if (booking) {
      setBreakFastOption(booking.hasBreakfast);
      setConfirmPaid(booking.isPaid);
    }
  }, [booking]);

  if (isLoadingBooking || isLoadingSettings) return <Spinner />;

  if (!booking) return <p>Booking not found.</p>;

  const {
    id: bookingId,
    isPaid,
    hasBreakfast,
    numNights,
    totalPrice,
    extrasPrice,
  } = booking;

  const { breakfastPrice, currency } = settings;

  // حساب سعر الإفطار الإجمالي
  const breakfastTotalPrice = breakfastPrice * numNights;

  // حساب السعر الإجمالي الجديد بناءً على اختيار الإفطار
  const newExtrasPrice = breakFastOption
    ? extrasPrice + breakfastTotalPrice
    : extrasPrice;

  const newTotalPrice = breakFastOption
    ? totalPrice + breakfastTotalPrice
    : totalPrice;

  const handleCheckin = () => {
    const updates = {
      status: "checked-in",
      isPaid: true,
      extrasPrice: newExtrasPrice,
      totalPrice: newTotalPrice,
      hasBreakfast: breakFastOption,
    };

    updatingBooking({ bookingId, updates });
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <CheckboxContainer>
            <StyledCheckbox
              checked={breakFastOption}
              onChange={() => {
                setBreakFastOption(!breakFastOption);
                setConfirmPaid(false); // إعادة تعيين تأكيد الدفع عند تغيير خيار الإفطار
              }}
              disabled={hasBreakfast}
            />
            <label>
              Add breakfast for {numNights} night(s):{" "}
              {formatCurrency(breakfastTotalPrice, currency)}
            </label>
          </CheckboxContainer>
        </Box>
      )}

      <Box>
        <CheckboxContainer>
          <StyledCheckbox
            checked={confirmPaid}
            onChange={() => setConfirmPaid(!confirmPaid)}
            disabled={confirmPaid}
          />
          <label>
            I confirm payment of{" "}
            <strong>{formatCurrency(newTotalPrice, currency)}</strong> has been
            made.
          </label>
        </CheckboxContainer>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPaid || isUpdating}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
