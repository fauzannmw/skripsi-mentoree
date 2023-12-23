"use client";
import React, { useState } from "react";
import { Mentor, User } from "@prisma/client";
import { registerMentor } from "@/server/post_action";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";

import { MdEmail } from "react-icons/md";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FaCode } from "react-icons/fa";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerMentorTypes } from "@/server/types";
import { checkMentorInUser } from "@/server/get_action";

export interface FormProps {
  profile: User;
}

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const FormDataSchema = z.object({
  nim: z
    .string()
    .min(15, { message: "Masukkan Nim dengan Format yang Benar." }),
  email: z
    .string()
    .min(1)
    .email("Masukkan Email dengan Format yang Benar.")
    .refine(async (e) => {
      return await checkMentorInUser(e);
    }, "This email is not in our database"),
  name: z.string().min(1),
  major: z.string().min(1),
  phone_number: z
    .string()
    .min(1)
    .regex(phoneRegex, "Masukkan Nomor Ponsel dengan Format yang Benar"),
  image: z.string(),
  gender: z.string().min(1),
  description: z.string().min(10),
  course: z.string().min(1),
  course_day: z.string().min(1),
  course_time: z.string().min(1),
  mentoring_location: z.string().min(1),
  experience_position: z.string(),
  experience_company: z.string(),
  certification_course: z.string(),
  certification_institution: z.string(),
});

type Inputs = z.infer<typeof FormDataSchema>;

export default function Form({ profile }: FormProps) {
  const [isloading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      nim: "",
      email: "",
      name: "",
      major: "",
      phone_number: "",
      image:
        "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=3230&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      gender: "",
      description: "",
      course: "",
      course_day: "",
      course_time: "",
      mentoring_location: "",
      experience_position: "",
      experience_company: "",
      certification_course: "",
      certification_institution: "",
    },
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      await registerMentor(data as registerMentorTypes);
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(processForm)}>
      <div className="grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Input
            type="email"
            label="Email"
            placeholder="mentor@ub.ac.id"
            variant="bordered"
            size="sm"
            radius="sm"
            isInvalid={errors.email ? true : false}
            errorMessage={errors.email && errors.email.message}
            endContent={
              <MdEmail className="self-center text-2xl text-default-400" />
            }
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
            type="number"
            label="Nomor Induk Mahasiswa"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            isInvalid={errors.nim ? true : false}
            errorMessage={errors.nim && errors.nim.message}
            {...register("nim", { required: true })}
            className="w-full font-semibold "
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
            isInvalid={errors.name ? true : false}
            errorMessage={errors.name && errors.name.message}
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
            label="Nomor Ponsel"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            isInvalid={errors.phone_number ? true : false}
            errorMessage={errors.phone_number && errors.phone_number.message}
            {...register("phone_number", { required: true })}
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
            label="Jurusan"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            isInvalid={errors.major ? true : false}
            errorMessage={errors.major && errors.major.message}
            {...register("major", { required: true })}
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
        <div className="sm:col-span-2">
          <Select
            label="Jenis Kelamin"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            isInvalid={errors.gender ? true : false}
            errorMessage={errors.gender && errors.gender.message}
            {...register("gender", { required: true })}
            className="w-full font-semibold"
            classNames={{
              label: "text-sm",
              value: "text-sm font-semibold",
            }}
          >
            <SelectItem key={"Laki Laki"} value="Laki Laki">
              Laki Laki
            </SelectItem>
            <SelectItem key={"Perempuan"} value="Perempuan">
              Perempuan
            </SelectItem>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Textarea
            label="Description"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Deskripsi singkat Mentor"
            minRows={4}
            radius="sm"
            isInvalid={errors.description ? true : false}
            errorMessage={errors.description && errors.description.message}
            {...register("description", { required: true })}
            className="w-full font-semibold"
            classNames={{
              label: "text-sm",
              input: "resize-y min-h-[50px] text-sm font-semibold",
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            label="Bahasa Pemrograman"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            isInvalid={errors.course ? true : false}
            errorMessage={errors.course && errors.course.message}
            endContent={
              <FaCode className="self-center text-xl text-default-400" />
            }
            {...register("course", { required: true })}
            className="w-full font-semibold "
            classNames={{
              label: "text-sm",
              input: "text-sm font-semibold",
            }}
          />
        </div>
        <div className="flex flex-col w-full gap-2 mt-2 sm:col-span-2">
          <label
            htmlFor="experience_position"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Jadwal Mentoring
          </label>
          <div className="flex gap-2">
            <Select
              label="Hari"
              labelPlacement="inside"
              variant="bordered"
              size="sm"
              radius="sm"
              isInvalid={errors.course_day ? true : false}
              errorMessage={errors.course_day && errors.course_day.message}
              {...register("course_day", { required: true })}
              className="w-full font-semibold"
              classNames={{
                label: "text-sm",
                value: "text-sm font-semibold",
              }}
            >
              <SelectItem key={"Senin"} value="Senin">
                Senin
              </SelectItem>
              <SelectItem key={"Selasa"} value="Selasa">
                Selasa
              </SelectItem>
              <SelectItem key={"Rabu"} value="Rabu">
                Rabu
              </SelectItem>
              <SelectItem key={"Kamis"} value="Kamis">
                Kamis
              </SelectItem>
              <SelectItem key={"Jumat"} value="Jumat">
                Jumat
              </SelectItem>
            </Select>
            <Select
              label="Jam"
              labelPlacement="inside"
              variant="bordered"
              size="sm"
              radius="sm"
              isInvalid={errors.course_time ? true : false}
              errorMessage={errors.course_time && errors.course_time.message}
              {...register("course_time", { required: true })}
              className="w-full font-semibold"
              classNames={{
                label: "text-sm",
                value: "text-sm font-semibold",
              }}
            >
              <SelectItem key={"08.00 - 10.00"} value="08.00 - 10.00">
                08.00 - 10.00
              </SelectItem>
              <SelectItem key={"10.00 - 12.00"} value="10.00 - 12.00">
                10.00 - 12.00
              </SelectItem>
              <SelectItem key={"12.00 - 14.00"} value="12.00 - 14.00">
                12.00 - 14.00
              </SelectItem>
              <SelectItem key={"14.00 - 16.00"} value="14.00 - 16.00">
                14.00 - 16.00
              </SelectItem>
              <SelectItem key={"16.00 - 18.00"} value="16.00 - 18.00">
                16.00 - 18.00
              </SelectItem>
            </Select>
          </div>
        </div>
        <div className="sm:col-span-2">
          <Select
            label="Lokasi Mentoring"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            isInvalid={errors.mentoring_location ? true : false}
            errorMessage={
              errors.mentoring_location && errors.mentoring_location.message
            }
            {...register("mentoring_location", { required: true })}
            className="w-full font-semibold"
            classNames={{
              label: "text-sm",
              value: "text-sm font-semibold",
            }}
          >
            <SelectItem key={"Daring"} value="Daring">
              Daring
            </SelectItem>
            <SelectItem key={"Luring"} value="Luring">
              Luring
            </SelectItem>
          </Select>
        </div>
        <div className="flex flex-col gap-2 mt-2 sm:col-span-2">
          <label
            htmlFor="experience_position"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Pengalaman Bekerja
          </label>
          <div className="flex gap-2">
            <Input
              type="text"
              label="Pekerjaan"
              labelPlacement="inside"
              variant="bordered"
              size="sm"
              radius="sm"
              isInvalid={errors.experience_position ? true : false}
              errorMessage={
                errors.experience_position && errors.experience_position.message
              }
              {...register("experience_position", { required: true })}
              className="w-full font-semibold "
              classNames={{
                label: "text-sm",
                input: "text-sm font-semibold",
              }}
            />
            <Input
              type="text"
              label="Nama Perusahaan"
              labelPlacement="inside"
              variant="bordered"
              size="sm"
              radius="sm"
              isInvalid={errors.experience_company ? true : false}
              errorMessage={
                errors.experience_company && errors.experience_company.message
              }
              {...register("experience_company", { required: true })}
              className="w-full font-semibold "
              classNames={{
                label: "text-sm",
                input: "text-sm font-semibold",
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2 sm:col-span-2">
          <label
            htmlFor="experience_position"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Sertifikasi
          </label>
          <div className="flex gap-2">
            <Input
              type="text"
              label="Nama Course"
              labelPlacement="inside"
              variant="bordered"
              size="sm"
              radius="sm"
              isInvalid={errors.certification_course ? true : false}
              errorMessage={
                errors.certification_course &&
                errors.certification_course.message
              }
              {...register("certification_course", { required: true })}
              className="w-full font-semibold "
              classNames={{
                label: "text-sm",
                input: "text-sm font-semibold",
              }}
            />
            <Input
              type="text"
              label="Nama Institusi"
              labelPlacement="inside"
              variant="bordered"
              size="sm"
              radius="sm"
              isInvalid={errors.certification_institution ? true : false}
              errorMessage={
                errors.certification_institution &&
                errors.certification_institution.message
              }
              {...register("certification_institution", { required: true })}
              className="w-full font-semibold "
              classNames={{
                label: "text-sm",
                input: "text-sm font-semibold",
              }}
            />
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
        >
          Update Profil
        </Button>
      </div>
    </form>
  );
}
