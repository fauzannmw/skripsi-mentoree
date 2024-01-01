import { Card } from "@/components/card";
import { getAllCourse, getMentorByFilter } from "@/server/get_action";
import Filter from "./filter";
import { Course, Mentor } from "@prisma/client";

export type ProfileSearchParams = {
  [key: string]: string;
};

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: ProfileSearchParams;
}) {
  const mentorFilter = await getMentorByFilter(
    searchParams.course,
    searchParams.gender,
    searchParams.day
  );
  console.log(mentorFilter);

  const courseList = await getAllCourse();

  return (
    <div className="grid gap-y-12">
      <div className="w-screen max-w-lg px-8 sm:px-6">
        {/* @ts-ignore */}
        <Filter courseList={courseList as Course} />
      </div>
      <div className="flex justify-center w-screen max-w-lg px-8 sm:px-6 gap-y-6">
        {mentorFilter instanceof Array &&
          mentorFilter.map((mentor, index) => (
            <Card
              key={index}
              id={mentor.id}
              nim={mentor.nim}
              name={mentor.name}
              major={mentor.major}
              image={mentor.image}
              gender={mentor.gender}
              course={mentor.course}
              course_day={mentor.course_day}
              description={mentor.description}
            />
          ))}
      </div>
    </div>
  );
}
