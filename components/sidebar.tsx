import { MdEventNote, MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="grid gap-4 pt-10">
      <Link
        href="/dashboard"
        className="flex items-center gap-4 p-3 hover:bg-secondary"
      >
        <MdSpaceDashboard className="size-4 md:size-5" />
        <span className="font-bold text-sm md:text-base">Dashboard</span>
      </Link>
      <Link
        href="/events"
        className="flex items-center gap-4 p-3 hover:bg-secondary"
      >
        <MdEventNote className="size-4 md:size-5" />
        <span className="font-bold text-sm md:text-base">Events</span>
      </Link>
      <Link
        href="/meetings"
        className="flex items-center gap-4 p-3 hover:bg-secondary"
      >
        <FaUsers className="size-4 md:size-5" />
        <span className="font-bold text-sm md:text-base">Meetings</span>
      </Link>
      <Link
        href="/availability"
        className="flex items-center gap-4 p-3 hover:bg-secondary"
      >
        <FaClock className="size-4 md:size-5" />
        <span className="font-bold text-sm md:text-base">Availability</span>
      </Link>
    </div>
  );
}
