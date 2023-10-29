import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import "../index.css"
import { useNavigate } from 'react-router-dom';

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


const UserProfile: React.FC = () => {
    const navigate = useNavigate();
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
             navigate("/login");
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="p-5 bg-white flex justify-center h-screen w-full text-black">
            <div className="flex bg-white p-5 rounded shadow-md w-full">
                <div className="flex-1 border-r pr-5">
                    <h1 className="text-xl font-bold">프로필</h1>
                    <p className="mt-2"><span className="font-semibold">이름:</span> {user.name}</p>
                    <p className="mt-2"><span className="font-semibold">이메일:</span> {user.email}</p>
                </div>
                <ul className="flex-2 pl-5 list-decimal">
                    <h2 className="text-xl font-bold">내 강좌 목록</h2>
                    {user.courses.map(course => (
                        <li key={course.id} className="mb-2 p-2.5 bg-gray-200 rounded">
                            <h3 className="text-lg font-semibold">{course.title}</h3>
                            <p className="mt-1">{course.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserProfile;
