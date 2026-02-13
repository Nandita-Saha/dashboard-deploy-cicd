import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          ADMIN<span>Dash</span>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Dashboard
          </NavLink>
          <NavLink to="/dashboard/users" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            Users
          </NavLink>
          <NavLink to="/dashboard/settings" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            Settings
          </NavLink>
        </nav>
        <div className="sidebar-footer p-4 border-t border-slate-200 dark:border-slate-700">
          <button onClick={handleLogout} className="btn bg-red-500 hover:bg-red-600 text-white w-full">
            Logout
          </button>
        </div>
      </aside>

      <div className="main-wrapper">
        <header className="topbar">
          <div className="search-bar">
            <input type="text" placeholder="Search..." className="form-input w-[300px]" />
          </div>
          <div className="user-profile flex items-center gap-4">
            <div className="user-info text-right">
              <div className="font-semibold">{user?.name || "Guest User"}</div>
              <div className="text-xs text-slate-500">{user?.role || "Administrator"}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0) || "U"}
            </div>
          </div>
        </header>
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div >
    </div >
  );
}

export default DashboardLayout;
