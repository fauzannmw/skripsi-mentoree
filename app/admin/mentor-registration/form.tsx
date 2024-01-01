"use client";
import React, { useEffect, useState } from "react";
import { Mentor, User } from "@prisma/client";
import { registerMentor } from "@/server/post_action";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";

import { MdEmail } from "react-icons/md";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FaCode } from "react-icons/fa";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { checkMentorInUser, checkMentorNimInUser } from "@/server/get_action";

import { toast } from "sonner";

export interface FormProps {
  profile: User;
}

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const FormDataSchema = z.object({
  nim: z
    .string()
    .min(15, { message: "Masukkan Nim dengan Format yang Benar" })
    .refine(async (e) => {
      return await checkMentorNimInUser(e);
    }, "Nim sudah pernah didaftarkan"),
  email: z
    .string()
    .min(1, { message: "Masukkan Email dengan Format yang Benar." })
    .email("Masukkan Email dengan Format yang Benar.")
    .refine(async (e) => {
      return await checkMentorInUser(e);
    }, "Email belum didaftarkan sebagai User"),
  name: z.string().min(1, { message: "Masukkan Nama" }),
  major: z.string().min(1, { message: "Pilih Jurusan terlebih dahulu" }),
  phone_number: z
    .string()
    .min(1, { message: "Masukkan Nomor Ponsel dengan Format yang Benar" })
    .regex(phoneRegex, "Masukkan Nomor Ponsel dengan Format yang Benar"),
  image: z.string().min(1, { message: "Silahkan upload foto terlebih dahulu" }),
  // .any()
  // // To not allow empty files
  // .refine((files) => files?.length >= 1, { message: "Image is required." })
  // // To not allow files other than images
  // .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
  //   message: ".jpg, .jpeg, .png and .webp files are accepted.",
  // })
  // // To not allow files larger than 5MB
  // .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
  //   message: `Max file size is 5MB.`,
  // }),
  gender: z.string().min(1, { message: "Pilih Jenis Kelamin terlebih dahulu" }),
  description: z.string().min(10, { message: "Deskripsi minimal 10 Karakter" }),
  course: z
    .string()
    .min(1, { message: "Pilih Bahasa Pemrograman terlebih dahulu" }),
  course_day: z
    .string()
    .min(1, { message: "Pilih Waktu Mentoring terlebih dahulu" }),
  course_time: z
    .string()
    .min(1, { message: "Pilih Waktu Mentoring terlebih dahulu" }),
  // mentoring_location: z
  //   .string()
  //   .min(1, { message: "Pilih Lokasi Mentoring terlebih dahulu" }),
  experience_position: z.string(),
  experience_company: z.string(),
  certification_course: z.string(),
  certification_institution: z.string(),
});

export type RegisterMentorTypes = z.infer<typeof FormDataSchema>;

export default function Form({ profile }: FormProps) {
  const [isloading, setLoading] = useState(false);
  const [image, setImage] = useState<File>();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<RegisterMentorTypes>({
    defaultValues: {
      email: "",
      nim: "",
      name: "",
      major: "",
      phone_number: "",
      image: "",
      gender: "",
      description: "",
      course: "",
      course_day: "",
      course_time: "",
      // mentoring_location: "",
      experience_position: "",
      experience_company: "",
      certification_course: "",
      certification_institution: "",
    },
    resolver: zodResolver(FormDataSchema),
  });

  useEffect(() => {
    if (image !== undefined) {
      const fetchData = async () => {
        setLoading(true);

        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "mentoree");

        const uploadResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dfuy7tcaq/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const uploadedImageData = await uploadResponse.json();
        const imageUrl = uploadedImageData.secure_url;
        setValue("image", imageUrl);

        // clearErrors image because error.image does not auto refresh
        clearErrors("image");

        toast("Berhasil Upload Gambar");
        setLoading(false);
      };
      fetchData().catch(console.error);
    }
  }, [image]);

  const processForm: SubmitHandler<RegisterMentorTypes> = async (data) => {
    try {
      setLoading(true);
      await registerMentor(data as RegisterMentorTypes);
      toast("Mentor Berhasil Didaftarkan");
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
            min={0}
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
          <label
            htmlFor="experience_position"
            className="block text-sm font-semibold leading-6 "
          >
            <span className={errors.image && "text-[#f31260]"}>Foto</span>
          </label>
          <div className="flex flex-col gap-2">
            <input
              className={`w-full text-sm border-2 border-gray-300  dark:border-zinc-700 dark:text-zinc-400 rounded-lg py-2 px-3 font-semibold ${
                errors.image && "text-[#f31260] border-[#f31260]"
              }`}
              type="file"
              onChange={(e) => {
                e.target.files && setImage(e.target.files[0]);
              }}
            />
            <p className="text-xs font-semibold text-[#f31260]">
              {errors.image && (errors.image?.message as string)}
            </p>
          </div>
        </div>
        <div className="sm:col-span-2">
          <Textarea
            label="Deskripsi"
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
          <Select
            label="Bahasa Pemrograman"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            isInvalid={errors.course ? true : false}
            errorMessage={errors.course && errors.course.message}
            {...register("course", { required: true })}
            className="w-full font-semibold"
            classNames={{
              label: "text-sm",
              value: "text-sm font-semibold",
            }}
          >
            <SelectItem key={"Typescript"} value="Typescript">
              Typescript
            </SelectItem>
            <SelectItem key={"Kotlin"} value="Kotlin">
              Kotlin
            </SelectItem>
            <SelectItem key={"Golang"} value="Golang">
              Golang
            </SelectItem>
            <SelectItem key={"Python"} value="Python">
              Python
            </SelectItem>
            <SelectItem key={"Java"} value="Java">
              Java
            </SelectItem>
            <SelectItem key={"C++"} value="C++">
              C++
            </SelectItem>
            <SelectItem key={"Swift"} value="Swift">
              Swift
            </SelectItem>
            <SelectItem key={"PHP"} value="PHP">
              PHP
            </SelectItem>
            <SelectItem key={"SQL"} value="SQL">
              SQL
            </SelectItem>
          </Select>
        </div>
        <div className="flex flex-col w-full gap-2 mt-2 sm:col-span-2">
          <label
            htmlFor="experience_position"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            <span
              className={
                errors.course_day || errors.course_time ? "text-[#f31260]" : ""
              }
            >
              Jadwal Mentoring
            </span>
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
              <SelectItem key={"Pagi"} value="Pagi">
                Pagi
              </SelectItem>
              <SelectItem key={"Siang"} value="Siang">
                Siang
              </SelectItem>
            </Select>
          </div>
        </div>
        {/* <div className="sm:col-span-2">
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
        </div> */}
        <div className="flex flex-col gap-2 mt-2 sm:col-span-2">
          <label
            htmlFor="experience"
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
          Daftarkan Mentor
        </Button>
      </div>
    </form>
  );
}
