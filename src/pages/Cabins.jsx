import { useQuery } from "@tanstack/react-query";
import Spinner from "./../ui/Spinner";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import AddCabin from "../features/cabins/AddCabin";
import Filter from "../ui/Filter";
import CabinTable from "../features/cabins/CabinTable";
import { getCabins } from "../services/apiCabins";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SortBy from "../ui/SortBy";
import styled from "styled-components";


const StyledDiv = styled.div`
  display:flex;
  justify-content: space-between;
  gap:4rem;
  align-items: center;
`

function Cabins() {
  const { isLoading, data } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  if (isLoading) return <Spinner />;

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Discount", value: "with-discount" },
    { label: "No Discount", value: "no-discount" },
  ];

  const sortOptions = [
    { label: "Sort By Name (A-Z)", value: "name-asc" },
    { label: "Sort By Name (Z-A)", value: "name-desc" },
    { label: "Sort By Price (Low First)", value: "price-asc" },
    { label: "Sort By Price (High First)", value: "price-desc" },
    { label: "Sort By Capacity (Low First)", value: "capacity-asc" },
    { label: "Sort By Capacity (High First)", value: "capacity-desc" },
  ];

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <StyledDiv>
          <Filter options={filterOptions} paramName="discount" />
          <SortBy options={sortOptions} type="white" />
        </StyledDiv>
      </Row>

      <Row>
        <CabinTable cabins={data} />
      </Row>

      <AddCabin />
    </>
  );
}

export default Cabins;
