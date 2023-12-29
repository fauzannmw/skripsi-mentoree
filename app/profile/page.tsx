import React, { Fragment } from "react";
import Form from "./form";
import { getProfileMentor, getProfileUser } from "@/server/get_action";
import { Mentor, User } from "@prisma/client";

export default async function Profile() {
  const user = (await getProfileUser()).detail;
  const mentor = await getProfileMentor();
  console.log(mentor);

  return (
    <Fragment>
      <Form profile={user as User} mentor={mentor as Mentor} />
    </Fragment>
  );
}
