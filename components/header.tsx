import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import ItemDropdown from "./auth/item-dropdown";
import { ModeToggler } from "./mode-toggler";
import GithubLink from "./github-link";
import { getSession } from "@/actions/session";
import { Button } from "./ui/button";
import MobileSidebar from "./mobile-sidebar";

export default async function Header() {
  const session = await getSession();
  console.log({ session });
  return (
    <div className="sticky top-0 h-10 md:h-14 flex items-center z-10 bg-accent dark:bg-card">
      <div className="flex items-center justify-between mx-auto max-w-[1600px] w-full px-3 md:px-6">
        <div className="flex items-center gap-1">
          {session.isLoggedIn && <MobileSidebar />}
          <Link href={"/"}>
            <p className="text-sm md:text-base font-bold">AryaScheduler</p>
          </Link>
        </div>
        <div className="flex items-center gap-4 xl:gap-4">
          <GithubLink />
          <ModeToggler />
          {!session.isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon-sm" className="font-bold" variant="outline">
                  Organizer
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-30 xl:w-40 bg-accent dark:bg-card grid gap-2 lg:gap-3"
                align="end"
              >
                <ItemDropdown label="Sign In" href="/sign-in" />
                <ItemDropdown label="Sign Up" href="/sign-up" />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="icon-sm" asChild className="font-bold">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
