import { getTransactionByStatus } from "@/server/get_action";
import Card from "../card";
import Tab from "../tab";
import TransactionCardComponent from "@/components/transaction-card";

export default async function TransactionPage() {
  const transaction = await getTransactionByStatus("Gagal");

  return (
    <div className="flex flex-col w-full gap-4 my-4 select-none">
      <div className="flex flex-col w-full">
        <Tab page="Gagal" />
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
