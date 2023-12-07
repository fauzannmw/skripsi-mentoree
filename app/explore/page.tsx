// "use client";
import { Card } from "@/components/card";
import { Box } from "@/components/listbox";
import { getAllMentor } from "@/server/get_action";

export default async function ExplorePage() {
  const mentorList = await getAllMentor();
  console.log(mentorList);

  const major = [
    { value: "Teknik Informatika", name: "Teknik Informatika - FILKOM" },
    { value: "Teknik Elektro", name: "Teknik Elektro - FT" },
    { value: "Statistika", name: "Statistika - FMIPA" },
    { value: "Teknologi Informasi", name: "Teknologi Informasi - FV" },
    {
      value: "Teknik Industri Pertanian",
      name: "Teknik Industri Pertanian - FTP",
    },
  ];

  return (
    <div className="grid gap-y-6">
      <div>
        {/* <Box /> */}
        <select
          name="major"
          id="major"
          // value={major ?? ""}
          // onChange={(e) => setMajor(e.target.value)}
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          {/* <option selected value="">
            Pilih Jurusan
          </option> */}
          <option value="Teknik Informatika">
            Teknik Informatika - FILKOM
          </option>
          <option value="Teknik Elektro">Teknik Elektro - FT</option>
          <option value="Statistika">Statistika - FMIPA</option>
          <option value="Teknologi Informasi">Teknologi Informasi - FV</option>
          <option value="Teknik Industri Pertanian">
            Teknik Industri Pertanian - FTP
          </option>
        </select>
      </div>
      <div className="grid gap-y-6">
        {mentorList.map((mentor, index) => (
          <Card
            key={index}
            image={mentor?.image}
            name={mentor?.name}
            major={mentor?.major}
            course={mentor?.course}
            course_day={mentor?.course_day}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra vitae congue eu consequat ac. Mattis rhoncus urna neque viverra justo nec ultrices. Ipsum nunc aliquet bibendum enim."
            }
            // description={
            //   "Enter a freshly updated and thoughtfully furnished peaceful homesurrounded by ancient trees, stone walls, and open meadows."
            // }
          />
        ))}
      </div>
    </div>
  );
}
