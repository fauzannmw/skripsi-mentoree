"use client";
import React, { useState } from "react";
import { Mentor, User } from "@prisma/client";
import { registerMentor } from "@/server/post_action";
import { Button } from "@nextui-org/react";

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
      // Where checkIfEmailIsValid makes a request to the backend
      // to see if the email is valid.
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
  experience_position: z.string().min(1),
  experience_company: z.string().min(1),
  certification_course: z.string().min(1),
  certification_institution: z.string().min(1),
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
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
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
              {...register("email", { required: true })}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.email && <span>{errors.email.message}</span>}
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
              {...register("nim", { required: true })}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.nim && <span>{errors.nim.message}</span>}
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
              {...register("name", { required: true })}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.name && <span>{errors.name.message}</span>}
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
        <div className="sm:col-span-2">
          <label
            htmlFor="phone_number"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Nomor Ponsel
          </label>
          <div className="mt-2.5">
            <input
              type="number"
              {...register("phone_number", { required: true })}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.phone_number && <span>{errors.phone_number.message}</span>}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="gender"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Jenis Kelamin
          </label>
          <div className="mt-2.5">
            <select
              {...register("gender", { required: true })}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="Laki Laki">Laki Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
            {errors.gender && <span>{errors.gender.message}</span>}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Deskripsi
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              {...register("description", { required: true })}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.description && <span>{errors.description.message}</span>}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="course"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Bahasa Pemrograman
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              {...register("course", { required: true })}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.course && <span>{errors.course.message}</span>}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="course_day"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Hari Mentoring
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              {...register("course_day", { required: true })}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.course_day && <span>{errors.course_day.message}</span>}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="course_time"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Jam Mentoring
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              {...register("course_time", { required: true })}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.course_time && <span>{errors.course_time.message}</span>}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="mentoring_location"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Lokasi Mentoring
          </label>
          <div className="mt-2.5">
            <select
              {...register("mentoring_location", { required: true })}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="Daring">Daring</option>
              <option value="Luring">Luring</option>
            </select>
            {errors.mentoring_location && (
              <span>{errors.mentoring_location.message}</span>
            )}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="experience_position"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Posisi ?
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              {...register("experience_position", { required: true })}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.experience_position && (
              <span>{errors.experience_position.message}</span>
            )}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="experience_company"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Perusahaan
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              {...register("experience_company", { required: true })}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.experience_company && (
              <span>{errors.experience_company.message}</span>
            )}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="certification_course"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Course Sertifikasi
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              {...register("certification_course", { required: true })}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.certification_course && (
              <span>{errors.certification_course.message}</span>
            )}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="certification_institution"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Institusi Sertifikasi
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              {...register("certification_institution", { required: true })}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.certification_institution && (
              <span>{errors.certification_institution.message}</span>
            )}
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
