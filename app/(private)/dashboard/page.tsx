import { getUserUpcomingBookingsAction } from "@/actions/booking";
import { getSession } from "@/actions/session";
import EmptyData from "@/components/empty-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sleep } from "@/lib/utils";
import { format } from "date-fns";

export default async function Dashboard() {
  await sleep(300);
  const session = await getSession();
  const upcoming_bookings = await getUserUpcomingBookingsAction();
  return (
    <div className="grid gap-8 py-6 lg:py-8 px-4 lg:px-6">
      <p className="font-bold text-xl md:text-3xl">Dashboard</p>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {session.name}!</CardTitle>
          <CardDescription>View your scheduled meetings below.</CardDescription>
        </CardHeader>
        <CardContent>
          {!upcoming_bookings.length ? (
            <EmptyData text="No Meeting Data Available." />
          ) : (
            <ol className="list-decimal list-inside text-sm lg:text-base">
              {upcoming_bookings.map((el) => (
                <li key={el.id}>
                  {el.event.title} on{" "}
                  {format(new Date(el.start_time), "MMM d, yyyy h:mm a")} with{" "}
                  {el.guest_name}
                </li>
              ))}
            </ol>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
