import { ButtonComponent } from "@/components/button";
import { checkTransactionStatusBasedOnDate } from "@/server/get_action";
import { Button, Image, Link } from "@nextui-org/react";
import { FaWhatsapp } from "react-icons/fa";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  await checkTransactionStatusBasedOnDate();

  return (
    <section className="grid max-w-screen-xl gap-4 px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
      <div className="mr-auto place-self-center lg:col-span-7">
        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
          {session?.user?.role === "mentor"
            ? "Jadilah Mentor Terbaik"
            : "Temukan Mentor Pemrograman Anda"}
        </h1>
        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          {session?.user?.role === "mentor"
            ? "Berikan kemampuan terbaik kamu dan jadilah mentor terbaik"
            : "Dengan Mentoree kamu bisa menemukan mentor pemrograman sesuai dengan keinginan kamu"}
        </p>
        {session?.user?.role === "mentor" ? (
          <ButtonComponent
            link={`/mentor/mentoringku`}
            text="Lihat Mentoring Aktif"
            fullWidth={true}
          />
        ) : (
          <div className="flex flex-col gap-2 lg:flex-row">
            <ButtonComponent
              link={`/explore`}
              text="Temukan Mentor Sekarang"
              fullWidth={false}
            />
            <Button
              as={Link}
              isExternal
              href="https://wa.me/6282211020018/?text=Halo%20Mentoree%20saya%20tertarik%20untuk%20mendaftar%20menjadi%20mentor"
              color="primary"
              radius="sm"
              variant="bordered"
              endContent={<FaWhatsapp />}
            >
              Daftar Sebagai Mentor
            </Button>
          </div>
        )}
      </div>
      <div className="lg:mt-0 lg:col-span-5 lg:flex">
        <Image src="/hero.png" alt="hero-image" />
      </div>
    </section>
  );
}
