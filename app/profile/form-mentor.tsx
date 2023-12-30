"use client";
import React, { useState } from "react";
import { Image } from "@nextui-org/image";
import {
  Certification,
  Course,
  Day,
  Experience,
  Location,
  Mentor,
  Transaction,
  User,
} from "@prisma/client";
import { updateMentorProfile } from "@/server/post_action";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Link } from "@nextui-org/link";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MdEmail, MdOutlinePhoneAndroid } from "react-icons/md";

import { toast } from "sonner";

export interface FormProps {
  profile: User;
  mentor: MentorExtend;
}

interface MentorExtend extends Mentor {
  course: Course[];
  course_day: Day[];
  mentoring_location: Location[];
  experience: Experience[];
  certification: Certification[];
  transaction: Transaction[];
}

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const FormDataSchema = z.object({
  phone_number: z
    .string()
    .min(1)
    .regex(phoneRegex, "Masukkan Nomor Ponsel dengan Format yang Benar"),
  description: z.string().min(10, { message: "Deskripsi minimal 10 Karakter" }),
  course_day: z
    .string()
    .min(1, { message: "Pilih Waktu Mentoring terlebih dahulu" }),
  course_time: z
    .string()
    .min(1, { message: "Pilih Waktu Mentoring terlebih dahulu" }),
  mentoring_location: z
    .string()
    .min(1, { message: "Pilih Lokasi Mentoring terlebih dahulu" }),
});

export type MentorInputs = z.infer<typeof FormDataSchema>;

export default function MentorForm({ profile, mentor }: FormProps) {
  const [isloading, setLoading] = useState(false);
  const [day, setDay] = React.useState<Set<string | null> | Selection>(
    new Set([mentor?.course_day[0].day])
  );
  const [time, setTime] = React.useState<Set<string | null> | Selection>(
    new Set([mentor?.course_day[0].time])
  );
  const [location, setLocation] = React.useState<
    Set<string | null> | Selection
  >(new Set([mentor?.mentoring_location[0].location]));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MentorInputs>({
    defaultValues: {
      phone_number: mentor?.phone_number as string,
      description: mentor?.description as string,
      course_day: mentor?.course_day[0].day as string,
      course_time: mentor?.course_day[0].time as string,
      mentoring_location: mentor?.mentoring_location[0].location as string,
    },
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<MentorInputs> = async (data) => {
    try {
      setLoading(true);
      await updateMentorProfile(data as MentorInputs);
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
          <Image
            alt="mentor-image"
            src={mentor?.image ?? ""}
            className="object-cover object-center w-28 h-28"
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="block text-sm font-semibold leading-6 text-gray-900">
            Mentore Coin Kamu : {profile?.coin}
          </p>
          {/* <Link href="/coin">
            <Button
              color="primary"
              radius="sm"
              className="w-full text-sm font-semibold"
            >
              Topup Coin
            </Button>
          </Link> */}
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
              selectedKeys={day as any}
              onSelectionChange={setDay as any}
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
              selectedKeys={time as any}
              onSelectionChange={setTime as any}
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
            selectedKeys={location as any}
            onSelectionChange={setLocation as any}
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
            defaultValue={mentor?.description as string}
            className="w-full font-semibold"
            classNames={{
              label: "text-sm",
              input: "resize-y min-h-[50px] text-sm font-semibold",
            }}
          />
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
