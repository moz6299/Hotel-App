import styled from 'styled-components';
import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

const Container = styled.div`
  margin-bottom: 5rem; 
`;

const SignupContainer = styled.div`
  margin-top: 5rem; 
  padding-top:5rem
`;

function Users() {
  return (
    <Container>
      <Heading as="h1">Create a new user</Heading>
      <SignupContainer>
        <SignupForm />
      </SignupContainer>
    </Container>
  );
}

export default Users;
