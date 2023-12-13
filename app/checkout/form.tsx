"use client";

import { Button } from "@nextui-org/react";
import { BsCoin } from "react-icons/bs";

import { useState } from "react";

export default function Form() {
  const [location, setLocation] = useState("-");

  return (
    <form action="" method="POST">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">Lokasi Mentoring : {location}</p>
          <div className="flex gap-4">
            <label className="cursor-pointer">
              <input
                type="radio"
                className="sr-only peer"
                name="location"
                value={"Daring"}
                onChange={(e) => setLocation(e.target.value)}
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
                onChange={(e) => setLocation(e.target.value)}
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
                value={"2"}
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
                value={"6"}
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
            id="message"
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
        <Button className="font-medium" type="submit">
          Lanjutkan Pembayaran
        </Button>
      </div>
      {/* <div className="absolute inset-x-0 bottom-0 flex items-center justify-between w-full p-8 font-medium bg-gray-100">
        <p>
          <span className="font-semibold">1 Coin</span> / Jam
        </p>
        <Button className="font-medium" type="submit">
          Lanjutkan Pembayaran
        </Button>
      </div> */}
    </form>
  );
}
