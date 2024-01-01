"use client";

import { updateFilter } from "@/server/post_action";
import { Button, Link } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

import { Course } from "@prisma/client";
import { useState } from "react";

type FilterProps = {
  courseList: Course;
};

export default function Filter({ courseList }: FilterProps) {
  const [isloading, setLoading] = useState(false);

  const processForm = async (data: any) => {
    try {
      setLoading(true);
      // await updateFilter(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={processForm}>
      <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-xl dark:bg-secunder">
        <h1 className="text-xl font-bold">Apply filters</h1>
        <p className="mt-1 text-sm">Pilih Mentor sesuai keinginan Anda</p>
        <div className="grid grid-cols-1 gap-2 mt-8">
          <Select
            name="course"
            id="course"
            label="Pilih Bahasa Pemrograman"
            description="Pilih Mentor dengan preferensi Bahasa pemrograman kamu"
            variant="bordered"
            className="w-full "
            classNames={{
              label: "text-sm font-semibold",
              value: "text-sm font-semibold",
            }}
          >
            {/* @ts-ignore */}
            {courseList.map((course) => (
              <SelectItem key={course.course} value={course.course}>
                {course.course}
              </SelectItem>
            ))}
          </Select>
          <Select
            name="gender"
            id="gender"
            label="Pilih Jenis Kelamin"
            description="Pilih Mentor dengan preferensi Jenis Kelamin kamu"
            variant="bordered"
            className="w-full"
            classNames={{
              label: "text-sm font-semibold",
              value: "text-sm font-semibold",
            }}
          >
            <SelectItem key="Laki Laki" value="Laki Laki">
              Laki-Laki
            </SelectItem>
            <SelectItem key="Perempuan" value="Perempuan">
              Perempuan
            </SelectItem>
          </Select>
          <Select
            name="day"
            id="day"
            label="Pilih Hari Mentoring"
            description="Pilih Mentor dengan preferensi Hari Mentoring kamu"
            variant="bordered"
            className="w-full"
            classNames={{
              label: "text-sm font-semibold",
              value: "text-sm font-semibold",
            }}
          >
            <SelectItem key="Senin" value="Senin">
              Senin
            </SelectItem>
            <SelectItem key="Selasa" value="Selasa">
              Selasa
            </SelectItem>
            <SelectItem key="Rabu" value="Rabu">
              Rabu
            </SelectItem>
            <SelectItem key="Kamis" value="Kamis">
              Kamis
            </SelectItem>
            <SelectItem key="Jumat" value="Jumat">
              Jumat
            </SelectItem>
          </Select>
        </div>

        <div className="grid justify-end w-full grid-cols-2 mt-6 space-x-4 md:flex">
          <Link href="/explore" className="w-full">
            <Button
              variant="bordered"
              radius="sm"
              isLoading={isloading}
              className="w-full text-sm font-semibold"
            >
              Reset
            </Button>
          </Link>

          <Button
            color="primary"
            type="submit"
            radius="sm"
            isLoading={isloading}
            className="w-full text-sm font-semibold"
          >
            Cari
          </Button>
        </div>
      </div>
    </form>
  );
}
