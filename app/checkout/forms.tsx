"use client";
import { registerMentor } from "@/server/post_action";
import { registerMentorTypes } from "@/server/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const FormDataSchema = z.object({
  course_day: z.string().min(1),
  course_time: z.string().min(1),
  mentoring_location: z.string().min(1),
  location_detail: z.string().min(1),
  mentoring_topic: z.string().min(10),
});

type Inputs = z.infer<typeof FormDataSchema>;

const daring = [
  {
    value: "Google Meet",
  },
];

const luring = [
  {
    value: "Kantin Griya UB",
  },
  {
    value: "Kantin Creative Land UB",
  },
];

export default function Forms() {
  const [isloading, setLoading] = useState(false);
  const [locationDetail, setLocationDetail] = useState(daring);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      course_day: "",
      course_time: "",
      mentoring_location: "Daring",
      location_detail: "",
      mentoring_topic: "",
    },
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      // @ts-ignore
      await registerMentor(data as registerMentorTypes);
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const mentoringLocation = useWatch({
    control,
    name: "mentoring_location",
    defaultValue: "Daring",
  });

  useEffect(() => {
    if (mentoringLocation === "Daring") {
      setLocationDetail(daring);
    } else {
      setLocationDetail(luring);
    }
  }, [mentoringLocation]);

  return (
    <form action="" className="flex flex-col gap-4">
      <div>
        <div className="flex flex-col gap-2 mt-2 sm:col-span-2">
          <label
            htmlFor="mentoring_date"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Jadwal Mentoring
          </label>
          <div className="flex gap-2">
            <Select
              label="Platform"
              labelPlacement="inside"
              variant="bordered"
              size="sm"
              radius="sm"
              className="w-full font-semibold"
              classNames={{
                label: "text-sm",
                value: "text-sm font-semibold",
              }}
            >
              {locationDetail.map((locationDetail) => (
                <SelectItem
                  key={locationDetail.value}
                  value={locationDetail.value}
                >
                  {locationDetail.value}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Lokasi"
              labelPlacement="inside"
              variant="bordered"
              size="sm"
              radius="sm"
              className="w-full font-semibold"
              classNames={{
                label: "text-sm",
                value: "text-sm font-semibold",
              }}
            >
              <SelectItem key={"Kantin Griya UB"} value="Kantin Griya UB">
                Kantin Griya UB
              </SelectItem>
              <SelectItem
                key={"Kantin Creative Land UB"}
                value="Kantin Creative Land UB"
              >
                Kantin Creative Land UB
              </SelectItem>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Textarea
              label="Topik Mentoring"
              labelPlacement="outside"
              variant="bordered"
              placeholder="Berikan penjelasan sedetail mungkin mengenai topik mentoring yang akan ditanyakan agar mentor dapat mempersiapkan mentoring dengan baik"
              minRows={4}
              radius="sm"
              className="w-full font-semibold"
              classNames={{
                label: "text-sm",
                input: "resize-y min-h-[60px] text-sm font-semibold",
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2 sm:col-span-2">
          <div className="flex gap-2">
            <RadioGroup
              label="Berapa Jumlah Partisipan Mentoring"
              orientation="horizontal"
              size="sm"
              className="flex justify-between w-full"
              classNames={{
                label: "text-sm text-black",
                base: "text-xs font-semibold",
                wrapper: "w-full flex gap-2",
              }}
            >
              <Radio value="Private">Private</Radio>
              <Radio value="2 - 5 Orang">2 - 5 Orang</Radio>
              <Radio value="5 - 10 Orang">5 - 10 Orang</Radio>
            </RadioGroup>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2 sm:col-span-2">
          <label
            htmlFor="mentoring_location"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Lokasi Mentoring
          </label>
          <div className="flex gap-2">
            <Select
              label="Platform"
              labelPlacement="inside"
              variant="bordered"
              size="sm"
              radius="sm"
              isInvalid={errors.mentoring_location ? true : false}
              errorMessage={
                errors.mentoring_location && errors.mentoring_location.message
              }
              {...register("mentoring_location", { required: true })}
              className="w-full font-semibold"
              classNames={{
                label: "text-sm",
                value: "text-sm font-semibold",
              }}
            >
              <SelectItem key={"Daring"} value="Daring">
                Daring
              </SelectItem>
              <SelectItem key={"Luring"} value="Luring">
                Luring
              </SelectItem>
            </Select>
            <Select
              label="Lokasi"
              labelPlacement="inside"
              variant="bordered"
              size="sm"
              radius="sm"
              className="w-full font-semibold"
              classNames={{
                label: "text-sm",
                value: "text-sm font-semibold",
              }}
            >
              {locationDetail.map((locationDetail) => (
                <SelectItem
                  key={locationDetail.value}
                  value={locationDetail.value}
                >
                  {locationDetail.value}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Textarea
              label="Topik Mentoring"
              labelPlacement="outside"
              variant="bordered"
              placeholder="Berikan penjelasan sedetail mungkin mengenai topik mentoring yang akan ditanyakan agar mentor dapat mempersiapkan mentoring dengan baik"
              minRows={4}
              radius="sm"
              className="w-full font-semibold"
              classNames={{
                label: "text-sm",
                input: "resize-y min-h-[60px] text-sm font-semibold",
              }}
            />
          </div>
        </div>
      </div>
      <div className="">
        <Button
          type="submit"
          color="primary"
          radius="sm"
          className="w-full text-sm font-semibold"
        >
          Konfirmasi Pesanan
        </Button>
      </div>
    </form>
  );
}
