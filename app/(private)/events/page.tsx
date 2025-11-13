import { getUserEventsAction } from "@/actions/event";
import EmptyData from "@/components/empty-data";
import EventCard from "@/components/event/event-card";
import { EventCreate } from "@/components/event/event-create";
import { sleep } from "@/lib/utils";

export default async function Events() {
  await sleep(300);
  const events = await getUserEventsAction();
  console.log({ events });
  return (
    <div className="grid gap-8 py-6 lg:py-8 px-4 lg:px-6">
      <p className="font-bold text-xl md:text-3xl">My Events</p>
      <EventCreate />
      {!events.length ? (
        <EmptyData text="You have not created any events yet." />
      ) : (
        <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr] lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] gap-4 lg:gap-6">
          {events.map((el) => (
            <EventCard event={el} key={el.id} />
          ))}
        </div>
      )}
    </div>
  );
}
