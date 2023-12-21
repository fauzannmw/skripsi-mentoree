"use server";

// @ts-ignore
import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

import { redirect } from "next/navigation";
import prisma from "./database";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { User } from "@prisma/client";

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SECRET,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT,
});

export async function createMidtransTokens(params: any) {
  const id = ~~(Math.random() * 1000000000);
  const name = "Pembelian " + params.coin + " Mentoree Coin";
  const coin = params.coin;
  let bonus;
  let price;

  switch (coin) {
    case "1":
      bonus = 0;
      price = 15000;
      break;
    case "4":
      bonus = 1;
      price = 60000;
      break;
    case "10":
      bonus = 3;
      price = 150000;
      break;
    case "15":
      bonus = 4;
      price = 225000;
      break;
    case "20":
      bonus = 7;
      price = 300000;
      break;
    case "35":
      bonus = 10;
      price = 500000;
      break;
    default:
      bonus = 0;
      price = 0;
  }

  const parameter = {
    item_details: {
      name: name,
      coin: coin,
      bonus: bonus,
      price: price,
      quantity: 1,
    },
    transaction_details: {
      order_id: id,
      gross_amount: price,
    },
  };

  const token = await snap.createTransactionToken(parameter);
  return token;
}

export async function createMidtransToken(e: FormData) {
  const id = ~~(Math.random() * 1000000000);

  // const name = "Produk " + e.get("coin")?.toString();
  const name = "Produk Coin 4";

  const price = Number(e.get("price"));

  const parameter = {
    item_details: {
      name: name,
      coin: 4,
      bonus: 1,
      price: price,
      quantity: 1,
    },
    transaction_details: {
      order_id: id,
      gross_amount: price,
    },
  };

  const token = await snap.createTransactionToken(parameter);
  return token;
}

export const updateProfile = async (params: User) => {
  const session = await getServerSession(authOptions);

  const data = {
    major: params.major,
    nim: params.nim,
  };
  await prisma.user.update({
    where: {
      email: session?.user?.email,
    },
    data: data,
  });

  return redirect("/profile");
};

export const createTransaction = async (e: FormData) => {
  const session = await getServerSession(authOptions);

  await prisma.user.update({
    where: { email: session?.user?.email },
    data: {
      coin: { decrement: 1 },
      transaction: {
        create: [
          {
            mentorNim: e.get("mentorNim")?.toString(),
            date: e.get("date")?.toString(),
            time: e.get("time")?.toString(),
            location: e.get("location")?.toString(),
            participant: e.get("participant")?.toString(),
            mentoring_topic: e.get("mentoring_topic")?.toString(),
          },
        ],
      },
    },
  });

  return redirect("/transaction");
};

export const changeTransactionStatus = async (e: FormData) => {
  await prisma.transaction.update({
    where: {
      id: e.get("transactionId")?.toString(),
    },
    data: {
      status: "Selesai",
    },
  });

  return redirect("/transaction");
};

export const updateFilter = async (e: FormData) => {
  const courseFilter = e.getAll("course");
  const genderFilter = e.getAll("gender");
  const locationFilter = e.getAll("location");

  if (courseFilter || genderFilter || locationFilter) {
    const courseParams = new URLSearchParams([
      ["course", courseFilter.join(",")],
    ]);
    const genderParams = new URLSearchParams([
      ["gender", genderFilter.join(",")],
    ]);
    const locationParams = new URLSearchParams([
      ["location", locationFilter.join(",")],
    ]);
    redirect(`/explore?${courseParams}&${genderParams}&${locationParams}`);
  }

  redirect("/explore");
};

// export const register = async (e: FormData) => {
//   const data = {
//     name: e.get("name")?.toString(),
//     nim: e.get("nim")?.toString(),
//     major: e.get("major")?.toString(),
//     email: e.get("email")?.toString(),
//     password: e.get("password")?.toString(),
//   };
//   // @ts-ignore
//   await prisma.mentee.create({ data: data });
//   // cookies().set("nim", e.get("nim") as string);
//   return redirect("/signin");
// };

// export const login = async (e: FormData) => {
//   const mentee = await prisma.mentee.findUnique({
//     where: {
//       //@ts-ignore
//       nim: e.get("nim")?.toString(),
//     },
//   });

//   if (e.get("nim") === mentee?.nim && e.get("password") === mentee?.password) {
//     cookies().set("nim", mentee.nim);
//     return { mentee };
//     // return redirect("/");
//   }

//   return;
// };

// export const logout = async () => {
//   cookies().delete("nim");
//   redirect("/signin");
// };
