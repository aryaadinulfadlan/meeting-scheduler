import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { FaHandPointRight } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex h-[calc(100vh-2.5rem)] md:h-[calc(100vh-3.5rem)] bg-zinc-50 font-sans dark:bg-black">
      <div className="h-[80%] md:h-[90%] px-6 flex max-w-2xl xl:max-w-none mx-auto justify-center gap-15 xl:gap-10 items-center flex-col xl:flex-row">
        <div className="grid gap-4 md:gap-6 xl:gap-8">
          <p className="font-bold text-2xl md:text-4xl xl:text-6xl xl:leading-18">
            Simplify Your Schedules
          </p>
          <p className="text-sm md:text-lg">
            <span className="font-bold">AryaScheduler</span> helps you manage
            your time effectively. Create events, set your availability, and let
            others book time with you seamlessly.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-fit font-bold">Get Started</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Who do you want to be?</DialogTitle>
              </DialogHeader>
              <div className="grid gap-2">
                <div className="flex items-start gap-3">
                  <FaHandPointRight className="shrink-0 size-5 lg:size-6" />
                  <span className="text-sm lg:text-base">
                    If you’re an organizer (or want to become one), simply click
                    the Organizer button at the top right corner to sign in or
                    sign up.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <FaHandPointRight className="shrink-0 size-5 lg:size-6" />
                  <span className="text-sm lg:text-base">
                    If you’re an invitee, simply open your invitation URL in
                    your browser.
                  </span>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="font-bold">Understood</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
