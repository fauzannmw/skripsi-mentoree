import { getMentorById } from "@/server/get_action";
import { changeTransactionStatus } from "@/server/transaction_action";
import { Button, Image } from "@nextui-org/react";
import { Transaction } from "@prisma/client";
import { CiCalendarDate } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";

interface CardProps {
  data: Transaction;
}

export default async function Card({ data }: CardProps) {
  const mentorData = (await getMentorById(data?.id as string)).detail;

  return (
    <form action={changeTransactionStatus} method="POST">
      <input
        type="text"
        className="sr-only peer"
        name="transactionId"
        value={data?.id}
      />
      <div className="flex flex-col gap-4 p-4 bg-gray-200 rounded-md">
        <div className="flex gap-6 font-semibold">
          <Image
            className="object-cover object-center w-20 h-20"
            alt="mentor-image"
            src={mentorData?.image as string}
          />
          <div className="flex flex-col justify-center">
            <div className="flex gap-2">
              <p>
                Nomor Whatsapp Mentor : <span>{mentorData?.phone_number}</span>
              </p>
            </div>
            <p>{mentorData?.name}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4 bg-white rounded-md">
          <div>
            <p className="font-semibold">Waktu dan Tanggal Mentoring</p>
            <div className="grid grid-cols-2">
              <p className="flex items-center gap-4">
                <span>
                  <CiCalendarDate />
                </span>
                {data?.date}
              </p>
              <p className="flex items-center gap-4">
                <span>
                  <IoMdTime />
                </span>
                {data?.time}
              </p>
            </div>
          </div>
          <div>
            <p className="font-semibold">Lokasi Mentoring</p>
            <div className="grid grid-cols-2">
              <p className="flex items-center gap-4">{data.location}</p>
            </div>
          </div>
          <div>
            <p className="font-semibold">Partisipan Mentoring</p>
            <div className="grid grid-cols-2">
              <p className="flex items-center gap-4">{data?.participant}</p>
            </div>
          </div>
          <div className="w-full">
            <p className="font-semibold">Topik Materi</p>
            <div className="grid w-full grid-cols-2">
              <p className="flex items-center gap-4">{data?.mentoring_topic}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          {data?.status === "Berlangsung" && (
            <Button className="w-2/3" type="submit">
              Selesaikan Pesanan
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
