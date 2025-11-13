"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FaVideo } from "react-icons/fa";
import { MdEventNote } from "react-icons/md";
import { FaClock } from "react-icons/fa6";
import { format } from "date-fns";
import { MeetingData } from "@/app/(private)/meetings/page";
import { useTransition } from "react";
import { cancelBookingAction } from "@/actions/booking";

interface Props {
  data: MeetingData;
}
export default function UpcomingMeeting({ data }: Props) {
  const [isPending, startTransition] = useTransition();
  function handleCancel() {
    startTransition(() => {
      cancelBookingAction(data.id)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success(data.success);
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  }
  return (
    <Card className="max-w-md lg:max-w-none">
      <CardHeader>
        <CardTitle>{data.event.title}</CardTitle>
        <CardDescription>with {data.guest_name}</CardDescription>
        <CardDescription>&quot;{data.additional_info}&quot;</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-1">
        <div className="flex items-center gap-2 lg:gap-3">
          <MdEventNote className="size-3.5 lg:size-4" />
          <span className="text-sm md:text-base">
            {format(new Date(data.start_time), "MMMM d, yyyy")}
          </span>
        </div>
        <div className="flex items-center justify-start gap-2 lg:gap-3">
          <FaClock className="size-3.5 lg:size-4" />
          <span className="text-sm md:text-base">
            {format(new Date(data.start_time), "h:mm a")} -{" "}
            {format(new Date(data.end_time), "h:mm a")}
          </span>
        </div>
        <div className="flex items-center gap-2 lg:gap-3">
          <FaVideo className="size-3.5 lg:size-4" />
          <a
            href={data.meet_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-base text-blue-500 cursor-pointer dark:text-blue-400 hover:underline"
          >
            Join Meeting
          </a>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="font-bold text-xs md:text-sm"
              size="icon-sm"
              variant="destructive"
              disabled={isPending}
            >
              {isPending ? "Canceling.." : "Cancel Meeting"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                event data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleCancel} disabled={isPending}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
