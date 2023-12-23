"use client";
import React, { useState } from "react";
import { Image } from "@nextui-org/image";
import { User } from "@prisma/client";
import { updateProfile } from "@/server/post_action";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/link";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export interface FormProps {
  profile: User;
}

const FormDataSchema = z.object({
  major: z.string().min(1, { message: "Isi Program Studi Anda dengan Benar." }),
  nim: z
    .string()
    .min(15, { message: "Masukkan Nim dengan Format yang Benar." }),
});

type Inputs = z.infer<typeof FormDataSchema>;

export default function Form({ profile }: FormProps) {
  const [isloading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      major: profile?.major as string,
      nim: profile?.nim as string,
    },
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      await updateProfile(data as User);
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
          <label
            htmlFor="email"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Email
          </label>
          <div className="mt-2.5">
            <input
              type="email"
              name="email"
              id="email"
              value={profile?.email ?? ""}
              disabled
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="name"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Nama
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="name"
              id="name"
              value={profile?.name ?? ""}
              disabled
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="nim"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Nomor Induk Mahasiswa
          </label>
          <div className="mt-2.5">
            <input
              type="number"
              placeholder="nim"
              {...register("nim", { required: true })}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.nim && <span>{errors.nim.message}</span>}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="major"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Jurusan
          </label>
          <div className="mt-2.5">
            <select
              {...register("major", { required: true })}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option disabled value="">
                Pilih Jurusan Anda
              </option>
              <option value="Teknik Informatika">
                Teknik Informatika - FILKOM
              </option>
              <option value="Teknik Elektro">Teknik Elektro - FT</option>
              <option value="Statistika">Statistika - FMIPA</option>
              <option value="Teknologi Informasi">
                Teknologi Informasi - FV
              </option>
              <option value="Teknik Industri Pertanian">
                Teknik Industri Pertanian - FTP
              </option>
            </select>
            {errors.major && <span>{errors.major.message}</span>}
          </div>
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
