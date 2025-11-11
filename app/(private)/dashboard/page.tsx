import { getSession } from "@/actions/session";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Dashboard() {
  const session = await getSession();
  return (
    <div className="grid gap-8 py-6 lg:py-8 px-4 lg:px-6">
      <p className="font-bold text-xl md:text-3xl">Dashboard</p>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {session.name}!</CardTitle>
          <CardDescription>View your scheduled meetings below.</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside text-sm lg:text-base">
            <li>Meeting 1 on ..</li>
            <li>Meeting 2 on ..</li>
            <li>Meeting 3 on ..</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
