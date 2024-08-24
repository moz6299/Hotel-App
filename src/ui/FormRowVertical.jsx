import styled from "styled-components";

// تنسيق المكون
const StyledFormRowVertical = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem; /* المسافة بين العناصر */
  margin-bottom: 1.6rem; /* المسافة بين الصفوف */

  & label {
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--color-grey-800);
  }

  & input {
    font-size: 1.6rem;
    padding: 0.8rem;
    border: 1px solid var(--color-grey-300);
    border-radius: 0.4rem;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: var(--color-primary);
    }
  }
`;

// مكون FormRowVertical
function FormRowVertical({ label, children }) {
  return (
    <StyledFormRowVertical>
      {label && <label htmlFor={label}>{label}</label>}
      {children}
    </StyledFormRowVertical>
  );
}

export default FormRowVertical;
