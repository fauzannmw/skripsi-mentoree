import { getProfileUser } from "@/server/get_action";
import Card from "./card";

export default async function TransactionPage() {
  const userData = (await getProfileUser()).detail;
  const transactions = userData?.transaction;

  return (
    <div className="flex flex-col w-full gap-4 my-4 select-none">
      {/* <div className="flex flex-col w-full">
        <Tab />
      </div> */}
      <div className="flex flex-col gap-4">
        {transactions?.map((transaction, index: number) => (
          <Card key={index} data={transaction} />
        ))}
      </div>
    </div>
  );
}
