"use client";

import { Mentor, User } from "@prisma/client";
import { Image } from "@nextui-org/image";
import { Fragment } from "react";
import { Button } from "@nextui-org/button";
import { RiErrorWarningLine } from "react-icons/ri";

export interface FormProps {
  data: Mentor;
  user: User;
}

export default function Detail({ data, user }: FormProps) {
  console.log(user);

  return (
    <Fragment>
      <div className="flex flex-col gap-4 p-4 ">
        <div className="flex gap-6 font-semibold">
          <Image className="w-20" alt="mentor-image" src={data?.image ?? ""} />
          <div className="flex flex-col justify-between">
            <div className="flex gap-2">
              {/* @ts-ignore */}
              {data?.course.map((course, index: number) => (
                <Button size="sm" className="font-semibold" key={index}>
                  {course?.course}
                </Button>
              ))}
            </div>
            <p>{data?.name}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">Waktu Persiapan Mentor</p>
          <div className="flex items-center gap-2 px-2 py-1 border border-gray-900 rounded">
            <span>
              <RiErrorWarningLine />
            </span>
            <p>
              Pemesanan Mentor di kurang dari waktu persiapan berisiko ditolak.
            </p>
          </div>
          <Button size="sm" className="font-semibold w-fit">
            1 Hari
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">Rekomendasi Jadwal Mentoring</p>
          <div className="flex items-center gap-2 px-2 py-1 border border-gray-900 rounded">
            <span>
              <RiErrorWarningLine />
            </span>
            <p>Pemesanan Mentor di luar jadwal rekomendasi berisiko ditolak.</p>
          </div>
          <div className="flex flex-col gap-1">
            {/* @ts-ignore */}
            {data?.course_day.map((course_day, index: number) => (
              <p className="" key={index}>
                {course_day?.day}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">
            Saldo Mentoree Coin : {user?.coin}
          </p>
        </div>
      </div>
      
    </Fragment>
  );
}
