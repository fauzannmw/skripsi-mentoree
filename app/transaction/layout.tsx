import Tab from "./tab";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 py-8 md:justify-center md:items-center md:py-10">
      <div className="inline-block max-w-lg">
        <Tab />
        {children}
      </div>
    </section>
  );
}
