import { Outlet } from "react-router-dom";
import Header from "../header/header";

function Layout() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-6 mt-14">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
