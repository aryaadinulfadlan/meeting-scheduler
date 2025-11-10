import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-[calc(100vh-2.5rem)] md:h-[calc(100vh-3.5rem)] bg-zinc-50 font-sans dark:bg-black">
      <div className="h-[80%] md:h-[90%] px-6 flex max-w-2xl xl:max-w-none mx-auto justify-center gap-15 xl:gap-10 items-center flex-col xl:flex-row">
        <div className="grid gap-4 xl:gap-8">
          <p className="font-bold text-2xl md:text-4xl xl:text-6xl leading-18">
            Simplify Your Schedules
          </p>
          <p className="text-sm md:text-lg">
            MeetSchedulr helps you manage your time effectively. Create events,
            set your availability, and let others book time with you seamlessly.
          </p>
          <Button asChild className="w-fit font-bold">
            <Link href="/organizers">Get Started</Link>
          </Button>
        </div>
        <div className="relative w-full max-w-[24rem] xl:max-w-md aspect-square">
          <Image
            src="/poster.png"
            alt="Scheduling illustration"
            layout="fill"
            objectFit="contain"
            // className="bg-red-500"
          />
        </div>
      </div>
    </div>
  );
}
