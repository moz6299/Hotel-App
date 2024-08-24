import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

// تنسيق المكون الأساسي
const StyledConfirmDelete = styled.div`
  width: 40rem;
  background-color: var(--color-white);
  border-radius: 0.8rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  & h3 {
    color: var(--color-danger);
    margin-bottom: 1rem;
  }

  & p {
    color: var(--color-grey-600);
    font-size: 1.6rem;
    line-height: 1.5;
    margin-bottom: 1.6rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
`;

// مكون ConfirmDelete المحسن
function ConfirmDelete({
  resourceName = "item",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  disabled = false,
  onCloseModal
}) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This action cannot be undone.
      </p>

      <div>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
