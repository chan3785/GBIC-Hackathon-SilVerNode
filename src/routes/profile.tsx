import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth } from '../firebase';

type Course = {
    id: number;
    title: string;
    description: string;
};

type User = {
    name: string;
    email: string;
    courses: Course[];
};

const initialUser: User = {
    name: "홍길동",
    email:"hong@naver.com",
    courses: [
        { id: 1, title: "React 기초", description: "React 기본 개념과 사용법에 대한 강좌입니다." },
        { id: 2, title: "TypeScript 심화", description: "TypeScript의 고급 기능과 활용 방법에 대해 배웁니다." },
    ]
};

const Container = styled.div`
    padding: 20px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100%;
    color: #000000;
`;

const ContentWrapper = styled.div`
    display: flex;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const ProfileContainer = styled.div`
    flex: 1;
    border-right: 1px solid #e0e0e0;
    padding-right: 20px;
`;

const CourseList = styled.ul`
    flex: 2;
    list-style: none;
    padding: 0 20px;
`;

const CourseItem = styled.li`
    margin-bottom: 10px;
    padding: 10px;
    background-color: #e6e6e6;
    border-radius: 3px;
`;

const UserProfile: React.FC = () => {
    const [user, setUser] = useState(initialUser);
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
              setUser({
                  name: user.displayName || "Anonymous",
                  email: user.email || "Anonymous",
                  courses: [
                      { id: 1, title: "React 기초", description: "React 기본 개념과 사용법에 대한 강좌입니다." },
                      { id: 2, title: "TypeScript 심화", description: "TypeScript의 고급 기능과 활용 방법에 대해 배웁니다." },
                  ],
              });
          } else {
              // 사용자가 로그아웃된 경우나 로그인하지 않은 경우의 처리를 여기에 작성
          }
      });
  
      return () => {
          // 컴포넌트가 언마운트될 때 구독 해제
          unsubscribe();
      };
  }, []);
    return (
        <Container>
            <ContentWrapper>
                <ProfileContainer>
                    <h1>프로필</h1>
                    <p><strong>이름:</strong> {user.name}</p>
                    <p><strong>이메일:</strong> {user.email}</p>
                </ProfileContainer>
                
                <CourseList>
                    <h2>내 강좌 목록</h2>
                    {user.courses.map(course => (
                        <CourseItem key={course.id}>
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                        </CourseItem>
                    ))}
                </CourseList>
            </ContentWrapper>
        </Container>
    );
};

export default UserProfile;
