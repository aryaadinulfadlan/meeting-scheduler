"use client";

import { signOut } from "@/actions/auth";
import { LogOutIcon } from "lucide-react";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function LogoutButton() {
  const handleLogout = () => {
    signOut()
      .then(() => {
        toast.success("Successfully logout!");
        redirect("/");
      })
      .catch(() => toast.error("Something went wrong!"));
  };
  return (
    <div
      className="flex items-center font-medium cursor-pointer text-base lg:text-lg text-red-500 dark:text-red-400 w-full"
      onClick={handleLogout}
    >
      <LogOutIcon className="size-5 lg:size-6 mr-2 text-red-600 dark:text-red-400" />
      Sign Out
    </div>
  );
}
