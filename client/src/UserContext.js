import { useState } from "react";
import { createContext } from "react";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [selectedDate, setSeletectedDate] = useState("");
  const [domainBookings, setDomainBookings] = useState("");
  const [userBookings, setUserBookings] = useState("");

  return (
    <UserContext.Provider
      value={{
        selectedDate,
        setSeletectedDate,
        domainBookings,
        setDomainBookings,
        userBookings,
        setUserBookings,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
