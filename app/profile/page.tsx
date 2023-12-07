import React, { Fragment } from "react";
import Form from "./form";
// import FormCopy from "./form copy";
import { getProfileUser } from "@/server/get_action";

export default async function Profile() {
  const user = await getProfileUser();
  const profile = user.detail;

  return (
    <Fragment>
      {/* @ts-ignore */}
      <Form profile={profile} />
    </Fragment>
  );
}
