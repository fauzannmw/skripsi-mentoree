import { Link } from "@nextui-org/link";
import { Fragment } from "react";

interface TabProps {
  page: string;
}

export default async function Tab({ page }: TabProps) {
  return (
    <Fragment>
      <ul className="grid w-full grid-cols-3 gap-4 text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li
          className={`${
            page === "Berlangsung"
              ? " border-blue-600  dark:border-blue-500"
              : " border-gray-200  hover:border-blue-600"
          } flex items-center justify-center w-full py-2 border-b-2 me-2 rounded-t-lg group`}
        >
          <Link
            href="/mentoringku"
            className={`${
              page === "Berlangsung"
                ? "text-blue-600 dark:text-blue-500"
                : "text-gray-600 hover:text-blue-600 dark:hover:text-gray-300"
            }`}
            aria-current="page"
          >
            Berlangsung
          </Link>
        </li>
        <li
          className={`${
            page === "Selesai"
              ? " border-blue-600  dark:border-blue-500"
              : " border-gray-200  hover:border-blue-600"
          } flex items-center justify-center w-full py-2 border-b-2 me-2 rounded-t-lg group`}
        >
          <Link
            href="/mentoringku/done"
            className={`${
              page === "Selesai"
                ? "text-blue-600 dark:text-blue-500"
                : "text-gray-600 hover:text-blue-600 dark:hover:text-gray-300"
            }`}
          >
            Selesai
          </Link>
        </li>
        <li
          className={`${
            page === "Gagal"
              ? " border-blue-600  dark:border-blue-500"
              : " border-gray-200  hover:border-blue-600"
          } flex items-center justify-center w-full py-2 border-b-2 me-2 rounded-t-lg group`}
        >
          <Link
            href="/mentoringku/failed"
            className={`${
              page === "Gagal"
                ? "text-blue-600 dark:text-blue-500"
                : "text-gray-600 hover:text-blue-600 dark:hover:text-gray-300"
            }`}
          >
            Gagal
          </Link>
        </li>
      </ul>
    </Fragment>
  );
}
