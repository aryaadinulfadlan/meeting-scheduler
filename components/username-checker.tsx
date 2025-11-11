"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";

export default function UsernameChecker() {
  const [text, setText] = useState("");
  const { origin } = window.location;
  return (
    <div className="text-sm lg:text-base grid gap-2 mt-1">
      Or you can check the username here to see if they have a schedule.
      <Input value={text} onChange={(e) => setText(e.target.value)} />
      <Button size="icon-sm" asChild className="font-semibold">
        <Link href={`${origin}/${text}`}>Check</Link>
      </Button>
    </div>
  );
}
