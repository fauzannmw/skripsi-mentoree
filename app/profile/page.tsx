import React, { Fragment } from "react";
import Form from "./form";
import { getProfileUser } from "@/server/get_action";

export default async function Profile() {
  const user = (await getProfileUser()).detail;

  return (
    <Fragment>
      {/* @ts-ignore */}
      <Form profile={user} />
    </Fragment>
  );
}
