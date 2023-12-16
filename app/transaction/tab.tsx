import { Link } from "@nextui-org/link";
import { Fragment } from "react";

export default async function Tab() {
  return (
    <Fragment>
      <ul className="flex flex-wrap justify-around w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li className="me-2">
          <Link
            href="/transaction"
            className="inline-flex items-center justify-center px-8 py-2 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
          >
            Berlangsung
          </Link>
        </li>
        <li className="me-2">
          <Link
            href="/transaction/done"
            className="inline-flex items-center justify-center px-8 py-2 text-gray-600 border-b-2 border-gray-200 rounded-t-lg hover:text-blue-600 hover:border-blue-600 dark:hover:text-gray-300 group"
            aria-current="page"
          >
            Selesai
          </Link>
        </li>
        <li className="me-2">
          <Link
            href="/transaction/failed"
            className="inline-flex items-center justify-center px-8 py-2 text-gray-600 border-b-2 border-gray-200 rounded-t-lg hover:text-blue-600 hover:border-blue-600 dark:hover:text-gray-300 group"
          >
            Gagal
          </Link>
        </li>
      </ul>
    </Fragment>
  );
}
