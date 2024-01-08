import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../index.css"

type CourseDetailProps = {
    id: number;
    title: string;
    professor: string;
    description: string;
};

const CourseDetail: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const [course, setCourse] = useState<CourseDetailProps | null>(null);

    const imageURL = 'https://csbl.cne.go.kr/flexer/html/upload/board/SITE_000000000000019/BBSMSTR_000000000082/FILE_000000000103444_3.files/00001.png'; // 1. 이미지 URL을 정의합니다.

    useEffect(() => {
        const fetchedCourse: CourseDetailProps = {
            id: parseInt(courseId),
            title: 'React Advanced',
            professor: 'Prof. John Doe',
            description: 'This course dives deep into the advanced topics of React including hooks, context, and more.',
        };

        setCourse(fetchedCourse);
    }, [courseId]);

    if (!course) {
        return <div className="text-center text-xl mt-10">Loading...</div>;
    }

    return (
        <div className="w-full min-h-screen bg-white shadow-lg rounded-lg">
            <div className="flex justify-center items-center mb-6 w-full min-h-screen bg-white">
            <img src={imageURL} alt="Course Illustration" className="w-3/4 h-auto rounded"/>
        </div>
 {/* 2. 이미지를 렌더링합니다. */}
            <h1 className="text-3xl font-semibold mb-4">{course.title}</h1>
            <h2 className="text-2xl text-gray-600 mb-6">By {course.professor}</h2>
            <p className="text-gray-700">{course.description}</p>
        </div>
    );
};

export default CourseDetail;