import { getAllCourse } from "@/server/get_action";
import { updateFilter } from "@/server/post_action";
import { Button, Link } from "@nextui-org/react";

export default async function Filter() {
  const courseList = await getAllCourse();

  return (
    <form action={updateFilter} method="POST">
      <div className="w-screen max-w-lg px-4">
        <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
          <h2 className="text-xl font-bold text-stone-700">Apply filters</h2>
          <p className="mt-1 text-sm">Masukkan filter sesuai kategori anda</p>
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-stone-600">
                Bahasa Pemrograman
              </label>

              <select
                name="course"
                id="course"
                className="block w-full px-2 py-2 mt-2 text-sm border border-gray-200 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option className="text-xs font-semibold" value={""}>
                  Semua
                </option>

                {/* @ts-ignore */}
                {courseList.map((course, index) => (
                  <option
                    key={index}
                    value={course?.course}
                    className="text-xs font-semibold"
                  >
                    {course?.course}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-stone-600">
                Jenis Kelamin
              </label>

              <select
                name="gender"
                id="gender"
                className="block w-full px-2 py-2 mt-2 text-sm border border-gray-200 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option className="text-xs font-semibold" value={""}>
                  Semua
                </option>
                <option className="text-xs font-semibold" value={"Laki Laki"}>
                  Laki-Laki
                </option>
                <option className="text-xs font-semibold" value={"Perempuan"}>
                  Perempuan
                </option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-stone-600">
                Lokasi Mentoring
              </label>

              <select
                name="location"
                id="location"
                className="block w-full px-2 py-2 mt-2 text-sm border border-gray-200 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option className="text-xs font-semibold" value={""}>
                  Semua
                </option>
                <option className="text-xs font-semibold" value={"Daring"}>
                  Daring
                </option>
                <option className="text-xs font-semibold" value={"Luring"}>
                  Luring
                </option>
              </select>
            </div>
          </div>

          <div className="grid justify-end w-full grid-cols-2 mt-6 space-x-4 md:flex">
            <Link href="/explore">
              <Button className="px-8 py-2 font-medium text-gray-600 bg-gray-200 rounded-lg outline-none active:scale-95 focus:ring hover:opacity-90">
                Reset
              </Button>
            </Link>

            <Button
              type="submit"
              className="px-8 py-2 font-medium text-white bg-blue-600 rounded-lg outline-none active:scale-95 focus:ring hover:opacity-90"
            >
              Cari
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
