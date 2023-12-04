import prisma from "./database";
import { cookies } from "next/headers";

export const getAll = () => {
  return prisma.mentor.findMany({});
};

export const getDetail = async () => {
  try {
    const detail = await prisma.mentor.findUnique({
      where: {
        nim: cookies().get("nim")?.value,
      },
    });
    return { detail };
  } catch (error) {
    return { error };
  }
};
