"use client";
import { subtitle, title } from "@/components/primitives";
import { Button } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AdminPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="justify-center inline-block max-w-lg text-center"></div>
    </section>
  );
}
