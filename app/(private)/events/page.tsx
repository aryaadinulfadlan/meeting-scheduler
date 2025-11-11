import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sleep } from "@/lib/utils";

const data = [
  {
    title: "One",
    description: "this is desc",
    duration_in_minutes: "4mins",
  },
  {
    title: "Two",
    description: "this is desc",
    duration_in_minutes: "4mins",
  },
  {
    title: "Three",
    description: "this is desc",
    duration_in_minutes: "4mins",
  },
  {
    title: "Four",
    description: "this is desc",
    duration_in_minutes: "4mins",
  },
  {
    title: "Five",
    description: "this is desc",
    duration_in_minutes: "4mins",
  },
];
export default async function Events() {
  await sleep(500);
  return (
    <div className="grid gap-8 py-6 lg:py-8 px-4 lg:px-6">
      <p className="font-bold text-xl md:text-3xl">My Events</p>
      <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr] lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] gap-4 lg:gap-6">
        {data.map((el, idx) => (
          <Card key={`${idx}-${el.title}`} className="max-w-md lg:max-w-none">
            <CardHeader>
              <CardTitle>{el.title}</CardTitle>
              <CardDescription>{el.duration_in_minutes}</CardDescription>
            </CardHeader>
            <CardContent>{el.description}</CardContent>
            <CardFooter className="gap-2">
              <Button
                className="font-bold text-xs md:text-sm"
                size="icon-sm"
                variant="outline"
              >
                Copy Link
              </Button>
              <Button className="font-bold text-xs md:text-sm" size="icon-sm">
                Update
              </Button>
              <Button
                className="font-bold text-xs md:text-sm"
                size="icon-sm"
                variant="destructive"
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
