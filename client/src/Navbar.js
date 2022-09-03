import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Login } from "./Login";

const Navbar = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { logout } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  let history = useHistory();
  const checkLogin = () => {
    history.push("/login");
  };

  const HomeBtn = () => {
    history.push("/");
  };
  //navlink styling
  // const styledLinks = {
  //   marginRight: "5px",
  //   textDecoration: "none",
  //   color: "black"
  // };
  return (
    <Wrapper>
      <NavBarContainter>
        <NavLink
          style={{ marginRight: "5px", textDecoration: "none", color: "white" }}
          strict
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          style={{ marginRight: "5px", textDecoration: "none", color: "white" }}
          exact
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          style={{ marginRight: "5px", textDecoration: "none", color: "white" }}
          exact
          to="/calender"
        >
          Calender
        </NavLink>
        {isAuthenticated ? (
          <NavLink
            to="/profile"
            style={{
              marginRight: "5px",
              textDecoration: "none",
              color: "white",
            }}
          >
            <span>Profile</span>
          </NavLink>
        ) : null}
        {!isAuthenticated ? (
          <LoginLogout>
            {" "}
            <Login />
          </LoginLogout>
        ) : null}
        {isAuthenticated ? (
          <LoginLogout
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Logout
          </LoginLogout>
        ) : null}
      </NavBarContainter>
      <H1> Sared Drapes</H1>
    </Wrapper>
  );
};
export default Navbar;

const Wrapper = styled.nav`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
  height: 40px;
  align-self: center;
  padding-right: 80px;
  padding-top: 10px;
`;

const LoginLogout = styled.span`
  :hover {
    cursor: pointer;
  }
`;

const NavBarContainter = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  color: white;
`;

const H1 = styled.h1`
  font-family: "Playball", cursive;
  font-size: 30px;
  position: absolute;
  left: 10px;
  top: -20px;
`;
