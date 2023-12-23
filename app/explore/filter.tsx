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
      await updateFilter(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={processForm}>
      <div className="w-screen max-w-lg p-6">
        <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
          <h1 className="text-xl font-bold text-stone-700">Apply filters</h1>
          <p className="mt-1 text-sm">Pilih Mentor sesuai keinginan Anda</p>
          <div className="grid grid-cols-1 gap-2 mt-8">
            <Select
              name="course"
              id="course"
              label="Pilih Bahasa Pemrograman"
              description="Pilih Mentor dengan preferensi Bahasa pemrograman kamu"
              className="w-full"
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
              className="w-full"
            >
              <SelectItem key="Laki Laki" value="Laki Laki">
                Laki-Laki
              </SelectItem>
              <SelectItem key="Perempuan" value="Perempuan">
                Perempuan
              </SelectItem>
            </Select>
            <Select
              name="location"
              id="location"
              label="Pilih Lokasi Mentoring"
              description="Pilih Mentor dengan preferensi Lokasi Mentoring kamu"
              className="w-full"
            >
              <SelectItem key="Daring" value="Daring">
                Daring
              </SelectItem>
              <SelectItem key="Luring" value="Luring">
                Luring
              </SelectItem>
            </Select>
          </div>

          <div className="grid justify-end w-full grid-cols-2 mt-6 space-x-4 md:flex">
            <Link href="/explore" className="w-full">
              <Button
                variant="bordered"
                radius="sm"
                isLoading={isloading}
                className="w-full"
              >
                Reset
              </Button>
            </Link>

            <Button
              color="primary"
              type="submit"
              radius="sm"
              isLoading={isloading}
              className="w-full"
            >
              Cari
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
