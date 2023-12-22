import { getTransactionByStatus } from "@/server/get_action";
import Card from "../card";
import Tab from "../tab";

export default async function TransactionPage() {
  const transaction = (await getTransactionByStatus("Selesai")).detail;

  return (
    <div className="flex flex-col w-full gap-4 my-4 select-none">
      <div className="flex flex-col w-full">
        <Tab page="Selesai" />
      </div>
      <div className="flex flex-col gap-4">
        {transaction?.map((transaction, index: number) => (
          <Card key={index} data={transaction} />
        ))}
      </div>
    </div>
  );
}
