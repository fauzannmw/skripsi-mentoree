import { Button, Link } from "@nextui-org/react";
import { updateFilter } from "@/server/post_action";
import { getAllCourse } from "@/server/get_action";

export default async function Select() {
  const courseList = await getAllCourse();

  const majorList = [
    { value: "Teknik Informatika", name: "Teknik Informatika - FILKOM" },
    { value: "Teknologi Informasi", name: "Teknologi Informasi - FV" },
    { value: "Teknik Elektro", name: "Teknik Elektro - FT" },
    {
      value: "Teknik Industri Pertanian",
      name: "Teknik Industri Pertanian - FTP",
    },
    { value: "Statistika", name: "Statistika - FMIPA" },
  ];

  return (
    <form
      action={updateFilter}
      method="POST"
      className="flex flex-col w-screen max-w-lg gap-4 px-8"
    >
      <select
        name="course"
        id="course"
        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        {/* @ts-ignore */}
        {courseList.map((course, index) => (
          <option key={index} value={course?.course}>
            {course?.course}
          </option>
        ))}
      </select>
      <select
        name="gender"
        id="gender"
        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        <option value={"Laki Laki"}>Laki-Laki</option>
        <option value={"Perempuan"}>Perempuan</option>
      </select>
      <select
        name="location"
        id="location"
        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        <option value={"Daring"}>Daring</option>
        <option value={"Luring"}>Luring</option>
      </select>
      <div className="flex justify-center gap-6">
        <Button type="submit">Filter</Button>
        <Link href="/explore">
          <Button>Reset</Button>
        </Link>
      </div>
    </form>
  );
}
