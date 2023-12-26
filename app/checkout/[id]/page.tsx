import { getMentorById, getProfileUser } from "@/server/get_action";
import Detail from "../detail";
import Form from "../form";
import SummaryComponent from "../order";

// @ts-ignore
export default async function CheckoutPage({ params }) {
  const mentorData = (await getMentorById(params.id)).detail;
  const userData = (await getProfileUser()).detail;

  return <SummaryComponent />;
}
