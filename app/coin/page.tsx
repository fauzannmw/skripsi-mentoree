import React, { Fragment } from "react";
import Form from "./form";
import { getProfileUser } from "@/server/get_action";
import { User } from "@prisma/client";

export default async function Profile() {
  const user = await getProfileUser();
  const profile = user?.detail;

  return (
    <Fragment>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="block text-xl font-bold leading-6">Mentoree Coin</p>
          <p className="text-sm font-semibold">
            Saldo Coin: <span className="font-bold">{profile?.coin ?? ""}</span>
          </p>
        </div>
        <p>
          Mentoree Coin adalah mata uang digital yang digunakan untuk memesan
          mentor dalam aplikasi Mentoree. Satu Mentoree Coin setara dengan satu
          jam sesi mentor-mentee.
        </p>
      </div>
      <Form profile={profile as User} />
    </Fragment>
  );
}
