import { getUserAvailabilityAction } from "@/actions/availability";
import AvailabilityForm from "@/components/availability/availability-form";
import { sleep } from "@/lib/utils";

export default async function Availability() {
  await sleep(300);
  const user_availability = await getUserAvailabilityAction();
  console.log({ user_availability });
  return (
    <div className="grid gap-8 py-6 lg:py-8 px-4 lg:px-6">
      <p className="font-bold text-xl md:text-3xl">Availability</p>
      <AvailabilityForm user_availability={user_availability} />
    </div>
  );
}
