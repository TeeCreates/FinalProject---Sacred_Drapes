import { useState } from "react";
import { createContext } from "react";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [selectedDate, setSeletectedDate] = useState("");
  const [domainBookings, setDomainBookings] = useState("");
  const [userBookings, setUserBookings] = useState("");
  const [accountEmail, setAccountEmail] = useState("");

  /// fetch all booking to display unavailable dates

  return (
    <UserContext.Provider
      value={{
        selectedDate,
        setSeletectedDate,
        domainBookings,
        setDomainBookings,
        userBookings,
        setUserBookings,
        accountEmail,
        setAccountEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
