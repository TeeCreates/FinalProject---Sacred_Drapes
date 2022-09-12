import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { DomainBookings } from "./DomainBookings";

export const Bookings = () => {
  const {
    domainBookings,
    setDomainBookings,
    accountEmail,
    userBookings,
    setUserBookings,
  } = useContext(UserContext);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [deleted, setDeleted] = useState(true);

  //get non domain user's bookings
  useEffect(() => {
    const fetchUserBookings = async () => {
      await fetch(`/api/bookings/${accountEmail}`, {
        method: "GET",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setUserBookings(data.data);
        });
    };
    if (deleted) {
      fetchUserBookings();
      setDeleted(false);
    }
  }, [accountEmail, deleted]);

  // console.log(user.email);

  // console.log(userBookings);

  const deleteBooking = async (bookingId, index) => {
    await fetch(`/api/bookings/${bookingId}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log("removed");
        setDeleted(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      {userBookings && user.email !== "thajanah_mk@hotmail.com" ? (
        userBookings.map((booking, index) => {
          console.log(booking.date);
          return (
            <div key={index}>
              <span>{index + 1}</span>
              <span>{booking.date}</span>
              <span>{booking.services}</span>
              <button onClick={() => deleteBooking(booking._id, index)}>
                delete
              </button>
            </div>
          );
        })
      ) : (
        <DomainBookings />
      )}
    </div>
  );
};
