import {
  finishTransactionStatus,
  updateTransactionReview,
  updateTransactionStatus,
} from "@/server/transaction_action";
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

type ButtonModalProps = {
  transactionId: string;
};

const FormDataSchema = z.object({
  id: z.string({ invalid_type_error: "Gagal memilih transaksi" }).min(1),
  review: z.string().min(1, { message: "Silahkan isi Ulasan anda" }),
});

type Inputs = z.infer<typeof FormDataSchema>;

export default function ButtonModalAccept({ transactionId }: ButtonModalProps) {
  const { onClose, isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isloading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    "Mentor Berhalangan pada Jadwal yang diminta"
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      id: transactionId,
      review: "",
    },
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      await finishTransactionStatus(data?.id, "Selesai", data?.review);
      toast("Berhasil Menyelesaikan Mentoring");
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  function finishTransaction(transactionId: string) {
    return (event: React.MouseEvent) => {
      updateTransactionStatus(transactionId, "Selesai", "");
      event.preventDefault();
    };
  }

  return (
    <Fragment>
      <Button
        isIconOnly
        className="w-full font-semibold hover:opacity-75"
        size="sm"
        radius="sm"
        color="success"
        onClick={onOpen}
        endContent={<MdDone className="text-lg text-black" />}
      >
        Selesaikan Pesanan
      </Button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        hideCloseButton
      >
        {/* PASS isOpen STATE FROM  useDisclosure HOOK*/}
        <form onSubmit={handleSubmit(processForm)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Selesaikan Mentoring</ModalHeader>
                <ModalBody className="gap-2 font-semibold text-justify">
                  <div>
                    <p>Apakah anda yakin ingin menyelesaikan pesanan?</p>
                    <p>
                      Coin akan diteruskan kepada mentor apabila pesanan Selesai
                    </p>
                  </div>
                  <Input
                    type="text"
                    label="Berikan Ulasan terhadap performa Mentor"
                    isInvalid={errors.review ? true : false}
                    errorMessage={errors.review && errors.review.message}
                    {...register("review", { required: true })}
                    className="w-full"
                    classNames={{
                      label: "text-sm",
                      input: "text-sm font-semibold",
                    }}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    isLoading={isloading}
                    color="danger"
                    onPress={onClose}
                    className="font-semibold text-black"
                  >
                    {/* PASS  onClose FUNCTION TO onPress EVENT LISTENER*/}
                    Batalkan
                  </Button>
                  <Button
                    isLoading={isloading}
                    type="submit"
                    color="success"
                    className="font-semibold text-black"
                  >
                    {/* PASS  onClose OR ANY OTHER FUNCTION TO onPress EVENT LISTENER*/}
                    Selesaikan
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
