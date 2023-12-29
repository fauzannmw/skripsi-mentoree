"use client";

import {
  createMidtransToken,
  updateUserCoin,
} from "@/server/transaction_action";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { coin } from "./coin";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { toast } from "sonner";

const FormDataSchema = z.object({
  nim: z
    .string({
      required_error:
        "Silahkan Isi Nim Anda Terlebih Dahulu di halaman Profile",
      invalid_type_error:
        "Silahkan Isi Nim Anda Terlebih Dahulu di halaman Profile",
    })
    .min(1, { message: "Silahkan Login Terlebih Dahulu" }),
  phone_number: z
    .string({
      required_error:
        "Silahkan Isi Nomor Ponsel Anda Terlebih Dahulu di halaman Profile",
      invalid_type_error:
        "Silahkan Isi Nomor Ponsel Anda Terlebih Dahulu di halaman Profile",
    })
    .min(1, { message: "Silahkan Login Terlebih Dahulu" }),
  price: z
    .string({
      invalid_type_error: "Silahkan pilih jumlah Coin yang ingin Anda Beli",
    })
    .min(1, { message: "Silahkan pilih jumlah Coin yang ingin Anda Beli" }),
});

export type Inputs = z.infer<typeof FormDataSchema>;

export interface FormProps {
  profile: User;
}

export default function Form({ profile }: FormProps) {
  const [isloading, setLoading] = useState(false);
  const [price, setPrice] = useState("0");
  const [token, setToken] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      phone_number: profile?.phone_number as string,
      nim: profile?.nim as string,
      price: "",
    },
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const result = await createMidtransToken(data as Inputs);
    setToken(result);

    //@ts-ignore
    window.snap.pay(result, {
      onSuccess: async function (result: string) {
        /* You may add your own implementation here */
        await updateUserCoin(price);
        setLoading(false);
        alert("Pembayaran Berhasil");
        toast.success("Pembayaran Berhasil");
      },
      onPending: function (result: string) {
        /* You may add your own implementation here */
        setLoading(false);
        toast(
          "Menunggu pembayaran, silahkan lapor Admin apabila coin tidak bertambah"
        );
      },
      onError: function (result: string) {
        /* You may add your own implementation here */
        setLoading(false);
        toast("Pembayaran Gagal");
      },
      onClose: function () {
        /* You may add your own implementation here */
        setLoading(false);
        toast("Pembayaran gagal karena kamu menutup jendela pembayaran");
      },
    });
  };

  function numberWithCommas(price: number) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  useEffect(() => {
    errors?.nim
      ? toast(errors?.nim?.message, { position: "top-center" })
      : toast.dismiss();
    errors?.phone_number
      ? toast(errors?.phone_number?.message, { position: "top-center" })
      : toast.dismiss();
    errors?.price
      ? toast(errors?.price?.message, { position: "top-center" })
      : toast.dismiss();
  }, [errors?.nim, errors?.phone_number, errors?.price]);

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT;
    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey as string);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <form
      onSubmit={handleSubmit(processForm)}
      className="flex flex-col justify-between "
    >
      <div className="grid grid-cols-2 gap-4 my-4">
        {coin?.map((coin, index: number) => (
          <label key={index} className="cursor-pointer">
            <input
              type="radio"
              className="sr-only peer"
              value={coin.price}
              {...register("price")}
              onChange={(e) => setPrice(e.target.value)}
            />
            <div className="w-full h-full max-w-md px-3 py-2 text-gray-600 transition-all rounded-md ring-2 ring-gray-600 hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
              <div className="flex flex-col justify-between gap-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold ">
                    {coin.coin} Coin + {coin.bonus} Bonus
                  </p>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
                    />
                  </svg>
                </div>
                <div className="">
                  <p>
                    <span className="text-lg font-bold">Rp.</span>&nbsp;
                    {numberWithCommas(coin.price)}
                  </p>
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col w-full p-8 font-medium sm:p-16">
        <div className="flex justify-between">
          <p>Total Pembayaran</p>
          <p className="">
            <span className="text-lg font-bold">Rp. </span>
            {price !== "0" ? numberWithCommas(parseInt(price)) : "0"}
          </p>
        </div>
        {/* <p className="text-sm font-semibold text-red-600">
          {errors.nim && <span>{errors.nim?.message}</span>}
        </p>
        <p className="text-sm font-semibold text-red-600">
          {errors.phone_number && <span>{errors.phone_number?.message}</span>}
        </p>
        <p className="text-sm font-semibold text-red-600">
          {errors.price && <span>{errors.price?.message}</span>}
        </p> */}
        <Button
          isLoading={isloading}
          color="primary"
          className="font-medium"
          type="submit"
        >
          Lanjutkan Pembayaran
        </Button>
      </div>
    </form>
  );
}
