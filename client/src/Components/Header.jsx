import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { authUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-[#1E4B6D] font-sans flex items-center">
        <img src="/logo.png" alt="RecipeCircle" className="w-20 h-20 mr-2" />
      </Link>

      <div className="flex items-center gap-4">
        {!authUser ? (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="px-2 py-1 text-[#1E4B6D] hover:text-[#0f334e] font-medium"
            >
              Login
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              to="/signup"
              className="px-2 py-1 text-[#1E4B6D] hover:text-[#0f334e] font-medium"
            >
              Register
            </Link>
          </div>
        ) : (
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 focus:outline-none"
          >
            <img
              src={authUser.avatar_url || "/avatar.png"}
              alt="avatar"
              className="w-10 h-10 rounded-full border"
            />
            <span className="font-medium">{authUser.name}</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
