import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MdEventNote } from "react-icons/md";
import { FaClock } from "react-icons/fa6";
import { format } from "date-fns";
import { MeetingData } from "@/app/(private)/meetings/page";

interface Props {
  data: MeetingData;
}
export default function PastMeeting({ data }: Props) {
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
      </CardContent>
    </Card>
  );
}
