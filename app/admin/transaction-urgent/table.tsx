"use client";
import { Image } from "@nextui-org/react";
import ActionButtonComponent from "./actionButton";
import { Mentor, Transaction, User } from "@prisma/client";
import UpdateForm from "./updateForm";

type TableProps = {
  transactions: Transaction;
};

interface TransactionExtends extends Transaction {
  User: User;
  mentor: Mentor;
  error: unknown;
}

export default function Table({ transactions }: TableProps) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const colorStatus = {
    Menunggu: "text-yellow-600",
    Berlangsung: "text-blue-600",
    Selesai: "text-green-600",
    Gagal: "text-red-600",
  };

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border border-collapse table-auto">
        <thead className="">
          <tr className="text-base font-bold text-center border-b-2 border-blue-500 bg-gray-50">
            <th className="px-4 py-3 border-b-2 border-blue-500">Status</th>
            <th className="px-4 py-3 border-b-2 border-blue-500">
              Transaction Number
            </th>
            <th className="px-4 py-3 border-b-2 border-blue-500">Pesan</th>
            <th className="px-4 py-3 border-b-2 border-blue-500">Mentor</th>
            <th className="px-4 py-3 border-b-2 border-blue-500">Mentee</th>
            <th className="px-4 py-3 border-b-2 border-blue-500">Action</th>
            <th className="px-4 py-3 border-b-2 border-blue-500">Tanggal</th>
            <th className="px-4 py-3 border-b-2 border-blue-500">Jam</th>
            <th className="px-4 py-3 border-b-2 border-blue-500">Lokasi</th>
            <th className="px-4 py-3 border-b-2 border-blue-500">
              Detail Lokasi
            </th>
            <th className="px-4 py-3 border-b-2 border-blue-500">
              Update Detail Lokasi
            </th>
            <th className="px-4 py-3 border-b-2 border-blue-500">
              Jumlah Partisipan
            </th>
            <th className="px-4 py-3 border-b-2 border-blue-500">
              Topik Mentoring
            </th>
            <th className="px-4 py-3 border-b-2 border-blue-500">
              Review Mentor
            </th>
            <th className="px-4 py-3 border-b-2 border-blue-500">
              Tanggal Pemesanan
            </th>
          </tr>
        </thead>
        <tbody className="text-sm font-normal text-gray-700">
          {transactions instanceof Array &&
            transactions?.map(
              (transaction: TransactionExtends, index: number) => (
                <tr
                  key={index}
                  className="py-10 text-center border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="px-4 py-4">
                    <p
                      className={`text-sm font-medium w-28  ${
                        // @ts-ignore
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
                    <p className="w-32">
                      {transaction?.message && transaction?.message}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-start">
                    <div className="flex flex-row items-center justify-center gap-4">
                      <div className="flex w-10 h-10">
                        <Image
                          alt="profil"
                          src={
                            transaction?.mentor?.image
                              ? transaction?.mentor?.image
                              : ""
                          }
                          className="object-cover w-10 h-10 mx-auto rounded-md"
                        />
                      </div>
                      <div className="flex-1 w-48 pl-1">
                        <p className="font-medium dark:text-white">
                          {transaction?.mentor?.name}
                        </p>
                        <p className="text-sm">
                          {transaction?.mentor?.phone_number}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-start">
                    <div className="flex flex-row items-center justify-center gap-4">
                      <div className="flex w-10 h-10">
                        <Image
                          alt="profil"
                          src={transaction?.User?.image}
                          className="object-cover w-10 h-10 mx-auto rounded-md"
                        />
                      </div>
                      <div className="flex-1 w-48 pl-1">
                        <p className="font-medium dark:text-white">
                          {transaction?.User?.name}
                        </p>
                        <p className="text-sm">
                          {transaction?.User?.phone_number
                            ? transaction?.User?.phone_number
                            : transaction?.User?.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-start">
                    <ActionButtonComponent
                      id={transaction?.id}
                      status={transaction?.status ? transaction?.status : ""}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <p className="w-20 font-medium dark:text-white">
                      {/* @ts-ignore */}
                      {transaction?.date && transaction?.date.toLocaleDateString("id-ID", options)}
                    </p>
                  </td>
                  <td className="px-4 py-4 ">
                    <p className="text-sm">{transaction?.time}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-medium dark:text-white">
                      {transaction?.location}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="w-32">{transaction?.location_detail}</p>
                  </td>
                  <td className="px-4 py-4">
                    <UpdateForm id={transaction?.id} />
                  </td>
                  <td className="px-4 py-4">
                    <p>{transaction?.participant}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="w-32">{transaction?.mentoring_topic}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="w-32">
                      {transaction?.review && transaction?.review}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <p>
                      {/* @ts-ignore */}
                      {(transaction?.createdAt).toLocaleDateString("id-ID",options
                      )}
                    </p>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
}
