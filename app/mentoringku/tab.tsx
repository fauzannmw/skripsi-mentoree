"use client";
import { Link } from "@nextui-org/link";
import { Fragment, useState } from "react";

interface TabProps {
  page: string;
}

const style = {
  active: "border-blue-600  dark:border-blue-500",
  nonActive: "border-gray-200  hover:border-blue-600",
};

export default function Tab({ page }: TabProps) {
  const [active, setActive] = useState<string>(page);
  return (
    <Fragment>
      <ul className="grid w-full grid-cols-4 gap-4 font-medium text-center text-gray-500 sm:text-sm dark:text-gray-400">
        <li
          className={`${
            page === "Menunggu"
              ? " border-blue-600  dark:border-blue-500"
              : " border-gray-200  hover:border-blue-600"
          } flex items-center justify-center w-full py-2 border-b-2 me-2 rounded-t-lg group`}
        >
          <Link
            href="/mentoringku/waiting"
            className={`${
              page === "Belum Diterima"
                ? "text-blue-600 dark:text-blue-500"
                : "text-gray-600 hover:text-blue-600 dark:hover:text-gray-300"
            }`}
            aria-current="page"
          >
            Menunggu
          </Link>
        </li>
        <li
          className={`${
            page === "Berlangsung"
              ? "border-blue-600  dark:border-blue-500"
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
