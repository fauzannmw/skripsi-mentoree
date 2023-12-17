"use server";

import { redirect } from "next/navigation";
import prisma from "./database";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export const updateProfile = async (e: FormData) => {
  const session = await getServerSession(authOptions);

  const data = {
    email: e.get("email")?.toString(),
    name: e.get("name")?.toString(),
    major: e.get("major")?.toString(),
    nim: e.get("nim")?.toString(),
  };
  await prisma.user.update({
    where: {
      email: session?.user?.email,
    },
    data: data,
  });

  return redirect("/profile");
};

export const createTransaction = async (e: FormData) => {
  const session = await getServerSession(authOptions);

  await prisma.user.update({
    where: { email: session?.user?.email },
    data: {
      coin: { decrement: 1 },
      transaction: {
        create: [
          {
            mentorNim: e.get("mentorNim")?.toString(),
            date: e.get("date")?.toString(),
            time: e.get("time")?.toString(),
            location: e.get("location")?.toString(),
            participant: e.get("participant")?.toString(),
            mentoring_topic: e.get("mentoring_topic")?.toString(),
          },
        ],
      },
    },
  });

  return redirect("/transaction");
};

export const changeTransactionStatus = async (e: FormData) => {
  await prisma.transaction.update({
    where: {
      id: e.get("transactionId")?.toString(),
    },
    data: {
      status: "Selesai",
    },
  });

  return redirect("/transaction");
};

export const updateFilter = async (e: FormData) => {
  const courseFilter = e.getAll("course");
  const genderFilter = e.getAll("gender");
  const locationFilter = e.getAll("location");

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
