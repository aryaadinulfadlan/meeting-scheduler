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
import { useState, useTransition } from "react";
import { FaLink } from "react-icons/fa";
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
import { deleteEventAction } from "@/actions/event";

interface Props {
  event: {
    title: string;
    duration_in_minutes: number;
    description: string | null;
    id: string;
    created_at: Date;
    updated_at: Date;
    user_id: string;
    user: {
      name: string;
      username: string;
      email: string;
    };
  };
}
export default function EventCard({ event }: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const [isPending, startTransition] = useTransition();
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(
        `${window?.location.origin}/${event.user.username}/${event.id}`
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (e) {
      const err = (e as Error).message;
      toast.error(`Failed to copy: ${err}`);
    }
  }
  function handleDelete() {
    startTransition(() => {
      deleteEventAction(event.id)
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
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>{event.duration_in_minutes} minutes</CardDescription>
      </CardHeader>
      <CardContent>{event.description}</CardContent>
      <CardFooter className="gap-2 ml-auto">
        <Button
          className="font-bold text-xs md:text-sm"
          size="icon-sm"
          variant="outline"
          onClick={handleCopy}
        >
          <FaLink className="size-3 md:size-4" />
          {isCopied ? "Copied!" : "Copy Link"}
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="font-bold text-xs md:text-sm"
              size="icon-sm"
              variant="destructive"
              disabled={isPending}
            >
              {isPending ? "Deleting.." : "Delete"}
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
              <AlertDialogAction onClick={handleDelete} disabled={isPending}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
