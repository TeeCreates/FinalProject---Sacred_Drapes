import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import styled from "styled-components";
import { useEffect } from "react";

export const Form = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { selectedDate } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (event) => {
    console.log(selectedDate);
    event.preventDefault();
    if (!firstName || !lastName || !service) {
      setMessage("Please fill the required fields");
    } else if (!selectedDate) {
      setMessage("Select the booking date");
    } else {
      fetch("/api/add-booking", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          month: selectedDate.split(" ")[0],
          day: selectedDate.split(" ")[1],
          year: selectedDate.split(" ")[2],
          email: user.email,
          month: selectedDate.split(" ")[1],
          services: service,
          date: selectedDate,
          confirm: false,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          console.log(response);
        });
    }
  };

  useEffect(() => {
    console.log(service);
  }, [service]);

  /// form validation
  console.log("field test", firstName, lastName, service);

  return (
    <>
      {!isAuthenticated ? (
        <span>Please login to book the service</span>
      ) : (
        <Wrapper>
          <FormContainer>
            {selectedDate ? (
              <p>
                {" "}
                Date Selected:
                {selectedDate}
              </p>
            ) : (
              <p>Click on the date you wish to book the service</p>
            )}
            <label>
              {" "}
              Firstname:
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </label>
            <label>
              {" "}
              Lastname:
              <input
                type="text"
                placeholder="lastname"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </label>

            <div>
              <select onChange={(e) => setService(e.target.value)}>
                <option value="0">Select Service</option>
                <option value="Draping">Draping</option>
                <option value="Tassles">Tassles</option>
                <option value="Drapping + Tassles">Drapping + Tassles</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <label>
              {" "}
              <AdditionalDetailsBox
                type="text"
                placeholder="additional details"
                onChange={(e) => setAdditionalDetails(e.target.value)}
                value={additionalDetails}
              />
            </label>
            <button onClick={submitHandler}>Confirm Booking</button>
            {message ? <Message>{message}</Message> : null}
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

const Message = styled.span`
  color: red;
`;

const AdditionalDetailsBox = styled.input`
  height: 30px;
  width: 100%;
`;
