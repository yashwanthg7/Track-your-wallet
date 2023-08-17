import React from "react";
import styled from "styled-components";
import Image from "../Image.png"

const NotLoggedInPage = () => {
  return (
    <Container>
      <MessageContainer>
        <Message>
          Welcome to our application! To access our features and services,
          kindly proceed with either registering for a new account or logging in
          if you are an existing user.
        </Message>
      </MessageContainer>
      <ImageContainer>
        {/* Add your cool image or animation here */}
        <img
          src={Image}
          alt="Image"
        />
      </ImageContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ImageContainer = styled.div`
  margin-bottom: 20px;
`;

const MessageContainer = styled.div`
  text-align: center;
  padding: 5px 150px;
`;

const Message = styled.p`
  font-size: 25px;
  font-weight: 400;
`;

export default NotLoggedInPage;
