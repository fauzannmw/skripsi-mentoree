// "use client";
import { Card } from "@/components/card";
import Select from "./select";
import { getAllMentor } from "@/server/get_action";

import { majorState } from "@/recoil/atom/majorRecoil";
import { useRecoilState } from "recoil";

export default async function ExplorePage() {
  // const [major, setMajor] = useRecoilState(majorState);
  // console.log(major);

  const mentorList = await getAllMentor();

  return (
    <div className="grid gap-y-6">
      <Select />
      <div className="grid gap-y-6">
        {/* @ts-ignore */}
        {mentorList.detail?.map((mentor, index) => (
          <Card
            key={index}
            nim={mentor.nim}
            name={mentor.name}
            major={mentor.major}
            image={mentor.image}
            course_day={mentor.course_day}
            course={mentor.course}
            description={
              "Enter a freshly updated and thoughtfully furnished peaceful homesurrounded by ancient trees, stone walls, and open meadows."
            }
          />
        ))}
      </div>
    </div>
  );
}
