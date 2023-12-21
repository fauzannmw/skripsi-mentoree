"use client";

import { Button, Link } from "@nextui-org/react";
import { BsCoin } from "react-icons/bs";
import { createTransaction } from "@/server/post_action";
import { Mentor, User } from "@prisma/client";

interface FormProps {
  mentor: Mentor;
  user: User;
}

export default function Form({ mentor, user }: FormProps) {
  return (
    <form action={createTransaction} method="POST">
      <input
        type="text"
        className="sr-only peer"
        name="mentorNim"
        value={mentor?.nim as string}
      />
      <input
        type="text"
        className="sr-only peer"
        name="userNim"
        value={user?.nim as string}
      />
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold">Waktu dan Tanggal Mentoring</p>
        <div className="flex gap-4">
          <input
            type="date"
            className="block w-full px-2.5 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date"
            name="date"
          />
          <input
            type="time"
            className="block w-full px-2.5 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select time"
            name="time"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">Lokasi Mentoring</p>
          <div className="flex gap-4">
            <label className="cursor-pointer">
              <input
                type="radio"
                className="sr-only peer"
                name="location"
                value={"Daring"}
              />
              <div className="px-3 py-2 rounded-md ring-1 ring-zinc-300 peer-checked:text-sky-600 bg-zinc-300 peer-checked:ring-blue-400">
                <p className="text-xs font-semibold">Daring</p>
              </div>
            </label>
            <label className="cursor-pointer">
              <input
                type="radio"
                className="sr-only peer"
                name="location"
                value={"Luring"}
              />
              <div className="px-3 py-2 rounded-md ring-1 ring-zinc-300 peer-checked:text-sky-600 bg-zinc-300 peer-checked:ring-blue-400">
                <p className="text-xs font-semibold">Luring</p>
              </div>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">Partisipan Mentoring</p>
          <div className="flex gap-4">
            <label className="cursor-pointer">
              <input
                type="radio"
                className="sr-only peer"
                name="participant"
                value={"Private"}
              />
              <div className="px-3 py-2 rounded-md ring-1 ring-zinc-300 peer-checked:text-sky-600 bg-zinc-300 peer-checked:ring-blue-400">
                <p className="text-xs font-semibold">Private</p>
              </div>
            </label>
            <label className="cursor-pointer">
              <input
                type="radio"
                className="sr-only peer"
                name="participant"
                value={"2 - 5 Orang"}
              />
              <div className="px-3 py-2 rounded-md ring-1 ring-zinc-300 peer-checked:text-sky-600 bg-zinc-300 peer-checked:ring-blue-400">
                <p className="text-xs font-semibold">2 - 5 Orang</p>
              </div>
            </label>
            <label className="cursor-pointer">
              <input
                type="radio"
                className="sr-only peer"
                name="participant"
                value={"5 - 10 Orang"}
              />
              <div className="px-3 py-2 rounded-md ring-1 ring-zinc-300 peer-checked:text-sky-600 bg-zinc-300 peer-checked:ring-blue-400">
                <p className="text-xs font-semibold">5 - 10 Orang</p>
              </div>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            Topik Mentoring
          </label>
          <textarea
            name="mentoring_topic"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Isi materi yang ingin anda tanyakan disini"
          ></textarea>
        </div>
      </div>
      <div className="flex items-center justify-between w-full my-8 font-medium ">
        <p className="flex items-center font-semibold">
          1&nbsp;
          <span className="h-3.5">
            <BsCoin />
          </span>
          &nbsp; / Jam
        </p>
        {user?.coin != 0 ? (
          <Button className="font-medium" type="submit">
            Lanjutkan Pembayaran
          </Button>
        ) : (
          <Link href="/coin">
            <Button className="font-medium text-red-600" type="submit">
              Lakukan Pembelian Coin
            </Button>
          </Link>
        )}
      </div>
    </form>
  );
}
