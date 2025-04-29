import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { adminLogout } from "../services/authService";
import { FiUsers, FiUserPlus, FiImage, FiLogOut, FiHome } from "react-icons/fi";
import { useState, useEffect } from "react";

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await adminLogout();
      dispatch(logout());
      navigate("/admin-login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 text-gray-800 border-t-2 border-gray-200 z-50">
        <div className="flex justify-around items-center p-2">
          <MobileNavItem 
            href="/admin-dashboard" 
            icon={<FiHome className="text-xl" />} 
            label="Dashboard" 
          />
          <MobileNavItem 
            href="/admin-patients" 
            icon={<FiUsers className="text-xl" />} 
            label="Patients" 
          />
          <MobileNavItem 
            href="/admin-doctors" 
            icon={<FiUserPlus className="text-xl" />} 
            label="Doctors" 
          />
          <MobileNavItem 
            href="/admin-detection-history" 
            icon={<FiImage className="text-xl" />} 
            label="History" 
          />
          <button
            onClick={handleLogout}
            className="flex flex-col items-center p-2 text-xs hover:text-blue-600 transition-colors"
          >
            <FiLogOut className="text-xl" />
            <span className="mt-1">Logout</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 text-gray-800 w-64 min-h-screen p-4 border-r-2 border-gray-200">
      <div className="flex items-center justify-center mb-8 pt-4">
      <span className="flex items-center p-2 rounded-lg bg-gray-700 px-3 text-white gap-2 text-md font-semibold">
            <img alt="hi" width={30} height={30} src="https://raw.githubusercontent.com/mitul3737/mitul3737/refs/heads/main/Wave.gif" />
            Hello, Admin Soham 
          </span>
      </div>
      
      <nav>
        <ul className="space-y-5 font-semibold">
          <NavItem 
            href="/admin-dashboard" 
            icon={<FiHome className="mr-3"  />} 
            label="Dashboard" 
          />
          <NavItem 
            href="/admin-patients" 
            icon={<FiUsers className="mr-3" />} 
            label="Patients" 
          />
          <NavItem 
            href="/admin-doctors" 
            icon={<FiUserPlus className="mr-3" />} 
            label="Doctors" 
          />
          <NavItem 
            href="/admin-detection-history" 
            icon={<FiImage className="mr-3" />} 
            label="Detection History" 
          />
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 shadow-md rounded-lg bg-white hover:bg-gray-200 transition-colors text-left"
            >
              <FiLogOut className="mr-3" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const NavItem = ({ href, icon, label }) => (
  <li>
    <a
      href={href}
      className="flex items-center p-3 shadow-md rounded-lg bg-white hover:bg-gray-200 transition-colors"
    >
      {icon}
      {label}
    </a>
  </li>
);

const MobileNavItem = ({ href, icon, label }) => (
  <a
    href={href}
    className="flex flex-col items-center p-2 text-xs hover:text-blue-600 transition-colors"
  >
    {icon}
    <span className="mt-1">{label}</span>
  </a>
);

export default AdminSidebar;