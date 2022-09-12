import React from "react";
import { useAuth0, User } from "@auth0/auth0-react";
import { Bookings } from "./Booking";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useEffect } from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { accountEmail } = useContext(UserContext);
  // useEffect(() => {
  //   fetch(`/api/bookings/${user.email}`, {
  //     method: "GET",
  //     header: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        {user.email ? <Bookings /> : "Loading"}
      </div>
    )
  );
};

export default Profile;
