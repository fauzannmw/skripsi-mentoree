"use client";
import { Card } from "@/components/card";
import { Box } from "@/components/listbox";
import { useSession } from "next-auth/react";

export default function ExplorePage() {
  const { data: session } = useSession();
  const people = [
    { name: "Wade Cooper" },
    { name: "Arlene Mccoy" },
    { name: "Devon Webb" },
    { name: "Tom Cook" },
    { name: "Tanya Fox" },
    { name: "Hellen Schmidt" },
  ];

  return (
    <div className="grid gap-y-40">
      <div>
        <Box />
      </div>
      <div>
        <Card
          image={""}
          name={"Muhamad Fauzan"}
          major={"Teknik Informatika"}
          description={
            "Enter a freshly updated and thoughtfully furnished peaceful homesurrounded by ancient trees, stone walls, and open meadows."
          }
        />
      </div>
    </div>
  );
}
