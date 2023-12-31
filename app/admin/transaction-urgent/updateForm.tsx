import React, { Fragment, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { toast } from "sonner";

import { SiGooglemeet } from "react-icons/si";
import { updateTransactionLocationDetail } from "@/server/transaction_action";

type UpdateFormProps = {
  id: string;
};

const FormDataSchema = z.object({
  id: z.string({ invalid_type_error: "Gagal memilih transaksi" }).min(1),
  location_detail: z
    .string()
    .min(1, { message: "Silahkan isi link Google Meet" }),
});

export type TransactionDetailType = z.infer<typeof FormDataSchema>;

export default function UpdateForm({ id }: UpdateFormProps) {
  const { onClose, isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isloading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TransactionDetailType>({
    defaultValues: {
      id: id,
      location_detail: "",
    },
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<TransactionDetailType> = async (data) => {
    try {
      setLoading(true);
      await updateTransactionLocationDetail(data as TransactionDetailType);
      toast("Location Detail Updated");
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Button onPress={onOpen} color="primary">
        Update Detail Lokasi
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom-center"
        backdrop="blur"
      >
        <form onSubmit={handleSubmit(processForm)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Update Detail Lokasi
                </ModalHeader>
                <ModalBody>
                  <Input
                    endContent={
                      <SiGooglemeet className="flex-shrink-0 text-2xl pointer-events-none text-default-400" />
                    }
                    label="Link Google Meet"
                    variant="bordered"
                    isInvalid={errors.location_detail ? true : false}
                    errorMessage={
                      errors.location_detail && errors.location_detail.message
                    }
                    {...register("location_detail", { required: true })}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    isLoading={isloading}
                    color="danger"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                  <Button isLoading={isloading} type="submit" color="primary">
                    Update
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
