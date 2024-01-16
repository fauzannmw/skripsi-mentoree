"use server";

import { redirect } from "next/navigation";
import prisma from "./database";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { User } from "@prisma/client";

import { v2 as cloudinary } from "cloudinary";
import { RegisterMentorTypes } from "@/app/admin/mentor-registration/form";
import { MentorInputs } from "@/app/profile/form-mentor";
import { sendMail } from "@/app/api/mail/mail";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const updateProfile = async (params: User) => {
  const session = await getServerSession(authOptions);

  const data = {
    major: params.major,
    nim: params.nim,
    phone_number: params.phone_number,
  };
  await prisma.user.update({
    where: {
      email: session?.user?.email,
    },
    data: data,
  });

  return redirect("/profile");
};

export const updateMentorProfile = async (params: MentorInputs) => {
  const session = await getServerSession(authOptions);

  await prisma.user.update({
    where: {
      email: session?.user?.email,
    },
    data: {
      phone_number: params?.phone_number,
    },
  });

  await prisma.mentor.update({
    where: {
      email: session?.user?.email,
    },
    data: {
      phone_number: params?.phone_number,
      description: params?.description,
    },
  });

  return redirect("/profile");
};

export const registerMentor = async (params: RegisterMentorTypes) => {
  await prisma.mentor.upsert({
    where: { nim: params.nim as string },
    update: {},
    create: {
      nim: params.nim as string,
      email: params.email as string,
      name: params.name as string,
      major: params.major as string,
      phone_number: params.phone_number as string,
      image: params.image as string,
      gender: params.gender as string,
      description: params.description as string,
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
      phone_number: params.phone_number,
      major: params.major,
      role: "mentor",
    },
  });

  await sendMail({
    to: params.email as string,
    name: "Mentoree",
    subject: `Berhasil mendaftar sebagai Mentor`,
    body: `Halo ${params?.name} akun Mentoree kamu dengan email ${params?.email} berhasil didaftarkan ke dalam sistem, silahkan login ulang melalui email kamu`,
  });

  return redirect("/admin/mentor-list");
};

export const updateFilter = async (data: any) => {
  const courseFilter = data.course ?? undefined;
  const genderFilter = data.gender ?? undefined;
  const dayFilter = data.day ?? undefined;

  if (courseFilter || genderFilter || dayFilter) {
    const courseParams = new URLSearchParams([
      ["course", courseFilter.join(",")],
    ]);
    const genderParams = new URLSearchParams([
      ["gender", genderFilter.join(",")],
    ]);
    const dayParams = new URLSearchParams([["day", dayFilter.join(",")]]);
    redirect(`/explore?${courseParams}&${genderParams}&${dayParams}`);
  }

  redirect("/explore");
};

