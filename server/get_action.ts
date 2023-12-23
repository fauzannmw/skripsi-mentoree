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
        experience: {
          select: {
            position: true,
            company: true,
          },
        },
        certification: {
          select: {
            course: true,
            institution: true,
          },
        },
        transaction: true,
      },
    });
    return { detail };
  } catch (error) {
    return { error };
  }
};

export const checkMentorInUser = async (email: string) => {
  try {
    return !!(await prisma.user.findFirst({
      where: {
        email: email,
      },
    }));
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
      include: {
        transaction: true,
      },
    });
    return { detail };
  } catch (error) {
    return { error };
  }
};

export const getAllCourse = async () => {
  try {
    return await prisma.course.findMany({
      orderBy: {
        course: "asc",
      },
    });
  } catch (error) {
    return { error };
  }
};

export const getAllTransaction = async () => {
  try {
    return await prisma.transaction.findMany({
      include: {
        User: true,
        mentor: true,
      },
    });
  } catch (error) {
    return { error };
  }
};

export const getTransactionByStatus = async (status: string) => {
  try {
    const detail = await prisma.transaction.findMany({
      where: {
        status: status,
      },
    });
    return { detail };
  } catch (error) {
    return { error };
  }
};

export const getMentorByFilter = async (
  course: string,
  gender: string,
  location: string
) => {
  try {
    if (course || gender || location) {
      switch (course || gender || location) {
        case course && gender && location:
          return await prisma.mentor.findMany({
            where: {
              gender: gender,
              mentoring_location: {
                some: {
                  location: location,
                },
              },
              course: {
                some: {
                  course: course,
                },
              },
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
                  time: true,
                },
              },
            },
          });
          break;
        case course && gender:
          return await prisma.mentor.findMany({
            where: {
              gender: gender,
              course: {
                some: {
                  course: course,
                },
              },
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
                  time: true,
                },
              },
            },
          });
          break;
        case gender && location:
          return await prisma.mentor.findMany({
            where: {
              gender: gender,
              mentoring_location: {
                some: {
                  location: location,
                },
              },
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
                  time: true,
                },
              },
            },
          });
          break;
        case course:
          return await prisma.mentor.findMany({
            where: {
              course: {
                some: {
                  course: course,
                },
              },
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
                  time: true,
                },
              },
            },
          });
          break;
        case gender:
          return await prisma.mentor.findMany({
            where: {
              gender: gender,
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
                  time: true,
                },
              },
            },
          });
          break;
        case location:
          return await prisma.mentor.findMany({
            where: {
              mentoring_location: {
                some: {
                  location: location,
                },
              },
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
                  time: true,
                },
              },
            },
          });
          break;
        default:
          return await prisma.mentor.findMany({
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
          break;
      }
    } else {
      return await prisma.mentor.findMany({
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
    }
  } catch (error) {
    return { error };
  }
};
