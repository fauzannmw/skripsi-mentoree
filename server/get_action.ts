"use server";
import prisma from "./database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { sendMail } from "@/app/api/mail/mail";

export const checkTransactionStatusBasedOnDate = async () => {
  const confirmLimit = new Date().setDate(new Date().getDate() - 3);

  try {
    await prisma.transaction.updateMany({
      where: {
        status: "Menunggu",
        date: {
          lte: new Date(),
        },
      },
      data: {
        status: "Gagal",
        message:
          "Mentor tidak merespon permintan mentoring hingga tanggal mentoring",
      },
    });
    const wait = await prisma.transaction.updateMany({
      where: {
        status: "Menunggu",
        date: {
          lte: new Date(),
        },
      },
      data: {
        status: "Gagal",
        message:
          "Mentor tidak merespon permintan mentoring hingga tanggal mentoring",
      },
    });

    const live = await prisma.transaction.updateMany({
      where: {
        status: "Berlangsung",
        date: {
          lte: new Date(confirmLimit),
        },
      },
      data: {
        status: "Selesai",
        message:
          "Proses mentoring dianggap selesai karena mentee tidak konfirmasi selesai hingga 3 hari setelah proses mentoring",
      },
    });

    wait?.count > 0 &&
      (await sendMail({
        to: "mentoree.ub@gmail.com",
        name: "Mentoree",
        subject: "Transaksi Gagal Otomatis",
        body: `<div>
        <p>Halo Admin ada ${wait?.count} transaksi Gagal Otomatis karena Mentor tidak merespon permintan mentoring hingga tanggal mentoring</p>
        <a href="https://mentoree.vercel.app/admin/transaction-urgent">Mentoree</a>
        </div>`,
      }));

    live?.count > 0 &&
      (await sendMail({
        to: "mentoree.ub@gmail.com",
        name: "Mentoree",
        subject: "Transaksi Selesai Otomatis",
        body: `<div>
        <p>Halo Admin ada ${live?.count} transaksi Selesai Otomatis karena Mentee tidak melakukan konfirmasi pesanan penyelesaian Mentoring</p>
        <a href="https://mentoree.vercel.app/admin/transaction-urgent">Mentoree</a>
        </div>`,
      }));

    return { wait, live };
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

export const getAllUser = async () => {
  try {
    return await prisma.user.findMany({});
  } catch (error) {
    return { error };
  }
};

export const getProfileMentor = async () => {
  const session = await getServerSession(authOptions);

  try {
    return await prisma.mentor.findUnique({
      where: {
        email: session?.user?.email,
      },
      include: {
        course: true,
        course_day: true,
        // mentoring_location: true,
        transaction: true,
      },
    });
  } catch (error) {
    return { error };
  }
};

export const getAllMentor = async () => {
  try {
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
            time: true,
          },
        },
      },
    });
  } catch (error) {
    return { error };
  }
};

export const getMentorById = async (id: string) => {
  try {
    const detail = await prisma.mentor.findUnique({
      where: {
        id: id,
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

export const checkMentorInUser = async (email?: string) => {
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

export const checkMentorNimInUser = async (nim?: string) => {
  try {
    const data = !!(await prisma.mentor.findFirst({
      where: {
        nim: nim,
      },
    }));
    return !data;
  } catch (error) {
    return { error };
  }
};

export const getMentorByFilter = async (
  course: string,
  gender: string,
  day: string
) => {
  console.log(course, gender, day);

  try {
    return await prisma.mentor.findMany({
      where: {
        OR: [
          {
            course: {
              some: {
                course: course,
              },
            },
          },
          {
            name: gender,
          },
          {
            course_day: {
              some: {
                day: day,
              },
            },
          },
        ],
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
  } catch (error) {
    return { error };
  }
};

export const getMentorByFilters = async (
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
              // mentoring_location: {
              //   some: {
              //     location: location,
              //   },
              // },
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
              // mentoring_location: {
              //   some: {
              //     location: location,
              //   },
              // },
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
              // mentoring_location: {
              //   some: {
              //     location: location,
              //   },
              // },
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
      return getAllMentor();
    }
  } catch (error) {
    return { error };
  }
};
