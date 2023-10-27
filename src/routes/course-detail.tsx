import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type CourseDetailProps = {
    id: number;
    title: string;
    professor: string;
    description: string;
};

const CourseDetail: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const [course, setCourse] = useState<CourseDetailProps | null>(null);

    useEffect(() => {
        // 여기서는 임시적으로 하드코딩된 데이터를 사용하였습니다.
        // 실제로는 API 호출을 통해 데이터를 가져오도록 구현해야 합니다.
        const fetchedCourse: CourseDetailProps = {
            id: parseInt(courseId),
            title: 'React Advanced',
            professor: 'Prof. John Doe',
            description: 'This course dives deep into the advanced topics of React including hooks, context, and more.',
        };

        setCourse(fetchedCourse);
    }, [courseId]);

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{course.title}</h1>
            <h2>By {course.professor}</h2>
            <p>{course.description}</p>
        </div>
    );
};

export default CourseDetail;
