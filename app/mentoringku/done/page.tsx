import { getTransactionByStatus } from "@/server/transaction_action";
import Tab from "../tab";
import TransactionCardComponent from "@/components/transaction-card";

export default async function TransactionPage() {
  const transaction = await getTransactionByStatus("Selesai");

  return (
    <div className="flex flex-col w-full gap-4 my-4 select-none">
      <div className="flex flex-col w-full">
        <Tab page="Selesai" />
      </div>
      <div className="flex flex-col gap-4">
        {/* @ts-ignore */}
        {transaction?.map((transaction, index: number) => (
          <TransactionCardComponent
            data={transaction}
            role="user"
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
