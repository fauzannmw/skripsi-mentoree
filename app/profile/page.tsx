import React, { Fragment } from "react";
import Form from "./form";
import { getProfileUser } from "@/server/get_action";
import { User } from "@prisma/client";

export default async function Profile() {
  const user = (await getProfileUser()).detail;

  return (
    <Fragment>
      <Form profile={user as User} />
    </Fragment>
  );
}
