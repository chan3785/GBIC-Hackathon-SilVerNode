import { useNavigate } from "react-router-dom";

export default function SignUpSuccess() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/");
  }

  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-center items-center bg-white text-black">
      <span className="text-3xl mb-6 font-bold">Successfully Signed up!</span>
      <button 
        onClick={handleClick}
        className="bg-blue-400 text-white w-1/3 h-10 rounded-full mt-5 text-base px-8 py-3 cursor-pointer hover:bg-blue-500"
      >
        Return to Homepage
      </button>
    </div>
  );
}
