import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import useNotificationCount from "../hooks/useNotificationCount";
import {
  BellIcon,
  HomeIcon,
  UsersIcon,
  X,
} from "lucide-react";
import { faRocketchat } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = ({ mobileSidebarOpen = false, setMobileSidebarOpen = () => {} }) => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;
  const { incomingCount } = useNotificationCount();

  const navItems = [
    {
      to: "/",
      label: "Home",
      icon: <HomeIcon className="size-5 text-base-content opacity-70" />,
    },
    {
      to: "/friends",
      label: "Friends",
      icon: <UsersIcon className="size-5 text-base-content opacity-70" />,
    },
    {
      to: "/notifications",
      label: "Notifications",
      icon: <BellIcon className="size-5 text-base-content opacity-70" />,
      badgeCount: incomingCount,
    },
  ];

  return (
    <>
      <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col min-h-screen sticky top-0">
        <SidebarContent currentPath={currentPath} authUser={authUser} navItems={navItems} />
      </aside>

      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-base-200 border-r border-base-300 flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b border-base-300">
              <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileSidebarOpen(false)}>
                  <FontAwesomeIcon icon={faRocketchat} bounce className="size-9 text-primary" />
                <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wide">
                  Chattrix
                </span>
              </Link>
              <button onClick={() => setMobileSidebarOpen(false)}>
                <X className="w-6 h-6 text-base-content" />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
                    currentPath === item.to ? "btn-active" : ""
                  }`}
                >
                  {item.icon}
                  <span className="relative flex items-center gap-2">
                    {item.label}
                    {item.badgeCount > 0 && (
                      <span className="badge badge-sm badge-error absolute -top-2 -right-5">
                        {item.badgeCount}
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-base-300 mt-auto">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={authUser?.profilePic} alt="User Avatar" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{authUser?.fullName}</p>
                  <p className="text-xs text-success flex items-center gap-1">
                    <span className="size-2 rounded-full bg-success inline-block" />
                    Online
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-black bg-opacity-40" onClick={() => setMobileSidebarOpen(false)} />
        </div>
      )}
    </>
  );
};

const SidebarContent = ({ currentPath, authUser, navItems }) => (
  <>
    <div className="p-5 border-b border-base-300">
      <Link to="/" className="flex items-center gap-2.5">
        <FontAwesomeIcon icon={faRocketchat} bounce className="size-9 text-primary" />
        <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
          Chattrix
        </span>
      </Link>
    </div>

    <nav className="flex-1 p-4 space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === item.to ? "btn-active" : ""
          }`}
        >
          {item.icon}
          <span className="relative flex items-center gap-2">
            {item.label}
            {item.badgeCount > 0 && (
              <span className="badge badge-sm badge-error absolute -top-2 -right-5">
                {item.badgeCount}
              </span>
            )}
          </span>
        </Link>
      ))}
    </nav>

    <div className="p-4 border-t border-base-300 mt-auto">
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src={authUser?.profilePic} alt="User Avatar" />
          </div>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">{authUser?.fullName}</p>
          <p className="text-xs text-success flex items-center gap-1">
            <span className="size-2 rounded-full bg-success inline-block" />
            Online
          </p>
        </div>
      </div>
    </div>
  </>
);

export default Sidebar;
