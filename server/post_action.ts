"use server";

import { redirect } from "next/navigation";
import prisma from "./database";
import { cookies } from "next/headers";

export const register = async (e: FormData) => {
  const data = {
    name: e.get("name")?.toString(),
    nim: e.get("nim")?.toString(),
    major: e.get("major")?.toString(),
    email: e.get("email")?.toString(),
    password: e.get("password")?.toString(),
  };
  // @ts-ignore
  await prisma.mentee.create({ data: data });
  // cookies().set("nim", e.get("nim") as string);
  return redirect("/signin");
};

export const login = async (e: FormData) => {
  const mentee = await prisma.mentee.findUnique({
    where: {
      //@ts-ignore
      nim: e.get("nim")?.toString(),
    },
  });

  if (e.get("nim") === mentee?.nim && e.get("password") === mentee?.password) {
    cookies().set("nim", mentee.nim);
    return { mentee };
    // return redirect("/");
  }

  return;
};

export const logout = async () => {
  cookies().delete("nim");
  redirect("/signin");
};
