"use client";

import { createMidtransToken, updateUserCoin } from "@/server/post_action";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { coin } from "./coin";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";

const FormDataSchema = z.object({
  nim: z.string().min(1, { message: "Silahkan Login Terlebih Dahulu" }),
  price: z
    .string()
    .min(1, { message: "Silahkan pilih jumlah Coin yang ingin Anda Beli" }),
});

export type Inputs = z.infer<typeof FormDataSchema>;

export interface FormProps {
  profile: User;
}

export default function Form({ profile }: FormProps) {
  const [price, setPrice] = useState("0");
  const [token, setToken] = useState("");
  console.log("token : ", token);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      nim: profile?.nim as string,
      price: "",
    },
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    // @ts-ignore
    const result = await createMidtransToken(data);
    setToken(result);
    console.log(result);

    //@ts-ignore
    window.snap.pay(result, {
      onSuccess: async function (result: string) {
        /* You may add your own implementation here */
        await updateUserCoin(price);
        alert("payment success!");
        console.log(result);
      },
      onPending: function (result: string) {
        /* You may add your own implementation here */
        alert("wating your payment!");
        console.log(result);
      },
      onError: function (result: string) {
        /* You may add your own implementation here */
        alert("payment failed!");
        console.log(result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert("you closed the popup without finishing the payment");
      },
    });
  };

  function numberWithCommas(price: number) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

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
            <div className="w-full max-w-md px-3 py-2 text-gray-600 transition-all rounded-md ring-2 ring-gray-600 hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
              <div className="flex flex-col gap-1">
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
      <div className="absolute inset-x-0 bottom-0 flex flex-col w-full p-16 font-medium">
        <div className="flex justify-between">
          <p>Total Pembayaran</p>
          <p className="">
            <span className="text-lg font-bold">Rp. </span>
            {price !== "0" ? numberWithCommas(parseInt(price)) : "0"}
          </p>
        </div>
        <Button className="font-medium" type="submit">
          Lanjutkan Pembayaran
        </Button>
        {errors.nim && <span>{errors.nim.message}</span>}
        {errors.price && <span>{errors.price.message}</span>}
      </div>
    </form>
  );
}
