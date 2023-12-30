"use client";
import { Image } from "@nextui-org/react";
import { Course, Day, Mentor } from "@prisma/client";

type TableProps = {
  mentor: Mentor;
};

interface MentorExtends extends Mentor {
  course: Course[];
  course_day: Day[];
}

export default function Table({ mentor }: TableProps) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border border-collapse table-auto">
        <thead className="">
          <tr className="text-base font-bold text-center border-b-2 border-blue-500 bg-gray-50">
            <th className="px-4 py-3 border-b-2 border-blue-500">Id</th>
            <th className="px-4 py-3 border-b-2 border-blue-500">
              Data Mentor
            </th>
            <th className="px-4 py-3 border-b-2 border-blue-500">Email</th>
            <th className="px-4 py-3 border-b-2 border-blue-500">
              Nomor Ponsel
            </th>
            <th className="px-4 py-3 border-b-2 border-blue-500">
              Jenis Kelamin
            </th>
            <th className="px-4 py-3 border-b-2 border-blue-500">
              Program Studi
            </th>
            <th className="px-4 py-3 border-b-2 border-blue-500">
              Bahasa Pemrograman
            </th>
            <th className="px-4 py-3 border-b-2 border-blue-500">
              Jadwal Mentoring
            </th>
            <th className="px-4 py-3 border-b-2 border-blue-500">Deskripsi</th>
          </tr>
        </thead>
        <tbody className="text-sm font-normal text-gray-700">
          {mentor instanceof Array &&
            mentor?.map((mentor: MentorExtends, index: number) => (
              <tr
                key={index}
                className="py-10 text-center border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="px-4 py-4">
                  <p>{mentor?.id}</p>
                </td>
                <td className="px-4 py-4 text-start">
                  <div className="flex flex-row items-center justify-center gap-4">
                    <div className="flex w-10 h-10">
                      <Image
                        alt="profil"
                        src={mentor?.image ? mentor?.image : ""}
                        className="object-cover w-10 h-10 mx-auto rounded-md"
                      />
                    </div>
                    <div className="flex-1 w-48 pl-1">
                      <p className="font-medium dark:text-white">
                        {mentor?.name}
                      </p>
                      <p className="text-sm">{mentor?.nim}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <p className="w-48">{mentor?.email}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="w-32">{mentor?.phone_number}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="w-32">{mentor?.gender}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="w-32">{mentor?.major}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="w-32">{mentor?.course[0].course}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="w-32">
                    {mentor?.course_day[0].day} - {mentor?.course_day[0].time}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <p className="w-48">{mentor?.description}</p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
