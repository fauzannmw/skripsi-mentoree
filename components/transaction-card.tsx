"use client";
import { AdminchangeTransactionStatus } from "@/server/transaction_action";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
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
};

export default function TransactionCardComponent({ data }: CardProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function declineTransaction(transactionId: string) {
    return (event: React.MouseEvent) => {
      console.log(transactionId);
      AdminchangeTransactionStatus(transactionId, "Gagal");
      event.preventDefault();
    };
  }

  function acceptTransaction(transactionId: string) {
    return (event: React.MouseEvent) => {
      console.log(transactionId);
      AdminchangeTransactionStatus(transactionId, "Berjalan");
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
        isPressable={true}
        className="border-2 border-[#2e1065] max-w-md"
      >
        <CardHeader>
          <div className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src={data?.User?.image}
            />
            <div className="flex flex-col items-start justify-center gap-1">
              <h1 className="font-semibold leading-none text-small text-default-600">
                {data?.User?.name}
              </h1>
              <p className="tracking-tight text-small text-default-400">
                {data?.User?.email}
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
        <CardFooter>
          <div className="grid items-center justify-between w-full grid-cols-8 gap-2">
            <h1 className="col-span-6 text-left text-small text-default-400">
              Status Mentoring : &nbsp;
              <span className="font-semibold">{data?.status}</span>
            </h1>
            {data?.status === "Belum diterima Mentor" && (
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
              <ModalHeader>MODAL HEADER</ModalHeader>
              <ModalBody>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Expedita, officiis?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {/* PASS  onClose FUNCTION TO onPress EVENT LISTENER*/}
                  CLOSE
                </Button>
                <Button color="success" variant="light" onPress={onClose}>
                  {/* PASS  onClose OR ANY OTHER FUNCTION TO onPress EVENT LISTENER*/}
                  ACCEPT
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
