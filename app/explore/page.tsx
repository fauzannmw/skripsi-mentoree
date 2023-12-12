import { Card } from "@/components/card";
import { getMentorByFilter } from "@/server/get_action";
import Select from "./select";

export type ProfileSearchParams = {
  [key: string]: string;
};

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: ProfileSearchParams;
}) {
  const mentorFilterByCourse = await getMentorByFilter(
    searchParams.course,
    searchParams.gender
  );

  return (
    <div className="grid gap-y-6">
      <Select />
      <div className="grid gap-y-6">
        {/* @ts-ignore */}
        {mentorFilterByCourse.map((mentor, index) => (
          <Card
            key={index}
            nim={mentor.nim}
            name={mentor.name}
            major={mentor.major}
            image={mentor.image}
            course={mentor.course}
            course_day={mentor.course_day}
            description={
              "Enter a freshly updated and thoughtfully furnished peaceful homesurrounded by ancient trees, stone walls, and open meadows."
            }
          />
        ))}
      </div>
    </div>
  );
}
