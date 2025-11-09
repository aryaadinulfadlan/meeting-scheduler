import Link from "next/link";
import { FaUser } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ItemDropdown from "./auth/item-dropdown";
import LogoutButton from "./auth/logout-button";
import { ModeToggler } from "./mode-toggler";
import GithubLink from "./github-link";
import { PrivateNavLinks } from "@/constants";
import { getSession } from "@/actions/session";

export default async function Header() {
  const session = await getSession();
  console.log({ session });
  return (
    <div className="sticky top-0 h-10 md:h-14 flex items-center z-10 bg-gray-200 dark:bg-card">
      <div className="flex items-center justify-between mx-auto max-w-[1600px] w-full px-6">
        <Link href={"/"}>
          <p className="text-sm md:text-base font-bold">MeetScheduler</p>
        </Link>
        <div className="flex items-center gap-4 xl:gap-4">
          <GithubLink />
          <ModeToggler />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="size-7 md:size-8 cursor-pointer border border-gray-400">
                <AvatarImage src={""} />
                <AvatarFallback className="bg-gray-600 dark:bg-card">
                  <FaUser className="text-white w-3 h-3" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-52 xl:w-68 bg-gray-200 dark:bg-card grid gap-2 lg:gap-3"
              align="end"
            >
              <DropdownMenuItem className="bg-transparent focus:bg-[inital]">
                <p className="truncate font-semibold text-base lg:text-lg text-black dark:text-foreground">
                  {session.isLoggedIn ? session.name : "No User Logged In"}
                </p>
              </DropdownMenuItem>
              {!session.isLoggedIn && (
                <>
                  <ItemDropdown label="Sign In" href="/sign-in" />
                  <ItemDropdown label="Sign Up" href="/sign-up" />
                </>
              )}
              {session.isLoggedIn && (
                <>
                  {PrivateNavLinks.map((el) => (
                    <ItemDropdown
                      key={el.route}
                      label={el.label}
                      href={el.route}
                    />
                  ))}
                  <DropdownMenuItem className="focus:bg-[inital]">
                    <LogoutButton />
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
