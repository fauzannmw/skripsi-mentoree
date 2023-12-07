import { Card } from "@/components/card";
import Select from "./select";

export default async function ExplorePage() {
  return (
    <div className="grid gap-y-6">
      <Select />
      <div className="grid gap-y-6">
        {/* @ts-ignore */}
        <Card />
      </div>
    </div>
  );
}
