"use client";
import ButtonModalMentee from "@/components/button-modal-mentee";
import ButtonModalMentor from "@/components/button-modal-mentor";
import { Avatar, Button, Link, useDisclosure } from "@nextui-org/react";
import { Mentor, Transaction, User } from "@prisma/client";
import { Fragment } from "react";
import { IoLogoWhatsapp } from "react-icons/io";

interface TransactionExtends extends Transaction {
  User: User;
  mentor: Mentor;
  error: unknown;
}

type CardProps = {
  data: TransactionExtends;
  role: string;
};

export default function MentoringCardComponent({ data, role }: CardProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function phoneParse(phone_number: string) {
    return phone_number.replace(/^0+/, "");
  }

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <Fragment>
      <div className="flex flex-col w-full gap-4 px-6 py-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="grid grid-cols-7">
          <div className="col-span-1">
            <Avatar
              isBordered
              radius="md"
              size="md"
              src={
                role === "mentor"
                  ? (data?.User?.image as string)
                  : (data?.mentor?.image as string)
              }
            />
          </div>
          <div className="flex flex-col items-start justify-center col-span-5 gap-1">
            <h1 className="font-semibold leading-none text-small text-default-600">
              {role === "mentor"
                ? (data?.User?.name as string)
                : (data?.mentor?.name as string)}
            </h1>
            <p
              className="px-3 text-sm text-gray-500 bg-white border border-gray-200 rounded-md py-0.5"
            >
              {role === "mentor"
                ? data?.User?.phone_number
                  ? data?.User?.phone_number
                  : data?.User?.email
                : (data?.mentor?.phone_number as string)}
            </p>
          </div>

          <div className="flex flex-col items-end justify-center col-span-1 gap-1">
            <Link
              isExternal
              href={`https://api.whatsapp.com/send?phone=62${phoneParse(
                role === "mentor"
                  ? (data?.User?.phone_number as string)
                  : (data?.mentor?.phone_number as string)
              )}`}
            >
              <Button
                isIconOnly
                className="hover:opacity-75"
                radius="full"
                variant="light"
                onClick={onOpen}
              >
                <IoLogoWhatsapp className="text-2xl text-green-600" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <p>Materi</p>
            <p className="font-medium ">{data?.mentoring_topic}</p>
          </div>
          <div className="flex items-center justify-between text-sm">
            <p>Lokasi</p>
            <p className="font-medium ">
              {data?.location_detail && data?.location === "Daring" && (
                <Link
                  isExternal
                  href={`https://${data?.location_detail}`}
                  className="text-small"
                >
                  Link Google Meet (Gunakan Gmail UB)
                </Link>
              )}
              {data?.location_detail &&
                data?.location === "Luring" &&
                data?.location_detail}
            </p>
          </div>
          <div className="flex items-center justify-between text-sm">
            <p>Tanggal</p>
            <p className="font-medium ">
              {/* @ts-ignore */}
              {data?.date && data?.date.toLocaleDateString("id-ID", options)}
            </p>
          </div>
          <div className="flex items-center justify-between text-sm">
            <p>Waktu</p>
            <p className="font-medium ">{data?.time}</p>
          </div>
          <div className="flex items-center justify-between pt-4 text-sm border-t border-gray-200">
            <p>Pesan</p>
            <p className="font-medium ">{data?.message}</p>
          </div>
          <div className="flex items-center justify-between py-4 text-sm border-gray-200 border-y">
            <p>Status Mentoring</p>
            <p className="font-medium ">{data?.status}</p>
          </div>
        </div>

        <div className="col-span-4">
          {data?.status === "Berlangsung" && role === "user" && (
            <div className="flex">
              <ButtonModalMentee transactionId={data?.id} />
            </div>
          )}
          {data?.status === "Menunggu" && role === "mentor" && (
            <div className="flex justify-between w-full gap-2 sm:gap-4">
              <ButtonModalMentor transactionId={data?.id} status="Gagal" />
              <ButtonModalMentor
                transactionId={data?.id}
                status="Berlangsung"
              />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
