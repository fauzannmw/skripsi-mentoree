"use server";

// @ts-ignore
import Midtrans from "midtrans-client";

import { redirect } from "next/navigation";
import prisma from "./database";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getProfileUser } from "./get_action";
import { Inputs } from "@/app/coin/form";
import { CreateTransactionTypes } from "@/app/checkout/forms";
import { TransactionDetailType } from "@/app/admin/transaction/updateForm";

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

export const createTransaction = async (params: CreateTransactionTypes) => {
  const session = await getServerSession(authOptions);

  await prisma.user.update({
    where: { email: session?.user?.email },
    data: {
      coin: { decrement: 1 },
      transaction: {
        create: [
          {
            mentorNim: params.mentorNim,
            date: params.course_day,
            time: params.course_time,
            participant: params.participant,
            location: params.mentoring_location,
            location_detail: params.location_detail,
            mentoring_topic: params.mentoring_topic,
          },
        ],
      },
    },
  });

  return redirect("/mentoringku/waiting");
};

export const createTransactions = async (e: FormData) => {
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

  return redirect("/mentoringku/waiting");
};

export const updateTransactionStatus = async (
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

  const transaction = await prisma.transaction.findUnique({
    where: {
      id: id,
    },
  });

  status === "Selesai" &&
    (await prisma.user.update({
      where: {
        nim: transaction?.mentorNim as string,
      },
      data: {
        coin: { increment: 1 },
      },
    }));
  status === "Gagal" &&
    (await prisma.user.update({
      where: {
        email: transaction?.userEmail as string,
      },
      data: {
        coin: { increment: 1 },
      },
    }));

  if (session?.user?.role === "mentor") {
    return redirect("/mentor/mentoringku");
  } else {
    redirect("/mentoringku");
  }
};
export const AdminUpdateTransactionStatus = async (
  id: string,
  status: string
) => {
  await prisma.transaction.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });

  const transaction = await prisma.transaction.findUnique({
    where: {
      id: id,
    },
  });

  if (status === "Selesai") {
    await prisma.user.update({
      where: {
        nim: transaction?.mentorNim as string,
      },
      data: {
        coin: { increment: 1 },
      },
    });
  } else if (status === "Gagal") {
    await prisma.user.update({
      where: {
        email: transaction?.userEmail as string,
      },
      data: {
        coin: { increment: 1 },
      },
    });
    await prisma.user.update({
      where: {
        nim: transaction?.mentorNim as string,
      },
      data: {
        coin: { decrement: 1 },
      },
    });
  }

  return redirect("/admin/transaction");
};

export const updateTransactionLocationDetail = async (
  params: TransactionDetailType
) => {
  await prisma.transaction.update({
    where: {
      id: params.id,
    },
    data: {
      location_detail: params.location_detail,
    },
  });

  return redirect("/admin/transaction");
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

export const getAllTransaction = async () => {
  try {
    return await prisma.transaction.findMany({
      include: {
        User: true,
        mentor: true,
      },
    });
  } catch (error) {
    return { error };
  }
};

export const getTotalTransaction = async () => {
  try {
    return await prisma.transaction.count();
  } catch (error) {
    return { error };
  }
};

export const getTransactionByStatus = async (status: string) => {
  const session = await getServerSession(authOptions);

  try {
    return await prisma.transaction.findMany({
      where: {
        userEmail: session?.user?.email,
        status: status,
      },
      include: {
        User: true,
        mentor: true,
      },
    });
  } catch (error) {
    return { error };
  }
};

export const getTransactionByMentor = async () => {
  const session = await getServerSession(authOptions);

  try {
    return await prisma.transaction.findMany({
      where: {
        mentor: {
          email: session?.user?.email,
        },
        OR: [
          {
            status: "Selesai",
          },
          { status: "Gagal" },
        ],
      },
      include: {
        User: true,
        mentor: true,
      },
    });
  } catch (error) {
    return { error };
  }
};

export const getActiveTransactionByMentor = async () => {
  const session = await getServerSession(authOptions);

  try {
    return await prisma.transaction.findMany({
      where: {
        mentor: {
          email: session?.user?.email,
        },
        OR: [
          {
            status: "Belum diterima Mentor",
          },
          { status: "Berlangsung" },
        ],
      },
      include: {
        User: true,
        mentor: true,
      },
      orderBy: {
        date: "desc",
      },
    });
  } catch (error) {
    return { error };
  }
};
