"use client";
import React, { useState } from "react";
import { Image } from "@nextui-org/image";
import { User } from "@prisma/client";
import { updateProfile } from "@/server/post_action";

export interface FormProps {
  profile: User;
  action: Function;
}

export default function Form({ profile, action }: FormProps) {
  const [major, setMajor] = useState(profile?.major);
  const [nim, setNim] = useState(profile?.nim);

  return (
    <form
      action={updateProfile}
      method="POST"
      className="mx-auto mt-4 max-w-xl sm:mt-20"
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-2 flex justify-center">
          <Image src={profile?.image ?? ""} />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Email
          </label>
          <div className="mt-2.5">
            <input
              type="email"
              name="email"
              id="email"
              value={profile?.email ?? ""}
              disabled
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="name"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Nama
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="name"
              id="name"
              value={profile?.name ?? ""}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="major"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Jurusan
          </label>
          <div className="mt-2.5">
            <select
              name="major"
              id="major"
              value={major ?? ""}
              onChange={(e) => setMajor(e.target.value)}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option disabled value="">
                Pilih Jurusan Anda
              </option>
              <option value="Teknik Informatika">
                Teknik Informatika - FILKOM
              </option>
              <option value="Teknik Elektro">Teknik Elektro - FT</option>
              <option value="Statistika">Statistika - FMIPA</option>
              <option value="Teknologi Informasi">
                Teknologi Informasi - FV
              </option>
              <option value="Teknik Industri Pertanian">
                Teknik Industri Pertanian - FTP
              </option>
            </select>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="nim"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            NIM
          </label>
          <div className="mt-2.5">
            <input
              type="number"
              name="nim"
              id="nim"
              value={nim ?? ""}
              onChange={(e) => setNim(e.target.value)}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <button
          type="submit"
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Update Profil
        </button>
      </div>
    </form>
  );
}
