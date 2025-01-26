"use client";

import { logout } from "@/actions";
import React from "react";

export const Navbar = () => {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="flex items-center justify-between px-8 py-3 border-b border-b-[#A1A1A1]">
      <h1 className="font-bold text-2xl">Hi, Admin</h1>
      <div className="flex items-center gap-5">
        <button
          onClick={handleLogout}
          className="text-[#A1A1A1] hover:text-[#FFFFFF]"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};
