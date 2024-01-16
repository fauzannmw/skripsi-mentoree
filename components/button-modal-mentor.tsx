import { MentorUpdateTransactionStatus } from "@/server/transaction_action";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { Fragment, useState } from "react";
import { MdDone } from "react-icons/md";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { toast } from "sonner";
import { IoMdClose } from "react-icons/io";

type ButtonModalProps = {
  transactionId: string;
  status: string;
};

const FormDataSchema = z.object({
  id: z.string({ invalid_type_error: "Gagal memilih transaksi" }).min(1),
  message: z.string().min(1, { message: "Isi pesan Mentoring" }),
});

type Inputs = z.infer<typeof FormDataSchema>;

export default function ButtonModalMentor({
  transactionId,
  status,
}: ButtonModalProps) {
  const { onClose, isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isloading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      id: transactionId,
      message: "",
    },
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      await MentorUpdateTransactionStatus(data?.id, status, data?.message);

      status === "Berlangsung" && toast("Berhasil Menerima Mentoring");
      status === "Gagal" && toast("Berhasil Menolak Mentoring");

      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Button
        className="w-full font-semibold hover:opacity-75"
        isIconOnly
        fullWidth
        color={status === "Berlangsung" ? "success" : "danger"}
        onClick={onOpen}
      >
        {status === "Berlangsung" ? (
          <MdDone className="text-lg text-black" />
        ) : (
          <IoMdClose className="text-lg text-black" />
        )}
      </Button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        hideCloseButton
      >
        <form onSubmit={handleSubmit(processForm)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  {status === "Berlangsung"
                    ? "Terima permintaan Mentoring"
                    : "Tolak permintaan Mentoring"}
                </ModalHeader>
                <ModalBody className="font-semibold text-justify">
                  {status === "Berlangsung" ? (
                    <Input
                      type="text"
                      label="Berikan pesan kepada Mentee"
                      isInvalid={errors.message ? true : false}
                      errorMessage={errors.message && errors.message.message}
                      {...register("message", { required: true })}
                      className="w-full"
                      classNames={{
                        label: "text-sm",
                        input: "text-sm font-semibold",
                      }}
                    />
                  ) : (
                    <Input
                      type="text"
                      label="Alasan penolakan"
                      isInvalid={errors.message ? true : false}
                      errorMessage={errors.message && errors.message.message}
                      {...register("message", { required: true })}
                      className="w-full"
                      classNames={{
                        label: "text-sm",
                        input: "text-sm font-semibold",
                      }}
                    />
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button
                    isLoading={isloading}
                    color="danger"
                    onPress={onClose}
                    className="font-semibold text-black"
                  >
                    Batalkan
                  </Button>
                  <Button
                    isLoading={isloading}
                    type="submit"
                    color="success"
                    className="font-semibold text-black"
                  >
                    {status === "Berlangsung"
                      ? "Terima Mentoring"
                      : "Tolak Mentoring"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </Fragment>
  );
}
