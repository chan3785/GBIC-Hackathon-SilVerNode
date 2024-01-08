import { styled } from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: black;
`;

const Text = styled.span`
  font-size: 36px;
  font-weight: bold;
`;

export default function LoadingScreen() {
  return (
    <Wrapper>
      <Text>Loading...</Text>
    </Wrapper>
  );
}