"use client";
import { Image } from "@nextui-org/react";
import { Course, Day, User } from "@prisma/client";

type TableProps = {
  user: User;
};

export default function Table({ user }: TableProps) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border border-collapse table-auto">
        <thead className="">
          <tr className="text-base font-bold text-center border-b-2 border-blue-500 bg-gray-50">
            <th className="px-4 py-3 border-b-2 border-blue-500">Id</th>
            <th className="px-4 py-3 border-b-2 border-blue-500">Data User</th>
            <th className="px-4 py-3 border-b-2 border-blue-500">Email</th>
            <th className="px-4 py-3 border-b-2 border-blue-500">
              Nomor Ponsel
            </th>
            <th className="px-4 py-3 border-b-2 border-blue-500">
              Program Studi
            </th>
            <th className="px-4 py-3 border-b-2 border-blue-500">Role</th>
            <th className="px-4 py-3 border-b-2 border-blue-500">
              Jumlah Coin
            </th>
          </tr>
        </thead>
        <tbody className="text-sm font-normal text-gray-700">
          {user instanceof Array &&
            user?.map((user: User, index: number) => (
              <tr
                key={index}
                className="py-10 text-center border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="px-4 py-4">
                  <p>{user?.id}</p>
                </td>
                <td className="px-4 py-4 text-start">
                  <div className="flex flex-row items-center justify-center gap-4">
                    <div className="flex w-10 h-10">
                      <Image
                        alt="profil"
                        src={user?.image ? user?.image : ""}
                        className="object-cover w-10 h-10 mx-auto rounded-md"
                      />
                    </div>
                    <div className="flex-1 w-48 pl-1">
                      <p className="font-medium dark:text-white">
                        {user?.name}
                      </p>
                      <p className="text-sm">{user?.nim}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <p className="w-48">{user?.email}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="w-32">{user?.phone_number}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="w-32">{user?.major}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="w-16">{user?.role}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="w-16">{user?.coin}</p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
