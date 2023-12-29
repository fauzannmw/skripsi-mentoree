"use client";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { Mentor, Transaction, User } from "@prisma/client";
import { IoLogoWhatsapp } from "react-icons/io";
import ButtonModalMentee from "./button-modal-mentee";
import ButtonModalMentor from "./button-modal-mentor";

interface TransactionExtends extends Transaction {
  User: User;
  mentor: Mentor;
  error: unknown;
}

type CardProps = {
  data: TransactionExtends;
  role: string;
};

export default function TransactionCardComponent({ data, role }: CardProps) {
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
    <Card
      isBlurred
      radius="sm"
      shadow="sm"
      fullWidth
      onPress={onOpen}
      // isPressable={role === "mentor" || role === "admin"}
      className="max-w-md "
    >
      <CardHeader className="flex items-center justify-between">
        <div className="flex gap-5">
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
          <div className="flex flex-col items-start justify-center gap-1">
            <h1 className="font-semibold leading-none text-small text-default-600">
              {role === "mentor"
                ? (data?.User?.name as string)
                : (data?.mentor?.name as string)}
            </h1>
            <p className="tracking-tight text-small text-default-400">
              {role === "mentor"
                ? data?.User?.phone_number
                  ? data?.User?.phone_number
                  : data?.User?.email
                : (data?.mentor?.phone_number as string)}
            </p>
          </div>
        </div>
        <Tooltip
          content={role === "mentor" ? "Hubungi Mentee" : "Hubungi Mentor"}
          showArrow
          placement="left"
          classNames={{
            base: ["before:bg-green-500 dark:before:bg-white"],
            content: [
              "py-2 px-4 shadow-xl",
              "text-black font-semibold bg-green-500",
            ],
          }}
        >
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
        </Tooltip>
      </CardHeader>
      <CardBody className="flex gap-2 bg-gray-200">
        <div className="flex flex-col items-start justify-center font-semibold text-start text-default-400 text-small">
          <p>
            Materi :&nbsp;<span>{data?.mentoring_topic}</span>
          </p>
          <p className="text-justify">
            Lokasi :&nbsp;
            <span>{data?.location}</span>
          </p>
          <p className="">
            Detail Lokasi :&nbsp;
            {data?.location_detail && data?.location === "Daring" && (
              <Link
                isExternal
                href={`https://${data?.location_detail}`}
                className="text-small"
              >
                Link Google Meet (Gunakan Account Gmail UB)
              </Link>
            )}
            {data?.location_detail &&
              data?.location === "Luring" &&
              data?.location_detail}
          </p>

          <p>
            Tanggal Mentoring : <span>{data?.date}</span>
          </p>
          <p>
            Jam : <span>{data?.time}</span>
          </p>
          <p>
            Jumlah peserta Mentoring : <span>{data?.participant}</span>
          </p>
          <p>
            Tanggal Pemesanan :{" "}
            <span>
              {/* @ts-ignore */}
              {(data?.createdAt).toLocaleDateString("id-ID", options)}
            </span>
          </p>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col">
        <div className="grid items-center justify-between w-full grid-cols-10 gap-2">
          <div className="col-span-6">
            <h1 className="text-left text-small text-default-400">
              Status Mentoring : &nbsp;
              <span className="font-semibold">{data?.status}</span>
            </h1>
            {data?.message && (
              <h1 className="text-left text-small text-default-400">
                Pesan dari Mentor : &nbsp;
                <span className="font-semibold">{data?.message}</span>
              </h1>
            )}
          </div>
          <div className="col-span-4">
            {data?.status === "Berlangsung" && role === "user" && (
              <div className="flex justify-end">
                <ButtonModalMentee transactionId={data?.id} />
              </div>
            )}
            {data?.status === "Menunggu" && role === "mentor" && (
              <div className="flex justify-end w-full gap-2 sm:gap-4">
                <ButtonModalMentor transactionId={data?.id} status="Gagal" />
                <ButtonModalMentor
                  transactionId={data?.id}
                  status="Berlangsung"
                />
              </div>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
