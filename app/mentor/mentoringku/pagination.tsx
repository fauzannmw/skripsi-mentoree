import { ReactNode, useRef } from "react";
import { getTotalTransaction } from "@/server/transaction_action";

export default async function PaginationComponent() {
  const totalData = await getTotalTransaction();

  return (
    <div className="flex flex-col items-center justify-center w-full gap-2 px-4 py-2 text-sm text-gray-500">
      <p className="flex">
        Menampilkan&nbsp;
        <span className="font-bold">
          10 dari {totalData as number as ReactNode}
        </span>
        &nbsp; Transaksi
      </p>
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
  );
}
