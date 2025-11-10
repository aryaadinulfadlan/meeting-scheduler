"use client";
import { MdEventNote, MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import Link from "next/link";
import SignOutButton from "./auth/sign-out-button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const privateNavLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <MdSpaceDashboard className="size-4 md:size-5" />,
  },
  {
    href: "/events",
    label: "My Events",
    icon: <MdEventNote className="size-4 md:size-5" />,
  },
  {
    href: "/meetings",
    label: "Meetings",
    icon: <FaUsers className="size-4 md:size-5" />,
  },
  {
    href: "/availability",
    label: "Availability",
    icon: <FaClock className="size-4 md:size-5" />,
  },
];
export default function Sidebar() {
  const path = usePathname();
  return (
    <div className="grid gap-4 pt-10">
      {privateNavLinks.map(({ icon, label, href }) => (
        <Link
          key={label}
          href={href}
          className={cn(
            "flex items-center gap-4 p-3 hover:bg-sidebar-ring/20 dark:hover:bg-secondary",
            path === href && "bg-sidebar-ring/20 dark:bg-secondary"
          )}
        >
          {icon}
          <span className="font-bold text-sm md:text-base">{label}</span>
        </Link>
      ))}
      <SignOutButton />
    </div>
  );
}
