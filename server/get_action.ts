"use server";
import prisma from "./database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export const getAllMentor = async () => {
  try {
    const detail = await prisma.mentor.findMany({
      include: {
        course: {
          select: {
            course: true,
          },
        },
      },
    });
    return { detail };
  } catch (error) {
    return { error };
  }
};

export const getAllCourse = async () => {
  try {
    return await prisma.course.findMany({});
  } catch (error) {
    return { error };
  }
};

export const getMentorByFilter = async (course: string, gender: string) => {
  try {
    if (course || gender) {
      return await prisma.mentor.findMany({
        where: {
          gender: gender,
          course: {
            some: {
              course: course,
            },
          },
        },
      });
    } else {
      return await prisma.mentor.findMany({});
    }
  } catch (error) {
    return { error };
  }
};

export const getMentorByNim = async (nim: string) => {
  try {
    const detail = await prisma.mentor.findUnique({
      where: {
        nim: nim,
      },
      include: {
        course: {
          select: {
            course: true,
          },
        },
        course_day: {
          select: {
            day: true,
          },
        },
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
