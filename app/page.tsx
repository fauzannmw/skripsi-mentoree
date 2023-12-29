import { title, subtitle } from "@/components/primitives";
import { sendMail } from "./api/mail/mail";
import { Button } from "@nextui-org/react";

export default async function Home() {
  const send = async () => {
    "use server";
    await sendMail({
      to: "fauzanwahyudi0@gmail.com",
      name: "Fauzan",
      subject: "Test Mail",
      body: `<h1>Halo</h1>`,
    });
  };
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="justify-center inline-block max-w-lg text-center">
        <h1 className={title()}>Welcome&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>Mentoree&nbsp;</h1>
        <form>
          <button formAction={send}>Send Email</button>
        </form>
      </div>
    </section>
  );
}
