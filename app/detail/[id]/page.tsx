import { getMentorById } from "@/server/get_action";
import { Image } from "@nextui-org/image";
import { Button, Link } from "@nextui-org/react";
import { BsCoin, BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";

// @ts-ignore
export default async function DetailPage({ params }) {
  const mentorData = await getMentorById(params.id);
  const courses = mentorData?.detail?.course;
  const courses_day = mentorData?.detail?.course_day;
  const experience = mentorData?.detail?.experience;
  const certification = mentorData?.detail?.certification;

  return (
    <div className="flex flex-col flex-wrap gap-4 mx-auto">
      <div className="flex items-center justify-center">
        {mentorData?.detail?.image ? (
          <Image
            alt="mentor-image"
            className="object-cover object-center border border-gray-200 rounded w-72 h-72"
            src={mentorData?.detail?.image}
          />
        ) : (
          <Image
            alt="mentor-image"
            src="https://images.unsplash.com/photo-1518288774672-b94e808873ff?q=80&w=2718&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        )}
      </div>
      <div className="flex flex-col w-full gap-4 lg:w-1/2 lg:py-6 lg:mt-0">
        <div className="">
          <h1 className="text-sm tracking-widest text-gray-500 ">
            {mentorData?.detail?.major}
          </h1>
          <div className="flex justify-between">
            <h1 className="mb-1 text-3xl font-medium text-gray-900 ">
              {mentorData?.detail?.name}
            </h1>
            <button className="inline-flex items-center justify-center p-3 ml-4 text-gray-500 bg-gray-200 border-0 rounded-full">
              {mentorData?.detail?.gender == "Laki Laki" ? (
                <BsGenderMale />
              ) : (
                <BsGenderFemale />
              )}
            </button>
          </div>
        </div>
        {/* <div className="flex mb-4">
          <span className="flex items-center">
            <svg
              fill="currentColor"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 text-red-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg
              fill="currentColor"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 text-red-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg
              fill="currentColor"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 text-red-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg
              fill="currentColor"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 text-red-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 text-red-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="ml-3 text-gray-600">5 Reviews</span>
          </span>
        </div> */}
        <div>
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
            {experience?.map((experience, index: number) => (
              <li key={index}>
                {experience?.position}
                <ol className="space-y-1 font-normal ps-6">
                  {experience?.company}
                </ol>
              </li>
            ))}
          </div>
        </div>
        <div className="py-3 border-t border-gray-300 dark:border-gray-700">
          <h1 className="mb-2 text-xl font-bold dark:text-gray-400">
            Sertifikasi
          </h1>
          <div className="flex flex-col flex-wrap font-semibold">
            {certification?.map((certification, index: number) => (
              <li key={index}>
                {certification?.course}
                <ol className="space-y-1 font-normal ps-6">
                  {certification?.institution}
                </ol>
              </li>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <p className="flex items-center text-2xl font-medium text-gray-900 gap-x-1 ">
            1&nbsp;
            <span>
              <BsCoin />
            </span>
          </p>
          <Link href={`/checkout/${mentorData?.detail?.id}`} className="">
            <Button className="font-sans text-sm font-semibold text-white bg-gray-900 rounded-lg">
              Pesan Sekarang
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
