import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaVideo } from "react-icons/fa";
import { MdEventNote } from "react-icons/md";
import { FaClock } from "react-icons/fa6";

const data = [
  {
    title: "One",
    description: "this is desc",
    date: "January 01, 2020",
    time: "09:00 - 10.00",
  },
  {
    title: "Two",
    description: "this is desc",
    date: "January 01, 2020",
    time: "09:00 - 10.00",
  },
  {
    title: "Three",
    description: "this is desc",
    date: "January 01, 2020",
    time: "09:00 - 10.00",
  },
  {
    title: "Four",
    description: "this is desc",
    date: "January 01, 2020",
    time: "09:00 - 10.00",
  },
  {
    title: "Five",
    description: "this is desc",
    date: "January 01, 2020",
    time: "09:00 - 10.00",
  },
];
export default async function Meetings() {
  return (
    <div className="grid gap-8 py-6 lg:py-8 px-4 lg:px-6">
      <p className="font-bold text-xl md:text-3xl">Meetings</p>
      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent
          value="upcoming"
          className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr] lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] gap-4 lg:gap-6"
        >
          {data.map((el, idx) => (
            <Card key={`${idx}-${el.title}`} className="max-w-md lg:max-w-none">
              <CardHeader>
                <CardTitle>{el.title}</CardTitle>
                <CardDescription>{el.description}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-1">
                <div className="flex items-center gap-2 lg:gap-3">
                  <MdEventNote className="size-3.5 lg:size-4" />
                  <span className="text-sm md:text-base">{el.date}</span>
                </div>
                <div className="flex items-center justify-start gap-2 lg:gap-3">
                  <FaClock className="size-3.5 lg:size-4" />
                  <span className="text-sm md:text-base">{el.time}</span>
                </div>
                <div className="flex items-center gap-2 lg:gap-3">
                  <FaVideo className="size-3.5 lg:size-4" />
                  <a className="text-sm md:text-base text-blue-500 cursor-pointer dark:text-blue-400 underline">
                    Join Meeting
                  </a>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button
                  className="font-bold text-xs md:text-sm"
                  size="icon-sm"
                  variant="destructive"
                >
                  Cancel Meeting
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        <TabsContent
          value="past"
          className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr] lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] gap-4 lg:gap-6"
        >
          {data.map((el, idx) => (
            <Card key={`${idx}-${el.title}`} className="max-w-md lg:max-w-none">
              <CardHeader>
                <CardTitle>{el.title}</CardTitle>
                <CardDescription>{el.description}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-1">
                <div className="flex items-center gap-2 lg:gap-3">
                  <MdEventNote className="size-3.5 lg:size-4" />
                  <span className="text-sm md:text-base">{el.date}</span>
                </div>
                <div className="flex items-center justify-start gap-2 lg:gap-3">
                  <FaClock className="size-3.5 lg:size-4" />
                  <span className="text-sm md:text-base">{el.time}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
