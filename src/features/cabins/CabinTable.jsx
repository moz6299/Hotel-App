import React from "react";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

const CabinTable = ({ cabins }) => {
  const [searchParams] = useSearchParams();

  //1-Filter
  const filteredValue = searchParams.get("discount") || "all";

  let filteredCabins;

  if (filteredValue === "all") filteredCabins = cabins;
  if (filteredValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  if (filteredValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  //2-Sort
  const sortedValue = searchParams.get("sort") || "";

  let sortedCabins = filteredCabins;

  switch (sortedValue) {
    case "name-asc":
      sortedCabins = [...filteredCabins].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;
    case "name-desc":
      sortedCabins = [...filteredCabins].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      break;
    case "price-asc":
      sortedCabins = [...filteredCabins].sort(
        (a, b) => a.regularPrice - b.regularPrice
      );
      break;
    case "price-desc":
      sortedCabins = [...filteredCabins].sort(
        (a, b) => b.regularPrice - a.regularPrice
      );
      break;
    case "capacity-asc":
      sortedCabins = [...filteredCabins].sort(
        (a, b) => a.maxCapacity - b.maxCapacity
      );
      break;
    case "capacity-desc":
      sortedCabins = [...filteredCabins].sort(
        (a, b) => b.maxCapacity - a.maxCapacity
      );
      break;
    default:
      // No sorting if the value is empty or invalid
      sortedCabins = filteredCabins;
  }

  if (!cabins.length) return <Empty resourceName="Cabins" />

  return (
    <Table>
      <Table.Header columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Cell></Table.Cell>
        <Table.Cell>Cabin</Table.Cell>
        <Table.Cell>Capacity</Table.Cell>
        <Table.Cell>Price</Table.Cell>
        <Table.Cell>Discount</Table.Cell>
        <Table.Cell></Table.Cell>
      </Table.Header>
      {sortedCabins?.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
};

export default CabinTable;
