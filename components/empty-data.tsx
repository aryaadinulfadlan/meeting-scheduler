import { cn } from "@/lib/utils";

export default function EmptyData({
  text = "No Data Available.",
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div className={cn("text-lg lg:text-2xl xl:text-3xl font-bold", className)}>
      {text}
    </div>
  );
}
