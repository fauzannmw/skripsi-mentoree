"use server";

// @ts-ignore
import Midtrans from "midtrans-client";

import { redirect } from "next/navigation";
import prisma from "./database";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getProfileUser } from "./get_action";
import { Inputs } from "@/app/coin/form";

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SECRET,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT,
});

export async function createMidtransToken(params: Inputs) {
  const customer_detail = (await getProfileUser()).detail;

  const id = ~~(Math.random() * 1000000000);
  const price = parseInt(params.price);

  const coins = await getBonusAndCoin(price);

  const item_id = "Coin 0-" + coins.coin + " Mentoree";
  const name = "Pembelian " + coins.coin + " Mentoree Coin";

  const parameter = {
    item_details: {
      id: item_id,
      name: name,
      coin: coins.coin,
      price: price,
      quantity: 1,
    },
    transaction_details: {
      order_id: id,
      gross_amount: price,
    },
    customer_details: {
      first_name: customer_detail?.name,
      email: customer_detail?.email,
      nim: customer_detail?.nim,
    },
  };

  const token = await snap.createTransactionToken(parameter);
  return token;
}

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

  return redirect("/mentoringku");
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

  return redirect("/mentoringku");
};

export const AdminchangeTransactionStatus = async (
  id: string,
  status: string,
  message: string
) => {
  const session = await getServerSession(authOptions);

  await prisma.transaction.update({
    where: {
      id: id,
    },
    data: {
      status: status,
      message: message,
    },
  });

  if (session?.user?.role === "admin") {
    return redirect("/admin/transaction");
  } else if (session?.user?.role === "mentor") {
    return redirect("/mentor/mentoringku");
  } else {
    redirect("/mentoringku");
  }
};

export const updateUserCoin = async (params: string) => {
  const session = await getServerSession(authOptions);

  const price = parseInt(params);

  const coins = await getBonusAndCoin(price);

  await prisma.user.update({
    where: { email: session?.user?.email },
    data: {
      coin: { increment: coins?.coin },
    },
  });

  return redirect("/profile");
};

export const getBonusAndCoin = async (price: number) => {
  let bonus;
  let coin;

  try {
    switch (price) {
      case 15000:
        bonus = 0;
        coin = 1;
        break;
      case 60000:
        bonus = 1;
        coin = 4;
        break;
      case 150000:
        bonus = 3;
        coin = 10;
        break;
      case 225000:
        bonus = 4;
        coin = 15;
        break;
      case 300000:
        bonus = 7;
        coin = 20;
        break;
      case 500000:
        bonus = 10;
        coin = 35;
        break;
      default:
        bonus = 0;
        coin = 0;
    }
    coin = coin + bonus;
    return { coin };
  } catch (error) {
    return { error };
  }
};
