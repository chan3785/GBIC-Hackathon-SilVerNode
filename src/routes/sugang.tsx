import { useNavigate } from "react-router-dom";
import "../index.css"
import { useState, useEffect } from 'react';

export default function Sugang() {
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부
  const [inputValue, setInputValue] = useState(0); // 사용자가 입력한 값 (2번)
  const [totalValue, setTotalValue] = useState(0); // 합계 값 (3번)

  const fixedValue = 1; // 1번 고정값

  // inputValue가 변경될 때마다 totalValue를 업데이트
  useEffect(() => {
      setTotalValue(fixedValue + Number(inputValue));
  }, [inputValue]);

    const navigate = useNavigate();
    const onClicked = (address: string) => {
        navigate(address);
      }
    return (
      <div className="font-sans w-full h-full bg-white text-black mx-auto px-4">
      <div className="flex items-start justify-start p-5 bg-white border-b">
      <svg 
          className="w-12 h-12 fill-current text-white"
          fill="none" 
          stroke="black" 
          strokeWidth="1.5" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg" 
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"></path>
        </svg>
        <div className="ml-4 text-3xl font-bold">DAO college</div>
                <h1 className="text-xl ml-4">수강신청</h1>
            </div>
            <div className="flex flex-col items-center mt-5">
                <div className="bg-gray-200 p-4 rounded w-7/12 mb-4 relative shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg text-blue-500 cursor-pointer" onClick={() => onClicked("/course-detail")}>블록체인 개론</h2>
                        <span className="text-sm text-gray-500 ml-4">강의자: 이한길</span>
                    </div>
                    <p className="text-sm mb-4">블록체인 개론 강의에서 블록체인의 기본 원리부터 현대 산업에 미치는 영향까지 짚어보며, 미래 디지털 경제의 핵심에 대해 학습한다.</p>
                    <button 
    className="bg-green-500 text-white py-2 px-4 rounded absolute bottom-4 right-5 hover:bg-green-600 transition duration-300"
    onClick={() => {
        setInputValue(0); // 추가 수업료 초기화
        setShowModal(true);
    }}
>
    신청하기
</button>
                </div>
                {/* 추가적인 강의 항목들을 이곳에 추가하면 됩니다. */}
            </div>
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="mb-4">
    <label className="block mb-2">기본 수업료:</label>
    <div className="flex items-center">
        <input type="text" readOnly value={fixedValue} className="border rounded p-2 w-full"/>
        <span className="ml-2">토큰(token)</span>
    </div>
</div>
<div className="mb-4">
    <label className="block mb-2">추가 수업료:</label>
    <div className="flex items-center">
        <input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="border rounded p-2 w-full"/>
        <span className="ml-2">토큰(token)</span>
    </div>
</div>
<div className="mb-4">
    <label className="block mb-2">총 수업료:</label>
    <div className="flex items-center">
        <input type="text" readOnly value={totalValue} className="border rounded p-2 w-full"/>
        <span className="ml-2">토큰(token)</span>
    </div>
</div>
<button 
    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
    onClick={() => {
        // 알림 표시
        window.alert("신청 되었습니다!");
        // 모달 창 닫기
        setShowModal(false);
    }}
>
    신청하기
                  </button>
                        <button className="ml-2 text-gray-500" onClick={() => setShowModal(false)}>닫기</button>
                  </div>
              </div>
            )}
        </div>
    );
}