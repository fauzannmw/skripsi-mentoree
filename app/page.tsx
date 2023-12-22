import { title, subtitle } from "@/components/primitives";

export default async function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="justify-center inline-block max-w-lg text-center">
        <h1 className={title()}>Welcome&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>Mentoree&nbsp;</h1>
      </div>
    </section>
  );
}
