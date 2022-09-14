import styled from "styled-components";
import elephants from "./elephants.jpg";

const BottomFooter = () => {
  return (
    <>
      <ImageContainer>
        <Image src={elephants} alt="" />
        <Image src={elephants} alt="" />
      </ImageContainer>
      <Wrapper>
        <p>Booking Policies </p>
        <p>Contact Me : thajanah_mk@hotmail.com</p>
      </Wrapper>
    </>
  );
};

export default BottomFooter;

const Wrapper = styled.div`
  background-color: rgba(238, 174, 202, 1);
  position: relative;

  height: 100px;

  padding: 30px;
`;

const Image = styled.img`
  height: 10%;
  width: 10%;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: -10px;
  margin-top: 50px;
`;
