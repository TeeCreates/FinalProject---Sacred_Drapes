import styled from "styled-components";
import elephants from "./elephants.jpg";

const BottomFooter = () => {
  return (
    <>
      <div
        style={{
          marginTop: "200px",
        }}
      >
        <ImageContainer>
          <Image src={elephants} alt="" />
          <Image src={elephants} alt="" />
        </ImageContainer>
        <Wrapper>
          <span>Contact Me </span>
          <span>thajanah_mk@hotmail.com</span>
        </Wrapper>
      </div>
    </>
  );
};

export default BottomFooter;

const Wrapper = styled.div`
  background-color: rgba(238, 174, 202, 1);
  position: relative;

  display: flex;
  flex-direction: column;
  height: 80px;
  color: black;
  padding: 40px;
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
