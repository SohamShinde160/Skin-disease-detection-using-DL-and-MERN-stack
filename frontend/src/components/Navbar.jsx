import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { patientLogout, doctorLogout } from "../services/authService";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const { role, user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      if (role === "patient") {
        await patientLogout();
      } else if (role === "doctor") {
        await doctorLogout();
      }
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
<div >
<nav className="p-3 md:p-4 text-white rounded-xl flex justify-between items-center duration-300 bg-blue-600 shadow-lg">
      <h1 className="text-lg md:text-xl font-bold drop-shadow-md text-center md:text-left">
        Detect your Skin Disease using AI Dermatologist
              </h1>
      <div className="flex items-center gap-4">
        {role && (
           <button
           onClick={handleLogout}
           className="bg-red-500 hidden md:block font-semibold px-4 py-2 rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
         >
           Logout
         </button>
        )}
      </div>
        </nav>  

      <div className="flex md:hidden justify-between items-center  mb-2">
        {role && user?.name && (
          <span className="flex items-center justify-between p-2 rounded-lg mt-3 w-full bg-gray-700 px-3 text-white text-md font-semibold">
            <div className="flex items-center">
            <img alt="hi" width={30} height={30} src="https://raw.githubusercontent.com/mitul3737/mitul3737/refs/heads/main/Wave.gif" />
            Hello, {user.name}
            </div>
            <button
            onClick={handleLogout}
            className="bg-red-500 block md:hidden font-semibold px-4 py-1 rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
          >
            Logout
          </button>
          </span>
          
        )}
      </div>
</div>
  );
};

export default Navbar;
