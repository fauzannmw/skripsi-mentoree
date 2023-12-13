export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col justify-center gap-4 pt-8 md:pt-10">
      <div className="justify-center inline-block max-w-lg ">{children}</div>
    </section>
  );
}
