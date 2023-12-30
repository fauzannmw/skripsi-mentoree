import { IoMdPrint } from "react-icons/io";
import Table from "./table";
import { Button } from "@nextui-org/react";

import { Mentor } from "@prisma/client";
import { getAllMentor } from "@/server/get_action";

interface MentorExtends extends Mentor {
  error: unknown;
}

export default async function AdminTransactionPage() {
  const data = await getAllMentor();

  return (
    <div className="items-center w-full px-4 py-4 mx-auto my-10 bg-white rounded-lg shadow-md lg:w-3/4">
      <div className="container mx-auto">
        <div className="flex justify-between w-full px-4 py-2">
          <h1 className="text-xl font-bold">Mentor List</h1>
          <Button className="px-2 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            <IoMdPrint />
          </Button>
        </div>
        <Table mentor={data as MentorExtends} />
        <div className="flex flex-col items-center w-full px-4 py-2 space-y-2 text-sm text-gray-500 sm:justify-between sm:space-y-0 sm:flex-row">
          <div className="flex items-center justify-between space-x-2">
            <a href="#" className="hover:text-gray-600">
              Previous
            </a>
            <div className="flex flex-row space-x-1">
              <div className="flex px-2 py-px text-white bg-blue-400 border border-blue-400">
                1
              </div>
              <div className="flex px-2 py-px border border-blue-400 hover:bg-blue-400 hover:text-white">
                2
              </div>
            </div>
            <a href="#" className="hover:text-gray-600">
              Next
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
