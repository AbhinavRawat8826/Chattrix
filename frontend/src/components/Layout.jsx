import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";

const Layout = ({ children, showSidebar = false }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="flex">
        {showSidebar && (
          <Sidebar
            mobileSidebarOpen={mobileSidebarOpen}
            setMobileSidebarOpen={setMobileSidebarOpen}
          />
        )}

        <div className="flex-1 flex flex-col">
          <Navbar
            onMobileMenuClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          />

          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
