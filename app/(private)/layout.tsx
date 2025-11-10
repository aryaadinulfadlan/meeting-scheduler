import Sidebar from "@/components/sidebar";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex relative">
      <div className="fixed w-56 shrink-0 hidden md:block h-[calc(100vh-2.5rem)] md:h-[calc(100vh-3.5rem)] bg-accent dark:bg-card">
        <Sidebar />
      </div>
      <div className="min-h-[calc(100vh-2.5rem)] md:min-h-[calc(100vh-3.5rem)] left-56 md:relative">
        {children}
      </div>
    </div>
  );
}
