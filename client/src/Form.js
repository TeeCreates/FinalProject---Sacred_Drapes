import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import styled from "styled-components";

export const Form = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { selectedDate } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState();
  const [additionalDetails, setAdditionalDetails] = useState();

  const submitHandler = () => {};
  return (
    <>
      {!isAuthenticated ? (
        <span>Please login to book the service</span>
      ) : (
        <Wrapper>
          <FormContainer>
            <p>Click on the date you wish to book the service</p>
            <label>
              {" "}
              Date Selected:
              {selectedDate}
            </label>
            <label>
              {" "}
              Firstname
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </label>
            <label>
              {" "}
              Lastname
              <input
                type="text"
                placeholder="lastname"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </label>
            <label>
              {" "}
              email
              <input
                type="text"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </label>
            <label>
              {" "}
              <input
                type="text"
                placeholder="additional details"
                onChange={(e) => setAdditionalDetails(e.target.value)}
                value={additionalDetails}
              />
            </label>
            <button>Confirm Booking</button>
          </FormContainer>
        </Wrapper>
      )}
    </>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  padding: 20px;
  width: 250px;

  position: absolute;
  right: 4px;
  top: 4px;
  background-color: white;
  z-index: 0;
`;

const Wrapper = styled.div`
  background-color: #ffc0cb;
  width: 300px;
  height: 350px;
  position: relative;
`;
