import { getTransactionByStatus } from "@/server/transaction_action";
import Tab from "../tab";
import MentoringCardComponent from "@/components/card-mentoring";

import { Mentor, Transaction, User } from "@prisma/client";

interface transactionExtends extends Transaction {
  User: User;
  mentor: Mentor;
  error: unknown;
}

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
          {transaction instanceof Array &&
            transaction?.map((transaction, index: number) => (
              <MentoringCardComponent
                data={transaction as transactionExtends}
                role="user"
                key={index}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
