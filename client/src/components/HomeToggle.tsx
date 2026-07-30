import { useNavigate } from "react-router-dom";

function HomeToggle() {
  const navigate = useNavigate();

  return (
    <div className="absolute top-4 left-4">
      <button
        type="button"
        onClick={() => navigate("/Landing")}
        className={`
          flex
          items-center
          justify-center
          w-8
          h-8
          rounded-full
          border
          backdrop-blur-md
          transition
          duration-300
          text-xl
          cursor cursor-pointer
      
          border-cyan-400/70 bg-white/5 text-gray-300 hover:text-cyan-300 hover:shadow-[0_0_12px_rgba(34,211,238,0.7)]

         

          
        `}
      >
        ⌂
      </button>
    </div>
  );
}
export default HomeToggle;
