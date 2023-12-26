"use client";
import {
  Image,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { BsGenderMale } from "react-icons/bs";
import Forms from "./forms";

export default function SummaryComponent() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Order summary</h2>
        <h2 className="text-sm font-semibold">Coin Anda : 1</h2>
      </div>
      <div className="flex flex-col w-full gap-4 px-4 py-6 mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex">
          <div className="flex-shrink-0 w-16 h-16">
            <Image
              src="https://images.unsplash.com/photo-1518288774672-b94e808873ff?q=80&w=2718&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Front of men&#039;s Basic Tee in black."
              className="w-16 h-16 rounded-md"
            />
          </div>
          <div className="flex-1 w-full ml-6 ">
            <div className="flex items-center justify-between">
              <div className="flex flex-col flex-1 gap-2">
                <h4 className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-gray-700 hover:text-gray-800"
                  >
                    Muhamad Fauzan
                  </a>
                </h4>
                <div className="flex gap-2">
                  <p className="px-3 text-sm text-gray-500 bg-white border border-gray-200 rounded-md py-0.5">
                    Kotlin
                  </p>
                  <p className="px-3 text-sm text-gray-500 bg-white border border-gray-200 rounded-md py-0.5">
                    Java
                  </p>
                </div>
              </div>
              <div className=" bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500">
                <span className="sr-only">Gender</span>
                <BsGenderMale />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 border-gray-200 sm:px-6">
          <div className="flex items-center justify-between text-sm">
            <p>Hari Mengajar</p>
            <p className="font-medium ">Senin</p>
          </div>
          <div className="flex items-center justify-between text-sm">
            <p>Siang</p>
            <p className="font-medium ">Senin</p>
          </div>
          <div className="flex items-center justify-between py-4 text-sm border-gray-200 border-y">
            <p>Harga / Jam</p>
            <p className="font-medium ">1 Coin</p>
          </div>
        </div>
        <div>
          <h1 className="font-semibold">Form Pemesanan</h1>
          <Forms />
        </div>
      </div>
    </div>
  );
}
