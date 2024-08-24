import React, { useState } from "react";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import styled from "styled-components";
import CabinTable from "./CabinTable";

const StyledDiv = styled.div`
  margin-top: 2rem;
`;

const AddCabin = () => {
  return (
    <>
      <StyledDiv>
        <Modal>
          <Modal.Open name="addCabin">
            <Button>Add new Cabin</Button>
          </Modal.Open>
          <Modal.Window name="addCabin">
            <CreateCabinForm />
          </Modal.Window>
        </Modal>
      </StyledDiv>
    </>
  );
};

/*const AddCabin = () => {
  const [addClicked, setAddClicked] = useState(false);
  return (
    <div>
      <StyledDiv>
        <Button
          onClick={() => setAddClicked((prev) => !prev)}
          size="large"
          variation="primary"
        >
          Add a Cabin
        </Button>
      </StyledDiv>

      <Row>
        {addClicked && (
          <Modal onClose={()=> setAddClicked(prev=>!prev)}>
            <CreateCabinForm onClose={()=> setAddClicked(prev=>!prev)} />
          </Modal>
        )}
      </Row>
    </div>
  );
};*/

export default AddCabin;
