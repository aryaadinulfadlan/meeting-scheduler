"use client";

import { ReactNode, useSyncExternalStore } from "react";

interface Props {
  children: ReactNode;
}

export default function ClientOnly({ children }: Props) {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!isClient) return null;
  return <>{children}</>;
}
