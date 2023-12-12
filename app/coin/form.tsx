import { Button } from "@nextui-org/button";

export default async function Form() {
  function numberWithCommas(price: number) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const coin = [
    {
      coin: 1,
      bonus: 0,
      price: 15000,
    },
    {
      coin: 4,
      bonus: 1,
      price: 60000,
    },
    {
      coin: 10,
      bonus: 3,
      price: 150000,
    },
    {
      coin: 15,
      bonus: 4,
      price: 225000,
    },
    {
      coin: 20,
      bonus: 7,
      price: 300000,
    },
    {
      coin: 35,
      bonus: 10,
      price: 500000,
    },
  ];
  return (
    <form action="" method="POST">
      <div className="grid grid-cols-2 gap-4 my-4">
        {coin?.map((coin, index: number) => (
          <label key={index} className="cursor-pointer">
            <input
              type="radio"
              className="sr-only peer"
              name="price"
              value={coin.price}
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
                    <span className="text-lg font-bold">Rp.</span>{" "}
                    {numberWithCommas(coin.price)}
                  </p>
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
