"use client";

import { signOut } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";
import { toast } from "sonner";

export default function SignOutButton() {
  const router = useRouter();
  const handleLogout = () => {
    signOut()
      .then(() => {
        router.push("/dashboard");
        toast.success("Successfully logout!");
      })
      .catch(() => toast.error("Something went wrong!"));
  };
  return (
    <div
      onClick={handleLogout}
      className="flex items-center gap-4 p-3 hover:bg-sidebar-ring/20 dark:hover:bg-secondary cursor-pointer"
    >
      <LuLogOut className="size-4 md:size-5" />
      <span className="font-bold text-sm md:text-base">Sign Out</span>
    </div>
  );
}
