import { getMentorByNim } from "@/server/get_action";
import { Image } from "@nextui-org/image";

// @ts-ignore
export default async function DetailPage({ params }) {
  const mentorData = await getMentorByNim(params.id);
  const courses = mentorData?.detail?.course;
  const courses_day = mentorData?.detail?.course_day;

  return (
    <div className="flex flex-wrap mx-auto">
      <Image
        alt="mentor-image"
        className="object-cover object-center w-full border border-gray-200 rounded lg:w-1/2"
        src="https://www.whitmorerarebooks.com/pictures/medium/2465.jpg"
      />
      <div className="w-full mt-6 lg:w-1/2 lg:py-6 lg:mt-0">
        <h2 className="text-sm tracking-widest text-gray-500 title-font">
          {mentorData?.detail?.major}
        </h2>
        <div className="flex justify-between">
          <h1 className="mb-1 text-3xl font-medium text-gray-900 title-font">
            {mentorData?.detail?.name}
          </h1>
          <button className="inline-flex items-center justify-center w-10 h-10 p-0 ml-4 text-gray-500 bg-gray-200 border-0 rounded-full">
            <svg
              fill="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button>
        </div>
        <div className="flex mb-4">
          <span className="flex items-center">
            <svg
              fill="currentColor"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 text-red-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg
              fill="currentColor"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 text-red-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg
              fill="currentColor"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 text-red-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg
              fill="currentColor"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 text-red-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 text-red-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="ml-3 text-gray-600">5 Reviews</span>
          </span>
        </div>
        <p className="leading-relaxed">
          Fam locavore kickstarter distillery. Mixtape chillwave tumeric
          sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps
          cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine
          tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean
          shorts keytar banjo tattooed umami cardigan.
        </p>
        <div className="py-3 my-8 border-t border-bg-gray-300 dark:border-gray-700">
          <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
            Bahasa Pemrograman
          </h2>
          <div className="flex flex-wrap -mb-2">
            {courses?.map((course, index) => (
              <button
                key={index}
                className="px-2 py-1 mb-2 mr-1 border hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400"
              >
                {course?.course}
              </button>
            ))}
          </div>
        </div>
        <div className="py-3 my-8 border-t border-gray-300 dark:border-gray-700">
          <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
            Hari Mengajar
          </h2>
          <div className="flex flex-wrap -mb-2">
            {courses_day?.map((course_day, index) => (
              <button
                key={index}
                className="px-2 py-1 mb-2 mr-1 border hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400"
              >
                {course_day?.day}
              </button>
            ))}
          </div>
        </div>
        <div className="flex">
          <span className="flex items-center text-2xl font-medium text-gray-900 gap-x-1 title-font">
            <h1>1</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="py-1 bi bi-coin"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z" />{" "}
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
            </svg>
          </span>
          <button className="flex px-6 py-2 ml-auto text-white bg-red-500 border-0 rounded focus:outline-none hover:bg-red-600">
            Pesan
          </button>
        </div>
      </div>
    </div>
  );
}
