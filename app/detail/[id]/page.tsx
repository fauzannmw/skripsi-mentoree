import { getMentorById } from "@/server/get_action";
import { Image } from "@nextui-org/image";
import { Button, Link } from "@nextui-org/react";
import { Mentor } from "@prisma/client";
import { BsCoin, BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";

interface MentorExtends extends Mentor {
  course: [{ course: string }];
  course_day: [
    {
      day: string;
      time: string;
    }
  ];
  mentoring_location: [
    {
      location: string;
    }
  ];
  experience: [
    {
      position: string;
      company: string;
    }
  ];
  certification: [
    {
      course: string;
      institution: string;
    }
  ];
}

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const mentorData = (await getMentorById(params.id))
    .detail as unknown as MentorExtends;

  const courses = mentorData?.course;
  const courses_day = mentorData?.course_day;
  const experience = mentorData?.experience;
  const certification = mentorData?.certification;

  return (
    <div className="flex flex-col flex-wrap items-center justify-center gap-4 mx-auto">
      <div className="flex items-center justify-center">
        {mentorData?.image ? (
          <Image
            alt="mentor-image"
            className="object-cover object-center w-48 h-48 border border-gray-200 rounded sm:w-72 sm:h-72"
            src={mentorData?.image}
          />
        ) : (
          <Image
            alt="mentor-image"
            className="object-cover object-center border border-gray-200 rounded w-72 h-72"
            src="https://images.unsplash.com/photo-1518288774672-b94e808873ff?q=80&w=2718&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        )}
      </div>
      <div className="flex flex-col w-full gap-4 lg:w-1/2 lg:py-6 lg:mt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-sm tracking-widest text-gray-500 ">
              {mentorData?.major}
            </h1>
            <h1 className="mb-1 font-medium sm:text-3xl ">
              {mentorData?.name}
            </h1>
          </div>
          <button className="inline-flex items-center justify-center p-3 ml-4 text-gray-500 bg-gray-200 border-0 rounded-full">
            {mentorData?.gender == "Laki Laki" ? (
              <BsGenderMale />
            ) : (
              <BsGenderFemale />
            )}
          </button>
        </div>
        <div className="border-t border-bg-gray-300">
          <h1 className="mb-2 text-xl font-bold dark:text-gray-400">
            Deskripsi Diri
          </h1>
          <p className="leading-relaxed">
            Fam locavore kickstarter distillery. Mixtape chillwave tumeric
            sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
            juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
            seitan poutine tumeric. Gastropub blue bottle austin listicle
            pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.
          </p>
        </div>
        <div className="py-3 border-t border-bg-gray-300 dark:border-gray-700">
          <h1 className="mb-2 text-xl font-bold dark:text-gray-400">
            Bahasa Pemrograman
          </h1>
          <div className="flex flex-wrap -mb-2">
            {courses?.map((course, index) => (
              <button
                key={index}
                className="px-2 py-1 mb-2 mr-1 border hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400"
              >
                {course?.course}
              </button>
            ))}
          </div>
        </div>
        <div className="py-3 border-t border-gray-300 dark:border-gray-700">
          <h1 className="mb-2 text-xl font-bold dark:text-gray-400">
            Hari Mengajar
          </h1>
          <div className="flex flex-wrap -mb-2">
            {courses_day?.map((course_day, index) => (
              <button
                key={index}
                className="px-2 py-1 mb-2 mr-1 border hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400"
              >
                {course_day?.day}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 py-3 border-t border-gray-300 dark:border-gray-700">
          <h1 className="text-xl font-bold dark:text-gray-400">
            Waktu Persiapan Mentor
          </h1>
          <div className="flex items-center gap-2 px-2 py-1 border border-gray-900 rounded">
            <span>
              <RiErrorWarningLine />
            </span>
            <p className="text-sm">
              Pemesanan Mentor kurang dari waktu persiapan berisiko ditolak.
            </p>
          </div>
          <Button size="sm" className="font-semibold w-fit">
            1 Hari
          </Button>
        </div>
        <div className="flex flex-col gap-4 py-3 border-t border-gray-300 dark:border-gray-700">
          <h1 className="text-xl font-bold dark:text-gray-400">
            Rekomendasi Jadwal Mentoring
          </h1>
          <div className="flex items-center gap-2 px-2 py-1 border border-gray-900 rounded">
            <span>
              <RiErrorWarningLine />
            </span>
            <p className="text-sm">
              Pemesanan Mentor di luar jadwal rekomendasi berisiko ditolak.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {/* @ts-ignore */}
            {courses_day.map((course_day, index: number) => (
              <div key={index} className="flex gap-4">
                <Button size="sm" className="font-semibold w-fit">
                  {course_day?.day}
                </Button>
                <Button size="sm" className="font-semibold w-fit">
                  13.00 - 14.00
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="py-3 border-t border-gray-300 dark:border-gray-700">
          <h1 className="mb-2 text-xl font-bold dark:text-gray-400">
            Pengalaman Kerja & Organisasi
          </h1>
          <div className="flex flex-col flex-wrap font-semibold">
            {experience?.map(
              (experience, index: number) =>
                experience.company &&
                experience?.company && (
                  <li key={index}>
                    {experience?.position}
                    <ol className="space-y-1 font-normal ps-6">
                      {experience?.company}
                    </ol>
                  </li>
                )
            )}
          </div>
        </div>
        <div className="py-3 border-t border-gray-300 dark:border-gray-700">
          <h1 className="mb-2 text-xl font-bold dark:text-gray-400">
            Sertifikasi
          </h1>
          <div className="flex flex-col flex-wrap font-semibold">
            {certification?.map(
              (certification, index: number) =>
                certification?.course &&
                certification?.institution && (
                  <li key={index}>
                    {certification?.course}
                    <ol className="space-y-1 font-normal ps-6">
                      {certification?.institution}
                    </ol>
                  </li>
                )
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <p className="flex items-center text-2xl font-medium text-gray-900 gap-x-1 ">
            1&nbsp;
            <span>
              <BsCoin />
            </span>
          </p>
          <Link href={`/checkout/${mentorData?.id}`} className="">
            <Button className="font-sans text-sm font-semibold text-white bg-gray-900 rounded-lg">
              Pesan Sekarang
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
