import React, { Fragment } from "react";
import Form from "./form";
import MentorForm from "./form-mentor";
import { getProfileMentor, getProfileUser } from "@/server/get_action";
import {
  Course,
  Day,
  Mentor,
  User,
  Experience,
  Certification,
  Transaction,
} from "@prisma/client";

interface MentorExtend extends Mentor {
  course: Course[];
  course_day: Day[];
  experience: Experience[];
  certification: Certification[];
  transaction: Transaction[];
}

export default async function Profile() {
  const user = (await getProfileUser()).detail;
  const mentor = await getProfileMentor();
  console.log(user);

  return (
    <Fragment>
      {user?.role === "user" || user?.role === "admin" ? (
        <Form profile={user as User} />
      ) : (
        <MentorForm profile={user as User} mentor={mentor as MentorExtend} />
      )}
    </Fragment>
  );
}
