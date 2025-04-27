import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaUserCircle, FaCalendarCheck, FaSearch, FaClipboardList, FaHistory, FaUserEdit } from "react-icons/fa";
import { Moon, Sun } from "lucide-react";

const Sidebar = () => {
  const { role, user } = useSelector((state) => state.auth);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`
        fixed z-50 
        md:relative 
        ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800 border-t-2 md:border-t-0 md:border-r-2"} 
        w-full bottom-0 md:top-0 md:left-0 
        md:w-72 
        flex md:flex-col items-center md:items-start 
        justify-between md:justify-start 
        p-2 md:p-6 
        shadow-xl 
        md:rounded-r-lg 
        transition-all duration-300
      `}
    >
      {/* Greeting + Dark Mode Toggle (Only on Desktop) */}
      <div className="hidden md:flex justify-between items-center w-full mb-6">
        {role && user?.name && (
          <span className="flex items-center p-2 rounded-lg bg-gray-700 px-3 text-white gap-2 text-md font-semibold">
            <img alt="hi" width={30} height={30} src="https://raw.githubusercontent.com/mitul3737/mitul3737/refs/heads/main/Wave.gif" />
            Hello, {user.name}
          </span>
        )}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300"
        >
          {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-300" />}
        </button>
      </div>

      {/* Navigation Links */}
      <ul className="flex md:flex-col justify-around w-full md:space-y-4">
        {role === "patient" && (
          <>
            <SidebarLink to="/patient-dashboard" icon={<FaCalendarCheck />} label="Dashboard" darkMode={darkMode} />
            <SidebarLink to="/my-appointments" icon={<FaClipboardList />} label="My Appointments" darkMode={darkMode} />
            <SidebarLink to="/find-dermatologist" icon={<FaSearch />} label="Find Dermatologist" darkMode={darkMode} />
            <SidebarLink to="/book-appointment" icon={<FaCalendarCheck />} label="Book Appointment" darkMode={darkMode} />
            <SidebarLink to="/detection-history" icon={<FaHistory />} label="Detection History" darkMode={darkMode} />
            <SidebarLink to="/edit-profile" icon={<FaUserEdit />} label="Edit Profile" darkMode={darkMode} />
          </>
        )}

        {role === "doctor" && (
          <>
            <SidebarLink to="/doctor-dashboard" icon={<FaCalendarCheck />} label="Dashboard" darkMode={darkMode} />
            <SidebarLink to="/doctor-edit-profile" icon={<FaUserEdit />} label="Edit Profile" darkMode={darkMode} />
          </>
        )}
      </ul>
    </div>
  );
};

const SidebarLink = ({ to, label, darkMode, icon }) => (
  <li className="w-full">
    <Link
      to={to}
      className={`
        flex items-center justify-center md:justify-start gap-2 py-3 px-5 rounded-lg text-md font-medium
        transition-all duration-300 hover:scale-105
        ${darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-gray-800 hover:bg-gray-200"}
        shadow-md
      `}
    >
      <span className="text-lg">{icon}</span>
      <span className="hidden md:inline">{label}</span>
    </Link>
  </li>
);

export default Sidebar;
