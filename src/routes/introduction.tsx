import "../index.css"

export default function Introduction() {
  return (
    <div className="font-sans w-full h-full bg-white text-black flex flex-col">
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
      </div>
      <div className="flex-grow flex items-center justify-center p-10">
        <div className="text-center">
          <p>
            DAO college는 혁신적인 교육 방식으로 블록체인 기술의 잠재력을 최대화하기 위한 플랫폼입니다.
          </p>
          <p className="mt-4">
            인하대학교의 블록체인 학회 블루노드에서 시작되어, 글로벌 네트워크를 형성하며 세계적인 인정을 받고 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
