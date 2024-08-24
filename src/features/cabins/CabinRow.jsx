import React, { useEffect, useRef, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin, deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateCabinForm from "./CreateCabinForm";
import { HiDuplicate, HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import Table from "../../ui/Table";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";

const DropdownMenu = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;

  /* Dark Mode styles */
  &.dark-mode {
    background: var(--color-grey-100);
    border-color: var(--color-grey-300);
  }
`;

const DropdownContent = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 4px;
  min-width: 160px;
  box-shadow: var(--shadow-md);
  z-index: 1;
  top: 100%;
  left: 0;
  padding: 0.5rem 0;

  /* Dark Mode styles */
  &.dark-mode {
    background-color: var(--color-grey-100);
    border-color: var(--color-grey-300);
    box-shadow: var(--shadow-lg);
  }
`;

const DropdownItem = styled.button`
  background: none;
  border: none;
  width: 100%;
  padding: 0.8rem 1.2rem;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-50);
  }

  /* Dark Mode styles */
  &.dark-mode:hover {
    background-color: var(--color-grey-200);
  }
`;

const CabinRow = ({ cabin }) => {
  const { id, name, maxCapacity, regularPrice, discount, description, image } = cabin;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Successfully deleted");
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: duplicateCabin } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries(["cabins"]);
      toast.success("Successfully added");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDuplicate = () => {
    duplicateCabin({
      name: `Copy Of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  };

  // Click outside dropdown will close it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Table.Row columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Cell>
        <img src={image} alt={name} style={{ width: "6.4rem", transform: "scale(1.5) translateX(-7px)" }} />
      </Table.Cell>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>Fits up to {maxCapacity}</Table.Cell>
      <Table.Cell>{formatCurrency(regularPrice)}</Table.Cell>
      <Table.Cell>{discount === 0 ? "_" : formatCurrency(discount)}</Table.Cell>
      <Table.Cell>
        <DropdownMenu ref={dropdownRef}>
          <DropdownButton 
            className={document.documentElement.classList.contains('dark-mode') ? 'dark-mode' : ''}
            onClick={() => setIsDropdownOpen(prev => !prev)}
          >
            <BsThreeDotsVertical/>
          </DropdownButton>
          <DropdownContent 
            isOpen={isDropdownOpen} 
            className={document.documentElement.classList.contains('dark-mode') ? 'dark-mode' : ''}
          >
            <DropdownItem 
              className={document.documentElement.classList.contains('dark-mode') ? 'dark-mode' : ''}
              onClick={handleDuplicate}
            >
              <HiDuplicate /> Duplicate
            </DropdownItem>
            <Modal>
              <Modal.Open name="openEdit">
                <DropdownItem 
                  className={document.documentElement.classList.contains('dark-mode') ? 'dark-mode' : ''}
                >
                  <HiPencil /> Edit
                </DropdownItem>
              </Modal.Open>
              <Modal.Window name="openEdit">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>
            </Modal>
            <Modal>
              <Modal.Open name="openDelete">
                <DropdownItem 
                  className={document.documentElement.classList.contains('dark-mode') ? 'dark-mode' : ''}
                >
                  <MdDelete /> Delete
                </DropdownItem>
              </Modal.Open>
              <Modal.Window name="openDelete">
                <ConfirmDelete
                  onConfirm={() => mutate(id)}
                  disabled={isDeleting}
                />
              </Modal.Window>
            </Modal>
          </DropdownContent>
        </DropdownMenu>
      </Table.Cell>
    </Table.Row>
  );
};

export default CabinRow;
