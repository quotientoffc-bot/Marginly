import BottomDock from "@/components/layout/BottomDock";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full relative">
      <div className="bg-glow top-0 left-[20%] opacity-50"></div>
      <div className="bg-glow bottom-0 right-[10%] opacity-30"></div>
      
      <main className="flex-1 flex flex-col h-screen overflow-y-auto z-10 relative">
        <div className="p-8 pb-72 w-full max-w-7xl mx-auto min-h-full relative">
          {children}
        </div>
      </main>
      
      <BottomDock />
    </div>
  );
}
