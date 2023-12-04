import { title, subtitle } from "@/components/primitives";

export default async function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="justify-center inline-block max-w-lg text-center">
        <h1 className={title()}>Welcome&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>Mentoree&nbsp;</h1>
        {/* <br />
        <h1 className={title()}>
          websites regardless of your design experience.
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </h2> */}
      </div>
    </section>
  );
}
