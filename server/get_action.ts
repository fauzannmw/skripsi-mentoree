"use server";
import prisma from "./database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export const getAllMentor = async () => {
  try {
    const detail = await prisma.mentor.findMany({});
    return { detail };
  } catch (error) {
    return { error };
  }
};

export const getMentorByMajor = async () => {
  try {
    const detail = await prisma.mentor.findMany({
      where: {
        major: "Teknik Informatika",
      },
    });
    return { detail };
  } catch (error) {
    return { error };
  }
};

export const getProfileUser = async () => {
  const session = await getServerSession(authOptions);

  try {
    const detail = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });
    return { detail };
  } catch (error) {
    return { error };
  }
};

// export const getDetail = async () => {
//   try {
//     const detail = await prisma.mentor.findUnique({
//       where: {
//         nim: cookies().get("nim")?.value,
//       },
//     });
//     return { detail };
//   } catch (error) {
//     return { error };
//   }
// };
