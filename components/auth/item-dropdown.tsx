"use client";

import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "../ui/dropdown-menu";

interface Props {
  label: string;
  href: string;
}
export default function ItemDropdown({ label, href }: Props) {
  const router = useRouter();
  const handleClick = () => {
    router.push(href);
  };
  return (
    <DropdownMenuItem className="focus:bg-[inital]">
      <div
        onClick={handleClick}
        className="flex items-center hover:underline font-medium cursor-pointer text-sm xl:text-base text-blue-500 dark:text-blue-400 w-full"
      >
        {label}
      </div>
    </DropdownMenuItem>
  );
}
