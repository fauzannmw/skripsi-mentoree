import React, { Fragment } from "react";
import { Image } from "@nextui-org/image";
import { HeartFilledIcon, StarIcon } from "./icons";
import { CardProps } from "./types";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/react";
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";

export const Card: React.FC<CardProps> = async ({
  id,
  nim,
  name,
  major,
  image,
  gender,
  course,
  course_day,
  description,
}) => {
  return (
    <Fragment>
      <div className="flex flex-col max-w-md gap-4 p-6 text-gray-700 bg-white shadow-2xl rounded-xl bg-clip-border dark:bg-secunder">
        <div className="flex items-center justify-center">
          {image ? (
            <Image
              isZoomed
              alt="mentor-image"
              src={image}
              className="object-cover w-72 h-72"
            />
          ) : (
            <Image
              isZoomed
              alt="mentor-image"
              src="https://images.unsplash.com/photo-1518288774672-b94e808873ff?q=80&w=2718&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          )}
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="flex items-center justify-between">
            <h1 className="block font-sans antialiased font-medium leading-snug tracking-normal sm:text-xl text-blue-gray-900 dark:text-white">
              {name}, {major}
            </h1>
            <span className="text-xl dark:text-white">
              {gender == "Laki Laki" ? <BsGenderMale /> : <BsGenderFemale />}
            </span>
            {/* <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
              <StarIcon />
              5.0
            </p> */}
          </div>
          <div className="flex gap-2">
            {course?.map((course, index) => (
              <Button size="sm" className="font-semibold" key={index}>
                {course.course}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            {course_day?.map((course_day, index) => (
              <Button size="sm" className="font-semibold" key={index}>
                {course_day.day}
              </Button>
            ))}
          </div>
          <p className="block font-sans antialiased font-light leading-relaxed text-gray-700 dark:text-white">
            {description}
          </p>
        </div>
        <Link href={`detail/${id}`} className="">
          <button
            className="w-full select-none rounded-lg bg-gray-900 dark:bg-mentoree py-4 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            See Detail
          </button>
        </Link>
      </div>
    </Fragment>
  );
};
