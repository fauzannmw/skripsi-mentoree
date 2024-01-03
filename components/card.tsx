"use client";
import React, { useState } from "react";
import { Image } from "@nextui-org/image";
import { CardProps } from "./types";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/react";
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";
import { ButtonComponent } from "./button";

export const Card: React.FC<CardProps> = ({
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
  const [isloading, setLoading] = useState<boolean>();
  const clickHandler = (params: boolean) => {
    return async (event: React.MouseEvent) => {
      await setLoading(params);
      event.preventDefault();
    };
  };
  return (
    <div className="flex flex-col w-full gap-4 p-6 text-gray-700 bg-white shadow-2xl rounded-xl bg-clip-border dark:bg-secunder">
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
          <div>
            <h1 className="block font-sans antialiased font-medium leading-snug tracking-normal sm:text-xl text-blue-gray-900 dark:text-white">
              {name}
            </h1>
            <h1 className="block font-sans antialiased font-medium leading-snug tracking-normal sm:text-xl text-blue-gray-900 dark:text-white">
              {major}
            </h1>
          </div>
          <span className="text-xl dark:text-white">
            {gender == "Laki Laki" ? <BsGenderMale /> : <BsGenderFemale />}
          </span>
        </div>
        <div className="flex gap-2">
          {course?.map((course, index) => (
            <p
              key={index}
              className="px-3 text-sm text-gray-500 bg-white border border-gray-200 rounded-md py-0.5"
            >
              {course?.course}
            </p>
          ))}
        </div>
        <div className="flex gap-2">
          <div>
            {course_day?.map((course_day, index) => (
              <p
                key={index}
                className="px-3 text-sm text-gray-500 bg-white border border-gray-200 rounded-md py-0.5"
              >
                {course_day.day} - {course_day.time}
              </p>
            ))}
          </div>
        </div>
        <p className="block font-sans antialiased font-light leading-relaxed text-gray-700 dark:text-white">
          {description}
        </p>
      </div>
      <ButtonComponent link={`/detail/${id}`} text="Lihat Detail" />
    </div>
  );
};
