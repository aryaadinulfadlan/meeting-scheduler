import { sleep } from "@/lib/utils";

export default async function Availability() {
  await sleep(500);
  return (
    <div className="grid gap-8 py-6 lg:py-8 px-4 lg:px-6">
      <p className="font-bold text-xl md:text-3xl">Availability</p>
      <div>content here</div>
    </div>
  );
}
