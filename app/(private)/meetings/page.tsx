import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sleep } from "@/lib/utils";
import { getUserBookingsAction } from "@/actions/booking";
import EmptyData from "@/components/empty-data";
import UpcomingMeeting from "@/components/meeting/upcoming-meeting";
import PastMeeting from "@/components/meeting/past-meeting";

export interface MeetingData {
  id: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  start_time: Date;
  end_time: Date;
  event_id: string;
  guest_name: string;
  guest_email: string;
  additional_info: string | null;
  timezone: string;
  meet_link: string;
  google_event_id: string;
  event: {
    id: string;
    created_at: Date;
    updated_at: Date;
    user_id: string;
    description: string | null;
    title: string;
    duration_in_minutes: number;
    user: {
      name: string;
      email: string;
    };
  };
}
export default async function Meetings() {
  await sleep(300);
  const upcoming_meetings = await getUserBookingsAction("upcoming");
  const past_meetings = await getUserBookingsAction("past");
  return (
    <div className="grid gap-8 py-6 lg:py-8 px-4 lg:px-6">
      <p className="font-bold text-xl md:text-3xl">Meetings</p>
      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        {!upcoming_meetings.length ? (
          <TabsContent value="upcoming" className="mt-6">
            <EmptyData
              text="No upcoming meeting data available"
              className="lg:text-xl xl:text-2xl"
            />
          </TabsContent>
        ) : (
          <TabsContent
            value="upcoming"
            className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr] lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] gap-4 lg:gap-6"
          >
            {upcoming_meetings.map((el) => (
              <UpcomingMeeting key={el.id} data={el} />
            ))}
          </TabsContent>
        )}
        {!past_meetings.length ? (
          <TabsContent value="past" className="mt-6">
            <EmptyData
              text="No past meeting data available"
              className="lg:text-xl xl:text-2xl"
            />
          </TabsContent>
        ) : (
          <TabsContent
            value="past"
            className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr] lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] gap-4 lg:gap-6"
          >
            {past_meetings.map((el) => (
              <PastMeeting key={el.id} data={el} />
            ))}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
