import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "./UserContext";

export const Bookings = () => {
  const { user } = useAuth0();

  const { domainBookings, setDomainBookings, userBookings, setUserBookings } =
    useContext(UserContext);

  useEffect(() => {
    if (user.email === "thajanah_mk@hotmail.com") {
      const fetchAllBookings = async () => {
        const getBookings = fetch("/api/bookings");
        const { data } = await getBookings.json();
        console.log(data);
      };
      fetchAllBookings();
    }
  }, []);

  return (
    <div>
      {user.email === "thajanah_mk@hotmail.com" ? (
        <p>View all bookings</p>
      ) : null}
    </div>
  );
};
