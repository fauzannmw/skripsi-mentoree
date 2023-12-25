import { IoMdPrint } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { getTransactionByMentor } from "@/server/transaction_action";
import TransactionCardComponent from "@/components/transaction-card";

export default async function MentorTransactionPage() {
  const transactionData = await getTransactionByMentor();

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-4 mx-auto sm:w-1/2">
      <div className="flex items-center justify-between w-full px-4 py-2">
        <h1 className="text-xl font-bold">Histori Mentoring</h1>
        <Button className="px-2 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
          <IoMdPrint />
        </Button>
      </div>
      {/* @ts-ignore */}
      {transactionData?.map((transaction, index: number) => (
        <TransactionCardComponent
          data={transaction}
          role="mentor"
          key={index}
        />
      ))}
    </div>
  );
}
