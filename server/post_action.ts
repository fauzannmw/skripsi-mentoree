"use server";

import { redirect } from "next/navigation";
import prisma from "./database";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { User } from "@prisma/client";
import { registerMentorTypes } from "./types";

export const updateProfile = async (params: User) => {
  const session = await getServerSession(authOptions);

  const data = {
    major: params.major,
    nim: params.nim,
  };
  await prisma.user.update({
    where: {
      email: session?.user?.email,
    },
    data: data,
  });

  return redirect("/profile");
};

export const registerMentor = async (params: registerMentorTypes) => {
  await prisma.mentor.upsert({
    where: { nim: params.nim as string },
    update: {},
    create: {
      nim: params.nim as string,
      email: params.email,
      name: params.name as string,
      major: params.major as string,
      phone_number: params.phone_number as string,
      image: params.image as string,
      gender: params.gender as string,
      description: params.description as string,
      mentoring_location: {
        create: [
          {
            location: params.mentoring_location as string,
          },
        ],
      },
      course: {
        create: [
          {
            course: params.course as string,
          },
        ],
      },
      course_day: {
        create: [
          {
            day: params.course_day as string,
            time: params.course_time as string,
          },
        ],
      },
      experience: {
        create: [
          {
            position: params.experience_position as string,
            company: params.experience_company as string,
          },
        ],
      },
      certification: {
        create: [
          {
            course: params.certification_course as string,
            institution: params.certification_institution as string,
          },
        ],
      },
    },
  });

  await prisma.user.update({
    where: {
      email: params.email as string,
    },
    data: {
      nim: params.nim,
      major: params.major,
      role: "mentor",
    },
  });

  return redirect("/admin/mentor-registration");
};

export const updateFilter = async (data: any) => {
  const courseFilter = data.course ?? "";
  const genderFilter = data.gender ?? "";
  const locationFilter = data.location ?? "";

  if (courseFilter || genderFilter || locationFilter) {
    const courseParams = new URLSearchParams([
      ["course", courseFilter.join(",")],
    ]);
    const genderParams = new URLSearchParams([
      ["gender", genderFilter.join(",")],
    ]);
    const locationParams = new URLSearchParams([
      ["location", locationFilter.join(",")],
    ]);
    redirect(`/explore?${courseParams}&${genderParams}&${locationParams}`);
  }

  redirect("/explore");
};

// export const register = async (e: FormData) => {
//   const data = {
//     name: e.get("name")?.toString(),
//     nim: e.get("nim")?.toString(),
//     major: e.get("major")?.toString(),
//     email: e.get("email")?.toString(),
//     password: e.get("password")?.toString(),
//   };
//   // @ts-ignore
//   await prisma.mentee.create({ data: data });
//   // cookies().set("nim", e.get("nim") as string);
//   return redirect("/signin");
// };

// export const login = async (e: FormData) => {
//   const mentee = await prisma.mentee.findUnique({
//     where: {
//       //@ts-ignore
//       nim: e.get("nim")?.toString(),
//     },
//   });

//   if (e.get("nim") === mentee?.nim && e.get("password") === mentee?.password) {
//     cookies().set("nim", mentee.nim);
//     return { mentee };
//     // return redirect("/");
//   }

//   return;
// };

// export const logout = async () => {
//   cookies().delete("nim");
//   redirect("/signin");
// };
