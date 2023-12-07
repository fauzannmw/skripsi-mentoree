"use client";

import { useState } from "react";

export default function Select() {
  const [major, setMajor] = useState("");
  console.log(major);

  const majorList = [
    { value: "Teknik Informatika", name: "Teknik Informatika - FILKOM" },
    { value: "Teknik Elektro", name: "Teknik Elektro - FT" },
    { value: "Statistika", name: "Statistika - FMIPA" },
    { value: "Teknologi Informasi", name: "Teknologi Informasi - FV" },
    {
      value: "Teknik Industri Pertanian",
      name: "Teknik Industri Pertanian - FTP",
    },
  ];
  return (
    <div>
      <select
        name="major"
        id="major"
        value={major ?? ""}
        onChange={(e) => setMajor(e.target.value)}
        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        {/* <option selected value="">
          Pilih Jurusan
        </option>
        <option value="Teknik Informatika">Teknik Informatika - FILKOM</option>
        <option value="Teknik Elektro">Teknik Elektro - FT</option>
        <option value="Statistika">Statistika - FMIPA</option>
        <option value="Teknologi Informasi">Teknologi Informasi - FV</option>
        <option value="Teknik Industri Pertanian">
          Teknik Industri Pertanian - FTP
        </option> */}
        {majorList.map((major, index) => (
          <option key={index} value={major?.value}>
            {major?.name}
          </option>
        ))}
      </select>
    </div>
  );
}
