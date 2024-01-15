import { getActiveTransactionByMentor } from "@/server/transaction_action";
import MentoringCardComponent from "@/components/card-mentoring";

export default async function MentorNotificationPage() {
  const transactionData = await getActiveTransactionByMentor();

  return (
    <div className="flex flex-col w-full gap-4 my-4 select-none">
      <div className="flex flex-col w-full">
        <h1 className="text-lg font-bold">Mentoring Aktif</h1>
      </div>
      <div className="flex flex-col w-full gap-4 px-4 py-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-black">
        <div className="flex flex-col gap-4">
          {/* @ts-ignore */}
          {transactionData?.map((transaction, index: number) => (
            <MentoringCardComponent
              data={transaction}
              role="mentor"
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
