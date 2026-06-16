import { Sidebar } from "@/components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0">
        {/* pb-24 on mobile leaves room above the fixed bottom nav */}
        <main className="mx-auto max-w-4xl px-4 py-8 pb-28 md:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
