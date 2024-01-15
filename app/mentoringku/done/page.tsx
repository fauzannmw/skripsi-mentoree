import { getTransactionByStatus } from "@/server/transaction_action";
import Tab from "../tab";
import MentoringCardComponent from "@/components/card-mentoring";

export default async function TransactionPage() {
  const transaction = await getTransactionByStatus("Selesai");

  return (
    <div className="flex flex-col w-full gap-4 my-4 select-none">
      <div className="flex flex-col w-full">
        <h1 className="text-lg font-bold">Histori Mentoring</h1>
      </div>
      <div className="flex flex-col w-full gap-4 px-4 py-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-black">
        <Tab page="Selesai" />
        <div className="flex flex-col gap-4">
          {/* @ts-ignore */}
          {transaction?.map((transaction, index: number) => (
            <MentoringCardComponent
              data={transaction}
              role="user"
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
