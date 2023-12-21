import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SECRET,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT,
});

export async function POST(request) {
  const { id, coin, bonus, price } = await request.json();
  let parameter = {
    item_details: {
      coin: coin,
      bonus: bonus,
    },
    transaction_details: {
      id: id,
      price: price,
    },
  };

  const token = await snap.createTransactionToken(parameter);
  console.log(token);
  NextResponse.json({ token });
}
