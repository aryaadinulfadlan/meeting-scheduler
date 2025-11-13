import { getEventAvailabilityAction } from "@/actions/availability";
import BookingForm from "@/components/booking-form";
import EventDetails from "@/components/event/event-details";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getEventDetails } from "@/drizzle/queries/event";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { validate } from "uuid";

type Props = {
  params: Promise<{ username: string; eventId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { eventId } = await params;
  const event = await getEventDetails(eventId);
  if (!event) {
    return {
      title: "Event Not Found | AryaScheduler",
    };
  }
  return {
    title: `Book ${event.title} | AryaScheduler`,
    description: `Schedule a ${event.duration_in_minutes}-minute ${event.title} event with ${event.user.name}.`,
  };
}

export default async function EventPage({ params }: Props) {
  const { eventId, username } = await params;
  const isValidId = validate(eventId);
  if (!isValidId) {
    notFound();
  }
  const event = await getEventDetails(eventId);
  const availability = await getEventAvailabilityAction(eventId);
  if (!event) {
    return (
      <div className="h-[calc(80vh-2.5rem)] md:h-[calc(80vh-3.5rem)] text-2xl font-bold lg:text-5xl flex flex-col gap-4 lg:gap-6 items-center justify-center">
        We couldn’t find this event
        <Button asChild className="font-bold">
          <Link href={`/${username}`}>Another Events</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="min-h-[calc(100vh-2.5rem)] md:min-h-[calc(100vh-3.5rem)] pt-8 pb-6 px-4 max-w-[360px] md:max-w-[550px] lg:max-w-[850px] mx-auto">
      <Card className="rounded-md">
        <CardContent className="grid gap-4 lg:grid-cols-[1fr_auto_2fr]">
          <EventDetails event={event} />
          <Separator orientation="horizontal" className="lg:hidden" />
          <div className="hidden lg:block" />
          <BookingForm event={event} availability={availability} />
        </CardContent>
      </Card>
    </div>
  );
}
