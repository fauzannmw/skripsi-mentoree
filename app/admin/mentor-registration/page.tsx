import React from "react";
import Form from "./form";
import { getProfileUser } from "@/server/get_action";
import { User } from "@prisma/client";

export default async function MentorRegistrationPage() {
  const user = (await getProfileUser()).detail;

  return (
    <div className="flex flex-col max-w-xl mx-auto my-6 sm:my-20 gap-y-6">
      <div className="flex justify-center w-full">
        <h1 className="text-xl font-bold">Pendaftaran Mentor</h1>
      </div>
      <Form profile={user as User} />
    </div>
  );
}
