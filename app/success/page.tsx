import { getMentorByNim, getProfileUser } from "@/server/get_action";

// @ts-ignore
export default async function CheckoutPage({ params }) {
  const mentorData = (await getMentorByNim(params.id)).detail;
  const userData = (await getProfileUser()).detail;

  console.log(mentorData);

  return (
    <div className="flex flex-col justify-between gap-2 select-none"></div>
  );
}
