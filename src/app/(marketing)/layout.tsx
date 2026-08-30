export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-black text-white min-h-screen selection:bg-white/20">
      {children}
    </div>
  );
}
