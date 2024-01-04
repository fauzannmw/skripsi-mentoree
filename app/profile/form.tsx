"use client";
import React, { useState } from "react";
import { Image } from "@nextui-org/image";
import { User } from "@prisma/client";
import { updateProfile } from "@/server/post_action";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Link } from "@nextui-org/link";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MdEmail, MdOutlinePhoneAndroid } from "react-icons/md";

import { toast } from "sonner";

export interface FormProps {
  profile: User;
}

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const FormDataSchema = z.object({
  email: z.string().min(1).email("Masukkan Email dengan Format yang Benar."),
  name: z.string().min(1),
  nim: z
    .string({
      invalid_type_error: "Masukkan Nim dengan Format yang Benar.",
      required_error: "Masukkan Nim dengan Format yang Benar",
    })
    .min(15, { message: "Masukkan Nim dengan Format yang Benar." }),
  phone_number: z
    .string({
      invalid_type_error: "Masukkan Nomor Ponsel dengan Format yang Benar.",
      required_error: "Masukkan Nomor Ponsel dengan Format yang Benar.",
    })
    .min(10, { message: "Masukkan Nomor Ponsel dengan Format yang Benar." })
    .regex(phoneRegex, "Masukkan Nomor Ponsel dengan Format yang Benar."),
  major: z
    .string({
      invalid_type_error: "Isi Program Studi Anda dengan Benar.",
      required_error: "Isi Program Studi Anda dengan Benar.",
    })
    .min(1, { message: "Isi Program Studi Anda dengan Benar." }),
});

type Inputs = z.infer<typeof FormDataSchema>;

export default function Form({ profile }: FormProps) {
  const [isloading, setLoading] = useState(false);
  const [values, setValues] = React.useState<Set<string | null> | Selection>(
    new Set([profile?.major])
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: profile?.email as string,
      name: profile?.name as string,
      nim: profile?.nim as string,
      phone_number: profile?.phone_number as string,
      major: profile?.major as string,
    },
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      await updateProfile(data as User);
      toast("Profile Updated");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(processForm)}
      className="max-w-xl mx-auto my-6 sm:my-20"
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="flex justify-center sm:col-span-2">
          <Image alt="profile-image" src={profile?.image ?? ""} />
        </div>
        <div className="flex items-center justify-between">
          <p className="block text-sm font-semibold leading-6 text-gray-900">
            Mentore Coin Kamu : {profile?.coin}
          </p>
          <Link href="/coin">
            <Button
              color="primary"
              radius="sm"
              className="w-full text-sm font-semibold"
            >
              Topup Coin
            </Button>
          </Link>
        </div>
        <div className="sm:col-span-2">
          <Input
            type="email"
            label="Email"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            isDisabled
            isInvalid={errors.email ? true : false}
            errorMessage={errors.email && errors.email.message}
            endContent={
              <MdEmail className="self-center text-2xl text-default-400" />
            }
            defaultValue={profile?.email}
            {...register("email", { required: true })}
            className="w-full text-sm font-semibold"
            classNames={{
              label: "text-sm",
              input: "text-sm font-semibold",
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            label="Nama"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            isDisabled
            isInvalid={errors.name ? true : false}
            errorMessage={errors.name && errors.name.message}
            defaultValue={profile?.name}
            {...register("name", { required: true })}
            className="w-full font-semibold "
            classNames={{
              label: "text-sm",
              input: "text-sm font-semibold",
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="number"
            placeholder="Isi Nomor Induk Mahasiswa Anda..."
            label="Nomor Induk Mahasiswa"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            min={0}
            isInvalid={errors.nim ? true : false}
            errorMessage={errors.nim && errors.nim.message}
            {...register("nim", { required: true })}
            defaultValue={profile?.nim as string}
            className="w-full font-semibold "
            classNames={{
              label: "text-sm",
              input: "text-sm font-semibold",
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="number"
            placeholder="Isi Nomor Ponsel Anda..."
            label="Nomor Ponsel"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            isInvalid={errors.phone_number ? true : false}
            errorMessage={errors.phone_number && errors.phone_number.message}
            {...register("phone_number", { required: true })}
            defaultValue={profile?.phone_number as string}
            endContent={
              <MdOutlinePhoneAndroid className="self-center text-xl text-default-400" />
            }
            className="w-full font-semibold "
            classNames={{
              label: "text-sm",
              input: "text-sm font-semibold",
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Select
            placeholder="Pilih Program Studi Anda"
            label="Program Studi"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            isInvalid={errors.major ? true : false}
            errorMessage={errors.major && errors.major.message}
            {...register("major", { required: true })}
            selectedKeys={values as any}
            onSelectionChange={setValues as any}
            className="w-full font-semibold"
            classNames={{
              label: "text-sm",
              value: "text-sm font-semibold",
            }}
          >
            <SelectItem key={"Teknik Informatika"} value="Teknik Informatika">
              Teknik Informatika - FILKOM
            </SelectItem>
            <SelectItem key={"Teknik Elektro"} value="Teknik Elektro">
              Teknik Elektro - FT
            </SelectItem>
            <SelectItem key={"Statistika"} value="Statistika">
              Statistika - FMIPA
            </SelectItem>
            <SelectItem key={"Teknologi Informasi"} value="Teknologi Informasi">
              Teknologi Informasi - FV
            </SelectItem>
            <SelectItem
              key={"Teknik Industri Pertanian"}
              value="Teknik Industri Pertanian"
            >
              Teknik Industri Pertanian - FTP
            </SelectItem>
          </Select>
        </div>
      </div>

      <div className="mt-10">
        <Button
          type="submit"
          isLoading={isloading}
          color="primary"
          radius="sm"
          className="w-full text-sm font-semibold"
          // className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Update Profil
        </Button>
      </div>
    </form>
  );
}
