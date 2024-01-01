export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex justify-center w-full my-8 md:mt-10">
      <div className="flex justify-center w-full max-w-xl">{children}</div>
    </section>
  );
}
