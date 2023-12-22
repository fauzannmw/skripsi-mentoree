"use client";
import { subtitle, title } from "@/components/primitives";
import { Button } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function MentorPage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className={title()}>Please Login</h1>
        <Button onClick={() => signIn()}>SignIn</Button>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-2">
        <h1 className={title()}>Welcome Mentor</h1>
        <p className={subtitle()}>{session?.user?.email}</p>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    );
  }
}
