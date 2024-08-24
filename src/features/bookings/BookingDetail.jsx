import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useUpdateBooking } from "./useUpdateBooking";
import { useDeleteBooking } from "./useDeleteBooking";
import { useState } from "react";
import Modal from "./../../ui/Modal2";
import ConfirmDelete from "./../../ui/ConfirmDelete2";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { data: booking, isLoading } = useBooking();
  const { updatingBooking, isUpdating } = useUpdateBooking();
  const { isDeleting, deletingBooking } = useDeleteBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const [modalName, setModalName] = useState("");

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName = " Booking" />

  const { id: bookingId, status } = booking;

  const handleCheckout = () => {
    if (bookingId)
      updatingBooking({
        bookingId,
        updates: { status: "checked-out" },
        shouldNavigate: false,
      });
  };

  const handleDeleteBooking = () => {
    if (bookingId) {
      deletingBooking(bookingId);
      setModalName(""); // Close the modal after deletion
    }
  };

  

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <h1>Booking #{bookingId}</h1>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        <Modal>
          <Modal.Open name="openDelete">
            <Button
              variation="danger"
              onClick={() => setModalName("openDelete")}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Booking"}
            </Button>
          </Modal.Open>
          <Modal.Window name="openDelete">
            <ConfirmDelete
              resourceName="Booking"
              onConfirm={handleDeleteBooking}
              disabled={isDeleting}
              onCloseModal={() => setModalName("")} 
              confirmText="Delete"
              cancelText="Cancel"
            />
          </Modal.Window>
        </Modal>
        {status === "unconfirmed" && (
          <Button
            variation="primary"
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button variation="primary" onClick={handleCheckout}>
            Check out
          </Button>
        )}
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
