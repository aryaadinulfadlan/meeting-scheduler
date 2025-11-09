"use client";

import { LogOutIcon } from "lucide-react";

export default function LogoutButton() {
  const handleLogout = () => {
    // logout()
    //   .then(() => toast.success("Successfully Logout!"))
    //   .catch(() => toast.error("Something Went Wrong!"));
  };
  return (
    <div
      className="flex items-center font-medium cursor-pointer text-sm xl:text-base text-red-500 dark:text-red-400 w-full"
      onClick={handleLogout}
    >
      <LogOutIcon className="w-4 h-4 md:w-5 md:h-5 mr-2 text-red-600 dark:text-red-400" />
      Logout
    </div>
  );
}
