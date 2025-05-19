import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, MenuIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import useNotificationCount from "../hooks/useNotificationCount";

const Navbar = ({ onMobileMenuClick }) => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { incomingCount } = useNotificationCount();
  const { logoutMutation } = useLogout();

  const shouldShake = incomingCount > 0;

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      
      {/* Hide hamburger on chat pages */}
      {!isChatPage && (
        <div className="lg:hidden">
          <button
            className="btn btn-ghost btn-circle"
            onClick={onMobileMenuClick}
          >
            <MenuIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      )}

      <div className="container sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
         
        
          {isChatPage && (
            <div>
              <Link to="/" className="flex items-center gap-2.5">
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                  Chattrix
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to="/notifications">
              <button className="btn btn-ghost btn-circle relative">
                <BellIcon
                  className={`h-6 w-6 text-base-content opacity-70 ${
                    shouldShake ? "animate-bounce" : ""
                  }`}
                />
                {shouldShake && (
                  <span className="absolute -top-1 left-7 bg-red-500 text-white text-xs rounded-full px-1.5">
                    {incomingCount}
                  </span>
                )}
              </button>
            </Link>
          </div>

          <ThemeSelector />

          <div className="avatar">
            <div className="w-9 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>

          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
