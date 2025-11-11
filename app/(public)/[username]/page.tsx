import { Button } from "@/components/ui/button";
import { getUserByUsername } from "@/drizzle/queries/auth";
import type { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const user = await getUserByUsername(username);
  if (!user) {
    return {
      title: "User Not Found | AryaScheduler",
    };
  }
  return {
    title: `${user.name} | AryaScheduler`,
    description: `Book an event with ${user.name}. View available public events and schedules.`,
  };
}

export default async function UserProfile({ params }: Props) {
  const { username } = await params;
  const user = await getUserByUsername(username);
  if (!user) {
    return (
      <div className="h-[calc(80vh-2.5rem)] md:h-[calc(80vh-3.5rem)] text-2xl font-bold lg:text-5xl flex flex-col gap-4 lg:gap-6 items-center justify-center">
        We couldn’t find this user
        <Button asChild className="font-bold">
          <Link href={"/"}>Go Home</Link>
        </Button>
      </div>
    );
  }
  return <div>UserProfile - {user.email}</div>;
}
