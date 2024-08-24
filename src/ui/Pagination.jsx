import React from "react";
import { useSearchParams } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import styled from "styled-components";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top:2rem;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? "var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? "var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const Pagination = ({ totalItems, itemsPerPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  const handlePageChange = (newPage) => {
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  };

  return (
    <StyledPagination>
      <P>
        Showing <span>{startItem}</span> to <span>{endItem}</span> of{" "}
        <span>{totalItems}</span> results
      </P>
      <Buttons>
        <PaginationButton
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <PaginationButton
            key={pageNum}
            active={pageNum === page}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </PaginationButton>
        ))}

        <PaginationButton
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
};

export default Pagination;
