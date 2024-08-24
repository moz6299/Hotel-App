import styled from "styled-components";
import React from "react";
/* eslint-disable */


const TableContainer = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: visible;
  margin-top:1.5rem;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: ${({ columns }) => columns};
  column-gap: 2.4rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) => columns};
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const TableCell = styled.div`
  padding: 0.8rem 0;
`;

const Table = ({ children }) => {
  return <TableContainer>{children}</TableContainer>;
};

Table.Header = ({ columns, children }) => {
  return <TableHeader columns={columns}>{children}</TableHeader>;
};

Table.Row = ({ columns, children }) => {
  return <TableRow columns={columns}>{children}</TableRow>;
};

Table.Cell = ({ children }) => {
  return <TableCell>{children}</TableCell>;
};

export default Table;
