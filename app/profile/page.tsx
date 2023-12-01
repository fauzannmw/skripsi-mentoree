"use client";
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-2 p-2 rounded shadow mt-9">
        <p>Name:</p>
        <p>{session?.user.name}</p>
        <p>Email:</p>
        <p>{session?.user.email}</p>
        <p>Role:</p>
        <p>{session?.user.role}</p>
      </div>
    </div>
  );
}
