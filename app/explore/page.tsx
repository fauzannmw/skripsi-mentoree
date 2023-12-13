import { Card } from "@/components/card";
import { getMentorByFilter } from "@/server/get_action";
import Filter from "./filter";

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
    searchParams.location
  );

  console.log(mentorFilter);

  return (
    <div className="grid gap-y-6">
      <Filter />
      <div className="grid justify-center gap-y-6">
        {/* @ts-ignore */}
        {mentorFilter.map((mentor, index) => (
          <Card
            key={index}
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
