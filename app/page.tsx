import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { logout } from "@/server/post_action";
import { getDetail } from "@/server/get_action";
import { Button } from "@nextui-org/button";
import CTAButton from "./button";

export default async function Home() {

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="justify-center inline-block max-w-lg text-center">
        <h1 className={title()}>Make&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
        <br />
        <h1 className={title()}>
          websites regardless of your design experience.
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </h2>
        <CTAButton />
      </div>
    </section>
  );
}
