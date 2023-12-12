import { getMentorByNim, getProfileUser } from "@/server/get_action";
import Detail from "../detail";
import { Button } from "@nextui-org/button";

// @ts-ignore
export default async function CheckoutPage({ params }) {
  const mentorData = (await getMentorByNim(params.id)).detail;
  const userData = (await getProfileUser()).detail;

  return (
    <form action="" method="POST">
      {/* @ts-ignore */}
      <Detail data={mentorData} user={userData} />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between w-full p-8 font-medium bg-gray-100">
        <p>
          <span className="font-semibold">1 Coin</span> / Jam
        </p>
        <Button className="font-medium" type="submit">
          Lanjutkan Pembayaran
        </Button>
      </div>
    </form>
  );
}
