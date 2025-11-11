import { Button } from "@/components/ui/button";
import { getUserByUsername } from "@/drizzle/queries/auth";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserProfileByUsername } from "@/drizzle/queries/user";
import EmptyData from "@/components/empty-data";

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
  const user = await getUserProfileByUsername(username);
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
  return (
    <div className="min-h-[calc(100vh-2.5rem)] md:min-h-[calc(100vh-3.5rem)] py-8 lg:py-12 px-4 lg:px-0 max-w-4xl mx-auto">
      <div className="flex flex-col gap-1">
        <p className="text-lg lg:text-2xl font-bold">
          {user.name} - <span className="italic">{user.email}</span>
        </p>
        <p className="text-sm md:text-base">
          Welcome to my scheduling page, please select an event below to book a
          call with me.
        </p>
      </div>
      <div className="mt-8 lg:mt-12 grid gap-3 lg:gap-6 grid-cols-[1fr] sm:grid-cols-[1fr_1fr]">
        {user.events.length > 0 ? (
          user.events.map((el, idx) => (
            <Card key={`${idx}-${el.title}`} className="lg:max-w-none">
              <CardHeader>
                <CardTitle>{el.title}</CardTitle>
                <CardDescription>{el.duration_in_minutes}</CardDescription>
              </CardHeader>
              <CardContent>{el.description}</CardContent>
              <CardFooter>
                <Button className="font-bold text-xs md:text-sm" size="icon-sm">
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <EmptyData text="No Events Data Available." />
        )}
      </div>
    </div>
  );
}
