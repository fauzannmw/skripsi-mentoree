"use client";
import { AdminchangeTransactionStatus } from "@/server/transaction_action";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Mentor, Transaction, User } from "@prisma/client";
import { Fragment, useState } from "react";
import { MdDone } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

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

  function declineTransaction(transactionId: string) {
    return (event: React.MouseEvent) => {
      AdminchangeTransactionStatus(transactionId, "Gagal");
      event.preventDefault();
    };
  }

  function acceptTransaction(transactionId: string) {
    return (event: React.MouseEvent) => {
      AdminchangeTransactionStatus(transactionId, "Berlangsung");
      event.preventDefault();
    };
  }

  function finishTransaction(transactionId: string) {
    return (event: React.MouseEvent) => {
      AdminchangeTransactionStatus(transactionId, "Selesai");
      event.preventDefault();
    };
  }

  return (
    <Fragment>
      <Card
        isBlurred
        radius="sm"
        shadow="sm"
        fullWidth
        onPress={onOpen}
        isPressable={role === "mentor" || role === "admin"}
        className="border-2 border-[#2e1065] max-w-md"
      >
        <CardHeader>
          <div className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
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
                  ? (data?.User?.email as string)
                  : (data?.mentor?.phone_number as string)}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardBody className="flex gap-2 bg-gray-200">
          <div className="flex flex-col items-start justify-center font-semibold text-start text-default-400 text-small">
            <p>
              Materi :&nbsp;<span>{data?.mentoring_topic}</span>
            </p>
            <p className="text-justify">
              Lokasi :&nbsp;
              <span>
                {data?.location}, {data?.location_detail}
              </span>
            </p>
            <p>
              Tanggal Mentoring : <span>{data?.date}</span>
            </p>
            <p>
              Jam : <span>{data?.time}</span>
            </p>
          </div>
        </CardBody>
        <CardFooter className="flex flex-col">
          <div className="grid items-center justify-between w-full grid-cols-8 gap-2">
            <div className="col-span-6">
              <h1 className="text-left text-small text-default-400">
                Status Mentoring : &nbsp;
                <span className="font-semibold">{data?.status}</span>
              </h1>
              <h1 className="text-left text-small text-default-400">
                Pesan Mentor : &nbsp;
                <span className="font-semibold">{data?.message}</span>
              </h1>
            </div>
            {data?.status === "Berlangsung" && role === "user" && (
              <Button
                isIconOnly
                className="hover:opacity-75"
                radius="full"
                color="success"
                onClick={onOpen}
              >
                <MdDone className="text-lg text-black" />
              </Button>
            )}
            {data?.status === "Belum diterima Mentor" && role === "mentor" && (
              <div className="flex gap-2 sm:gap-4">
                <Button
                  isIconOnly
                  className="hover:opacity-75"
                  radius="full"
                  color="danger"
                  onClick={declineTransaction(data?.id)}
                >
                  <IoMdClose className="text-lg text-black" />
                </Button>
                <Button
                  isIconOnly
                  className="hover:opacity-75"
                  radius="full"
                  color="success"
                  onClick={acceptTransaction(data?.id)}
                >
                  <MdDone className="text-lg text-black" />
                </Button>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        {/* PASS isOpen STATE FROM  useDisclosure HOOK*/}
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Selesaikan Pesanan</ModalHeader>
              <ModalBody className="gap-0 font-semibold text-justify">
                <p>Apakah anda yakin ingin menyelesaikan pesanan?</p>
                <p>
                  Coin akan diteruskan kepada mentor apabila pesanan Selesai
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  onPress={onClose}
                  className="font-semibold text-black"
                >
                  {/* PASS  onClose FUNCTION TO onPress EVENT LISTENER*/}
                  Tidak
                </Button>
                <Button
                  color="success"
                  onPress={onClose}
                  onClick={finishTransaction(data?.id)}
                  className="font-semibold text-black"
                >
                  {/* PASS  onClose OR ANY OTHER FUNCTION TO onPress EVENT LISTENER*/}
                  Selesaikan
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
