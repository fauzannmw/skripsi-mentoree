import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const MENTOR = [
  {
    nim: "205150200111037",
    name: "Fauzan",
    major: "Teknologi Informasi",
    phone_number: "082221120018",
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    course: "Typescript, Next Js",
    course_day: "Monday",
  },
  {
    nim: "205150200111038",
    name: "Faza",
    major: "Teknik Informatika",
    phone_number: "081271960553",
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    course: "Kotlin, Java, Flutter",
    course_day: "Monday",
  },
];
function seedMentor() {
  Promise.all(
    MENTOR.map((item) =>
      prisma.mentor.create({
        data: {
          nim: item.nim,
          name: item.name,
          major: item.major,
          phone_number: item.phone_number,
          image: item.image,
          course: item.course,
          course_day: item.course_day,
        },
      })
    )
  )
    .then(() => console.info("[SEED] Succussfully create mentor records"))
    .catch((e) => console.error("[SEED] Failed to create mentor records", e));
}

seedMentor();

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// async function main() {
//   const alice = await prisma.mentor.upsert({
//     where: { email: "alice@prisma.io" },
//     update: {},
//     create: {
//       email: "alice@prisma.io",
//       name: "Alice",
//       posts: {
//         create: {
//           title: "Check out Prisma with Next.js",
//           content: "https://www.prisma.io/nextjs",
//           published: true,
//         },
//       },
//     },
//   });
//   const bob = await prisma.mentor.upsert({
//     where: { email: "bob@prisma.io" },
//     update: {},
//     create: {
//       email: "bob@prisma.io",
//       name: "Bob",
//       posts: {
//         create: [
//           {
//             title: "Follow Prisma on Twitter",
//             content: "https://twitter.com/prisma",
//             published: true,
//           },
//           {
//             title: "Follow Nexus on Twitter",
//             content: "https://twitter.com/nexusgql",
//             published: true,
//           },
//         ],
//       },
//     },
//   });
//   console.log({ alice, bob });
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
