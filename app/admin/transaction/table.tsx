"use client";
import { Button, Image } from "@nextui-org/react";
import { Fragment } from "react";
import ActionButtonComponent from "./actionButton";
import { Transaction } from "@prisma/client";

type TableProps = {
  transactions: Transaction;
};

export default function Table({ transactions }: TableProps) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const colorStatus = {
    "Belum diterima Mentor": "text-yellow-600",
    Berlangsung: "text-green-600",
    Selesai: "text-green-600",
    Gagal: "text-red-600",
  };

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border border-collapse table-auto">
        <thead className="">
          <tr className="text-base font-bold text-center border-b-2 border-blue-500 bg-gray-50">
            <th className="px-4 py-3 border-b-2 border-blue-500">Mentor</th>
            <th className="px-4 py-3 border-b-2 border-blue-500">Mentee</th>
            <th className="px-4 py-3 border-b-2 border-blue-500">Action</th>
            <th className="px-4 py-3 border-b-2 border-blue-500">Status</th>
            <th className="px-4 py-3 border-b-2 border-blue-500">
              Transaction Number
            </th>
            <th className="px-4 py-3 border-b-2 border-blue-500">Tanggal</th>
            <th className="px-4 py-3 border-b-2 border-blue-500">Lokasi</th>
            <th className="px-4 py-3 border-b-2 border-blue-500">
              Jumlah Partisipan
            </th>
            <th className="px-4 py-3 border-b-2 border-blue-500">
              Topik Mentoring
            </th>
            <th className="px-4 py-3 border-b-2 border-blue-500">
              Purchased On
            </th>
          </tr>
        </thead>
        <tbody className="text-sm font-normal text-gray-700">
          {/* @ts-ignore */}
          {transactions?.map((transaction, index: number) => (
            <tr
              key={index}
              className="py-10 border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="flex flex-row items-center justify-center px-4 py-4">
                <div className="flex w-10 h-10 mr-4">
                  <a href="#" className="relative block">
                    <Image
                      alt="profil"
                      src={transaction?.mentor?.image}
                      className="object-cover w-10 h-10 mx-auto rounded-md"
                    />
                  </a>
                </div>
                <div className="flex-1 pl-1 ">
                  <p className="font-medium dark:text-white">
                    {transaction?.mentor?.name}
                  </p>
                  <p className="text-sm">{transaction?.mentor?.phone_number}</p>
                </div>
              </td>
              <td className="px-4 py-4">
                <p className="font-medium dark:text-white">
                  {transaction?.User?.name}
                </p>
                <p className="text-sm"> {transaction?.User?.email}</p>
              </td>
              <td className="px-4 py-4">
                <ActionButtonComponent
                  id={transaction?.id}
                  status={transaction?.status}
                />
              </td>
              <td className="px-4 py-4">
                <p
                  className={`text-sm font-medium  ${
                    colorStatus[transaction?.status]
                  }`}
                >
                  {transaction?.status}
                </p>
              </td>
              <td className="px-4 py-4">
                <p>{transaction?.id}</p>
              </td>
              <td className="px-4 py-4">
                <div className="flex-1 pl-1 ">
                  <p className="font-medium dark:text-white">
                    {transaction?.date}
                  </p>
                  <p className="text-sm">{transaction?.time}</p>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex-1 pl-1 ">
                  <p className="font-medium dark:text-white">
                    {transaction?.location}
                  </p>
                  <p className="text-sm">{transaction?.location}</p>
                </div>
              </td>
              <td className="px-4 py-4">
                <p>{transaction?.participant}</p>
              </td>
              <td className="px-4 py-4">
                <p>{transaction?.mentoring_topic}</p>
              </td>
              <td className="px-4 py-4">
                <p>
                  {(transaction?.createdAt).toLocaleDateString(
                    "en-US",
                    options
                  )}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
