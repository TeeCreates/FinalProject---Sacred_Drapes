// import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { Upload } from "./Upload";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const Home = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("No messages");
  const [images, setImages] = useState("");
  const { accountEmail, setAccountEmail } = useContext(UserContext);
  // let history = useHistory();
  // const checkLogin = () => {
  //   history.push("/login");
  // };

  useEffect(() => {
    setAccountEmail(user?.email);
  }, [accountEmail]);

  useEffect(() => {
    const getProtectedMsg = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        // console.log("token,", accessToken);
        fetch("/fetch-message", {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }).then((res) => {
          if (res.status === 200) {
            return res.json().then((data) => setMessage(data.message));
          } else {
            setError(res.statusText);
          }
        });
      }
    };
    getProtectedMsg();
  });

  // get images

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/images");
      const { data } = await res.json();
      // console.log(data);
      setImages(data);
    };
    fetchImages();
  }, []);
  // console.log(images);
  return (
    <div>
      {images
        ? images.map((image, index) => {
            return <Img src={image.image} key={index}></Img>;
          })
        : null}
    </div>
  );
};
export default Home;

const Img = styled.img`
  height: 300px;
  width: 252px;
`;

const H1 = styled.h1`
  font-family: "Playball", cursive;
`;
