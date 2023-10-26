import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.span`
  font-size: 24px;
`;
  
  const Button = styled.button`
  margin-top:20px;
    background-color: green; /* Green */
    color: 'white';
    width: 70%;
    height: 30px;
    border-radius:20px;
    padding: '15px 32px';
    display: 'inline-block';
    font-size: '16px';
    margin: '4px 2px';
    cursor: 'pointer';
  `;

export default function SignUpSuccess() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  }
  return (
    <Wrapper>
    <Text>Successfully Signed up!</Text>
    <Button onClick={handleClick}>
      Return to Homepage
    </Button>
    </Wrapper>
  );
}