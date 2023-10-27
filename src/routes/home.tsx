import styled from "styled-components";
import { auth } from "../firebase";
import { Title } from "../components/auth-components";
import { useNavigate } from "react-router-dom";

export const Button = styled.button`
  display: flex;
  justify-content: flex-start;
  padding: 20px 20px;
  background-color: purple;
`;  

export const Container = styled.div`
  font-family: Arial, sans-serif;
  width: 100%;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;  // 세로축 시작점(위쪽)에 정렬
  justify-content: flex-start;  // 가로축 시작점(왼쪽)에 정렬
  padding: 20px;
  background-color: black;
  flex-direction: row;  
`;
export const SvgWrapper = styled.svg`
  width: 50px;
  height: 50px;
`;
const MainSlider = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 60px;
`;

const SliderImage = styled.div`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: blue;
`;

const KMOOCIntro = styled.div`
  padding: 40px;
  background-color: #eef2f7;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SidebarLink = styled.a`
  padding: 10px;
  text-decoration: none;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e0e0e0;
  }
`;


export default function Home() {
  const navigate = useNavigate();
  const onClicked = (address: string) => {
    navigate(address);
  }
  const logOut = () => {
    auth.signOut();
  };
  return (
    <Container>
      <Header><SvgWrapper fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"></path>
</SvgWrapper><Title>DAO college</Title>
<button onClick={logOut}>Log Out</button>
</Header>
      <MainSlider>
        <SliderImage>
          <Button onClick={()=>onClicked("/introduction")}>DAO college 소개</Button>
        </SliderImage> 
          <Button onClick={()=>onClicked("/")}>egg state</Button>
          <Button onClick={()=>onClicked("/governance-vote")}>거버넌스 투표 참여</Button>
          <Button onClick={()=>onClicked("/profile")}>마이 페이지</Button>
      </MainSlider>
    </Container>
  );
}