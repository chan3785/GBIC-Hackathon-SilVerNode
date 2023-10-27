import { useNavigate } from "react-router-dom";
import { Title } from "../components/auth-components";
import { Container, Header, SvgWrapper } from "./home";
import styled from 'styled-components';

const CourseList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const CourseItem = styled.div`
  background-color: #f5f5f5;
  padding: 15px 20px;
  border-radius: 5px;
  width: 70%;  // 카드의 너비
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative; // 추가
  
  h2 {
    margin: 0;
    font-size: 18px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
    font-size: 14px;
  }
`;
const CourseTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CourseTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  flex: 1;
  cursor: pointer; // 클릭 가능하게 보이도록 커서 스타일 변경
  color: blue; // 클릭 가능하게 보이도록 색상 변경
`;

const ProfessorName = styled.span`
  font-size: 14px;
  color: #888;
  margin-left: 10px;
`;

const ApplyButton = styled.button`
  padding: 8px 15px;
  background-color: #4CAF50; // 초록색 배경
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
  position: absolute; // 추가
  right: 20px; // 추가: 오른쪽 패딩만큼의 거리
  bottom: 15px; // 추가: 아래쪽 패딩만큼의 거리

  &:hover {
    background-color: #45a049; // 호버 시 색상 변경
    margin-top: 30px;
  } 
`;
export default function Sugang() {
    
    const navigate = useNavigate();
    const onClicked = (address: string) => {
        navigate(address);
      }
    return (
        <Container>
           <Header><SvgWrapper fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"></path>
    </SvgWrapper><Title>DAO college</Title><h1>수강신청</h1>
    </Header>
            <CourseList>
                <CourseItem>
                <CourseTitleWrapper>
                        <CourseTitle onClick={() =>onClicked("/course-detail")}>강의 제목 예시</CourseTitle>
                        <ProfessorName>교수자 이름</ProfessorName>
                    </CourseTitleWrapper>
                    <p>이곳에 강의에 대한 간단한 설명을 작성하세요.</p>
                    <ApplyButton>신청하기</ApplyButton>
                </CourseItem>
                {/* 추가적인 강의 항목들을 이곳에 추가하면 됩니다. */}
            </CourseList>
        </Container>
    );
}