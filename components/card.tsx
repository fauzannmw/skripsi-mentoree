import React, { Fragment } from "react";
import { Image } from "@nextui-org/image";
import { HeartFilledIcon, StarIcon } from "./icons";
import { CardProps } from "./types";
import { Link } from "@nextui-org/link";

export const Card: React.FC<CardProps> = async ({
  nim,
  name,
  major,
  image,
  course,
  course_day,
  description,
}) => {
  return (
    <Fragment>
      <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-2xl">
        <div className="relative flex justify-center mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
          {image ? (
            <Image alt="mentor-image" src={image} className="object-cover" />
          ) : (
            <Image
              alt="mentor-image"
              src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
            />
          )}

          {/* <Image src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg" /> */}
          {/* <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div> */}

          <button
            className="!absolute  top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <HeartFilledIcon />
            </span>
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
              {name}, {major}
            </h5>
            <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
              <StarIcon />
              5.0
            </p>
          </div>
          {course?.map((course, index) => (
            <p
              key={index}
              className="block font-sans text-base antialiased font-semibold leading-relaxed text-gray-700"
            >
              {course.course}
            </p>
          ))}
          {course_day?.map((course_day, index) => (
            <p
              key={index}
              className="block font-sans text-base antialiased font-semibold leading-relaxed text-gray-700"
            >
              Jadwal Mentoring : {course_day.day}
            </p>
          ))}

          <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
            {description}
          </p>
        </div>
        <Link href={`detail/${nim}`} className="p-6 pt-3">
          <button
            className="block w-full select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            See Detail
          </button>
        </Link>
      </div>
    </Fragment>
  );
};
