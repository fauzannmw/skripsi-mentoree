import { getMentorById, getProfileUser } from "@/server/get_action";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import Form from "../form";
import { Image, Link } from "@nextui-org/react";

// @ts-ignore
export default async function CheckoutPage({ params }) {
  const mentorData = (await getMentorById(params.id)).detail;
  const userData = (await getProfileUser()).detail;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Order summary</h2>
        <h2 className="text-sm font-semibold">Coin Anda : {userData?.coin}</h2>
      </div>
      <div className="flex flex-col w-full gap-4 px-4 py-6 mt-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-black">
        <div className="flex">
          <div className="flex-shrink-0 w-16 h-16">
            <Image
              src={mentorData?.image as string}
              alt="Front of men&#039;s Basic Tee in black."
              className="w-16 h-16 rounded-md"
            />
          </div>
          <div className="flex-1 w-full ml-6 ">
            <div className="flex items-center justify-between">
              <div className="flex flex-col flex-1 gap-2">
                <h4 className="text-sm">
                  <Link
                    href={`/detail/${mentorData?.id}`}
                    className="font-medium text-gray-700 hover:text-gray-800"
                  >
                    {mentorData?.name}
                  </Link>
                </h4>
                <div className="flex gap-2">
                  {mentorData?.course?.map((course, index) => (
                    <p
                      key={index}
                      className="px-3 text-sm text-gray-500 bg-white border border-gray-200 rounded-md py-0.5"
                    >
                      {course?.course}
                    </p>
                  ))}
                </div>
              </div>
              <div className=" bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500">
                <span className="sr-only">Gender</span>
                {mentorData?.gender === "Laki Laki" ? (
                  <BsGenderMale />
                ) : (
                  <BsGenderFemale />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <p>Program Studi Mentor</p>
            <p className="font-medium ">{mentorData?.major}</p>
          </div>
          <div className="flex items-center justify-between text-sm">
            <p>Hari Mengajar</p>
            <p className="font-medium ">
              {mentorData?.course_day?.map((day, index) => (
                <span key={index}>{day?.day}</span>
              ))}
            </p>
          </div>
          <div className="flex items-center justify-between text-sm">
            <p>Sesi</p>
            <p className="font-medium ">
              {mentorData?.course_day?.map((time, index) => (
                <span key={index}>{time?.time}</span>
              ))}
            </p>
          </div>
          <div className="flex items-center justify-between py-4 text-sm border-gray-200 border-y">
            <p>Harga / Jam</p>
            <p className="font-medium ">1 Coin</p>
          </div>
        </div>
        <div>
          <h1 className="font-semibold dark:text-black">Form Pemesanan</h1>
          <Form
            nim={mentorData?.nim as string}
            phone_number={userData?.phone_number as string}
            major={mentorData?.major as string}
            day={mentorData?.course_day[0].day as string}
            time={mentorData?.course_day[0].time as string}
          />
        </div>
      </div>
    </div>
  );
}
