"use client";

import { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function UsernameChecker() {
  const [text, setText] = useState("");
  const { push } = useRouter();
  const { origin } = window.location;
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    push(`${origin}/${text}`);
  }
  return (
    <div className="text-sm lg:text-base mt-1 grid gap-3">
      Or you can check the username here to see if they have a schedule.
      <form onSubmit={handleSubmit} className="grid gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Username"
        />
        <Button type="submit" size="icon-sm" className="font-semibold">
          Check
        </Button>
      </form>
    </div>
  );
}
