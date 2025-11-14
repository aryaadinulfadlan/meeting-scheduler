import { FaClock, FaUser, FaVideo } from "react-icons/fa";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { CardDescription, CardTitle } from "../ui/card";
import { getEventDetails } from "@/drizzle/queries/event";

export default async function EventDetails({
  event,
}: {
  event: Awaited<ReturnType<typeof getEventDetails>>;
}) {
  return (
    <div className="grid gap-3 lg:gap-4 lg:content-start">
      <p className="font-bold text-xl lg:text-3xl">{event?.title}</p>
      <div className="flex items-center gap-3">
        <Avatar className="bg-red-700 size-9 md:size-10 lg:size-10.5">
          <AvatarFallback className="bg-sky-900">
            <FaUser className="text-white size-4 lg:size-6" />
          </AvatarFallback>
        </Avatar>
        <div className="grid gap-0.5">
          <CardTitle>{event?.user.name}</CardTitle>
          <CardDescription>{event?.user.email}</CardDescription>
        </div>
      </div>
      <div className="grid gap-0.5">
        <div className="flex items-center justify-start gap-2 lg:gap-3">
          <FaClock className="size-3.5 lg:size-4" />
          <span className="text-sm lg:text-base">
            {event?.duration_in_minutes} minutes
          </span>
        </div>
        <div className="flex items-center justify-start gap-2 lg:gap-3">
          <FaVideo className="size-3.5 lg:size-4" />
          <span className="text-sm lg:text-base">Google Meet</span>
        </div>
      </div>
      <CardDescription>{event?.description}</CardDescription>
    </div>
  );
}
