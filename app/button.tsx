"use client";
import React from "react";
import { title } from "@/components/primitives";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function CTAButton() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className={title()}>Please Login</h1>
        {/* <Button onClick={() => signIn()}>SignIn</Button> */}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-4">
        <h1 className={title()}>Welcome</h1>
        {/* <Button onClick={() => signOut()}>Sign Out</Button> */}
      </div>
    );
  }
}
