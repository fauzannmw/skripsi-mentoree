import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const fauzan = await prisma.mentor.upsert({
    where: { nim: "205150200111040" },
    update: {},
    create: {
      nim: "205150200111037",
      email: "fauzan@student.ub.ac.id",
      name: "Muhamad Fauzan",
      major: "Teknologi Informasi",
      phone_number: "082221120018",
      image:
        "https://images.unsplash.com/photo-1518288774672-b94e808873ff?q=80&w=2718&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      gender: "Laki Laki",
      description:
        "Their faces were red and weather-blasted below their white foreheads, the coarse hair on their round heads grown iron-gray and as stiff as the roached mane of a horse.",
      course: {
        create: [
          {
            course: "Typescript",
          },
          {
            course: "Next Js",
          },
        ],
      },
      course_day: {
        create: [
          {
            day: "Senin",
            time: "13.00 - 14.00",
          },
          {
            day: "Selasa",
            time: "13.00 - 14.00",
          },
        ],
      },
      experience: {
        create: [
          {
            position: "Internship Front-end Developer",
            company: "MAW Company",
          },
        ],
      },
      certification: {
        create: [
          {
            course: "React and React Native Intermediate",
            institution: "Dicoding Indonesia",
          },
        ],
      },
    },
  });
  const faza = await prisma.mentor.upsert({
    where: { nim: "205150200111041" },
    update: {},
    create: {
      nim: "205150200111038",
      email: "faza@student.ub.ac.id",
      name: "Muhammad Faza",
      major: "Teknik Informatika",
      phone_number: "082221120019",
      image:
        "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=3230&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      gender: "Laki Laki",
      description:
        "Their faces were red and weather-blasted below their white foreheads, the coarse hair on their round heads grown iron-gray and as stiff as the roached mane of a horse.",
      course: {
        create: [
          {
            course: "Dart",
          },
          {
            course: "Flutter",
          },
        ],
      },
      course_day: {
        create: [
          {
            day: "Selasa",
            time: "13.00 - 14.00",
          },
          {
            day: "Rabu",
            time: "13.00 - 14.00",
          },
        ],
      },
      experience: {
        create: [
          {
            position: "Internship Mobile Developer",
            company: "MAW Company",
          },
        ],
      },
      certification: {
        create: [
          {
            course: "Flutter Intermediate",
            institution: "Dicoding Indonesia",
          },
        ],
      },
    },
  });
  const xavier = await prisma.mentor.upsert({
    where: { nim: "205150200111042" },
    update: {},
    create: {
      nim: "205150200111039",
      email: "xavier@student.ub.ac.id",
      name: "Xavier Julian",
      major: "Teknik Elektro",
      phone_number: "082221120020",
      image:
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=3243&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      gender: "Perempuan",
      description:
        "Their faces were red and weather-blasted below their white foreheads, the coarse hair on their round heads grown iron-gray and as stiff as the roached mane of a horse.",

      course: {
        create: [
          {
            course: "Kotlin",
          },
          {
            course: "Jetpack Compose",
          },
        ],
      },
      course_day: {
        create: [
          {
            day: "Rabu",
            time: "13.00 - 14.00",
          },
          {
            day: "Kamis",
            time: "13.00 - 14.00",
          },
        ],
      },
      experience: {
        create: [
          {
            position: "Internship Android Developer",
            company: "MAW Company",
          },
        ],
      },
      certification: {
        create: [
          {
            course: "Kotlin Intermediate",
            institution: "Dicoding Indonesia",
          },
        ],
      },
    },
  });
  console.log({ fauzan, faza, xavier });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
