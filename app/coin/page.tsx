import React, { Fragment } from "react";
import Form from "./form";
import { getProfileUser } from "@/server/get_action";

export default async function Profile() {
  const user = await getProfileUser();
  const profile = user?.detail;
  return (
    <Fragment>
      <div className="flex flex-col gap-1">
        <p className="block text-xl font-bold leading-6">Mentoree Coin</p>
        <p>
          Mentoree Coin adalah mata uang digital yang digunakan untuk memesan
          mentor dalam aplikasi Mentoree. Satu Mentoree Coin setara dengan satu
          jam sesi mentor-mentee.
        </p>
        <p>Saldo Mentoree Coin : {profile?.coin ?? ""}</p>
      </div>
      <Form />
    </Fragment>
  );
}
