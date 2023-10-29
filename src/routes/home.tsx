
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export const Button = styled.button`
  display: flex;
  justify-content: flex-start;
  padding: 20px 20px;
  background-color: green;
`;  

export const Container = styled.div`
  font-family: Arial, sans-serif;
  width: 100%;
  height: 100%;
  background-color: white;
  color: black;
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;  // 세로축 시작점(위쪽)에 정렬
  justify-content: flex-start;  // 가로축 시작점(왼쪽)에 정렬
  padding: 20px;
  background-color: #c43131;
  flex-direction: row;  
`;
export const SvgWrapper = styled.svg`
  width: 50px;
  height: 50px;
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
    <div className="font-sans w-full h-full bg-white text-black">
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
        <button 
          className="ml-auto px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          onClick={logOut}
        >
          Log Out
        </button>
      </div>
      <div className=" bg-blue-400 flex overflow-hidden h-16 mt-5">
        <div className="w-full h-full bg-cyan-600 flex items-center border-b">
          <button 
            className="flex items-center justify-start px-5 py-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            onClick={() => onClicked("/introduction")}
          >
            DAO college 소개
          </button>
        </div>
        <button 
          className="flex items-center justify-start px-5 py-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          onClick={() => onClicked("/governance-vote")}
        >
          개설 강의 제안
        </button>
        <button 
          className="flex items-center justify-start px-5 py-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          onClick={() => onClicked("/sugang")}
        >
          수강신청
        </button>
        <button 
          className="flex items-center justify-start px-5 py-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          onClick={() => onClicked("/profile")}
        >
          마이 페이지
        </button>
      </div>
    </div>
  );
}