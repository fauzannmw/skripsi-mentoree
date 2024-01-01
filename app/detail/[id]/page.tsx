import { getMentorById } from "@/server/get_action";
import { Image } from "@nextui-org/image";
import { Button, Link, Snippet } from "@nextui-org/react";
import { Mentor } from "@prisma/client";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";

interface MentorExtends extends Mentor {
  course: [{ course: string }];
  course_day: [
    {
      day: string;
      time: string;
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
  const experience = mentorData?.experience;
  const certification = mentorData?.certification;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Detail Mentor</h2>
        <Snippet
          size="sm"
          color="primary"
          variant="solid"
          hideSymbol
          codeString={`https://mentoree.vercel.app/detail/${mentorData?.id}`}
          classNames={{
            content: "font-semibold",
          }}
        >
          Bagikan Profil Mentor
        </Snippet>
      </div>
      <div className="flex flex-col w-full gap-4 px-4 py-6 mt-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-black">
        <div className="flex items-center justify-center">
          <div className="flex-shrink-0 w-48 h-48">
            <Image
              src={mentorData?.image as string}
              alt="mentor-image"
              className="object-cover object-center w-48 h-48 rounded-md"
            />
          </div>
        </div>
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between">
            <div className="flex flex-col flex-1">
              <h1 className="text-sm tracking-widest text-gray-500 ">
                {mentorData?.major}
              </h1>
              <h1 className="text-sm">
                <Link
                  href={`/detail/${mentorData?.id}`}
                  className="font-medium text-gray-700 hover:text-gray-800"
                >
                  {mentorData?.name}
                </Link>
              </h1>
            </div>
            <div className=" bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500">
              <span className="sr-only">Gender</span>
              {mentorData?.gender === "Laki Laki" ? (
                <BsGenderMale />
              ) : (
                <BsGenderFemale />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 py-2 border-t border-gray-200 border-bg-gray-300">
          <div className="flex flex-col text-sm">
            <h1 className="font-medium dark:text-gray-400">Deskripsi Diri</h1>
            <p className="text-sm leading-relaxed">{mentorData?.description}</p>
          </div>
          <div className="flex items-center justify-between text-sm">
            <p>Bahasa Pemrograman</p>
            <div className="flex gap-2">
              {mentorData?.course?.map((course, index) => (
                <p
                  key={index}
                  className="px-3 text-sm text-gray-500 bg-white border border-gray-200 rounded-md py-0.5"
                >
                  {course?.course}
                </p>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <p>Hari Mengajar</p>
            <p className="font-medium ">
              {mentorData?.course_day?.map((day, index) => (
                <span key={index}>{day?.day}</span>
              ))}
            </p>
          </div>
          <div className="flex items-center justify-between text-sm">
            <p>Sesi</p>
            <p className="font-medium ">
              {mentorData?.course_day?.map((time, index) => (
                <span key={index}>{time?.time}</span>
              ))}
            </p>
          </div>
          <div className="pt-3 text-sm border-t border-gray-300 dark:border-gray-700">
            <h1 className="mb-2 font-medium dark:text-gray-400">
              Pengalaman Kerja & Organisasi
            </h1>
            <div className="flex flex-col flex-wrap">
              {experience?.map(
                (experience, index: number) =>
                  experience.company &&
                  experience?.company && (
                    <li key={index}>
                      {experience?.position} -&nbsp;
                      <span>{experience?.company}</span>
                    </li>
                  )
              )}
            </div>
          </div>
          <div className="pb-3 text-sm border-b border-gray-300 dark:border-gray-700">
            <h1 className="mb-2 font-medium dark:text-gray-400">Sertifikasi</h1>
            <div className="flex flex-col flex-wrap">
              {certification?.map(
                (certification, index: number) =>
                  certification?.course &&
                  certification?.institution && (
                    <li key={index}>
                      {certification?.course} -&nbsp;
                      <span>{certification?.institution}</span>
                    </li>
                  )
              )}
            </div>
          </div>
        </div>
        <div>
          <Button
            href={`/checkout/${mentorData?.id}`}
            as={Link}
            type="button"
            color="primary"
            radius="sm"
            className="w-full text-sm font-semibold"
          >
            Pesan Mentoring
          </Button>
        </div>
      </div>
    </div>
  );
}
