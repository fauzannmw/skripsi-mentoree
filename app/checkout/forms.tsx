"use client";
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
import { LocationData } from "./location";
import { TimeData } from "./time";
import { createTransaction } from "@/server/transaction_action";
import { toast } from "sonner";
// @ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormDataSchema = z.object({
  mentorNim: z.string().min(1),
  course_day: z.string().min(1),
  course_time: z.string().min(1, { message: "Pilih Jam Mentoring" }),
  participant: z.any(),
  // participant: z.string().min(1, { message: "Pilih Jumlah Peserta Mentoring" }),
  mentoring_location: z
    .string()
    .min(1, { message: "Pilih Plarform Mentoring" }),
  location_detail: z.string().min(1, { message: "Pilih Lokasi Mentoring" }),
  mentoring_topic: z
    .string()
    .min(10, { message: "Isi Topik Mentoring yang akan ditanyakan" }),
});

export type CreateTransactionTypes = z.infer<typeof FormDataSchema>;

type FormProps = {
  nim: string;
  major: string;
  day: string;
  time: string;
};

export default function Forms({ nim, major, day, time }: FormProps) {
  const [isloading, setLoading] = useState(false);
  const [locationDetail, setLocationDetail] = useState(LocationData?.daring);
  const [mentoringTime, setMentoringTime] = useState(TimeData.pagi);
  const [mentoringDay, setMentoringDay] = useState(1);
  const [startDate, setStartDate] = useState(new Date());

  const filterDay = (date: any) => {
    const daySelected = date.getDay();
    console.log(daySelected);

    switch (day) {
      case "Senin":
        setMentoringDay(1);
        break;
      case "Selasa":
        setMentoringDay(2);
        break;
      case "Rabu":
        setMentoringDay(3);
        break;
      case "Kamis":
        setMentoringDay(4);
        break;
      case "Jumat":
        setMentoringDay(5);
        break;
      default:
        break;
    }

    return mentoringDay == daySelected;
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    resetField,
    formState: { errors },
  } = useForm<CreateTransactionTypes>({
    defaultValues: {
      mentorNim: nim,
      course_day: "29/12/2023",
      course_time: "",
      participant: "",
      mentoring_location: "",
      location_detail: "",
      mentoring_topic: "",
    },
    resolver: zodResolver(FormDataSchema),
  });

  console.log(watch("course_day"));

  const processForm: SubmitHandler<CreateTransactionTypes> = async (data) => {
    try {
      setLoading(true);
      await createTransaction(data as CreateTransactionTypes);
      toast("Berhasil Melakukan Pemesanan Mentor");
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
    switch (day) {
      case "Senin":
        setMentoringDay(1);
        break;
      case "Selasa":
        setMentoringDay(2);
        break;
      case "Rabu":
        setMentoringDay(3);
        break;
      case "Kamis":
        setMentoringDay(4);
        break;
      case "Jumat":
        setMentoringDay(5);
        break;

      default:
        break;
    }
    if (time === "Pagi") {
      setMentoringTime(TimeData?.pagi);
    } else if (time === "Siang") {
      setMentoringTime(TimeData?.siang);
    }
    if (mentoringLocation === "Daring") {
      setLocationDetail(LocationData?.daring);
      resetField("location_detail");
    } else if (mentoringLocation === "Luring") {
      switch (major) {
        case "Teknik Informatika":
          setLocationDetail(LocationData.informatika);
          break;
        case "Teknik Elektro":
          setLocationDetail(LocationData.elektro);
          break;
        case "Teknik Industri Pertanian":
          setLocationDetail(LocationData.pertanian);
          break;
        case "Teknologi Informasi":
          setLocationDetail(LocationData.teknologi);
          break;
        case "Statistika":
          setLocationDetail(LocationData.statistika);
          break;

        default:
          break;
      }
      resetField("location_detail");
    }
  }, [mentoringLocation]);

  return (
    <form onSubmit={handleSubmit(processForm)} className="flex flex-col gap-4">
      <div>
        <div className="flex flex-col gap-2 mt-2 sm:col-span-2">
          <label
            htmlFor="mentoring_date"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Jadwal Mentoring
          </label>
          <div className="flex gap-2">
            <div className="flex items-center text-sm font-semibold w-fit">
              <DatePicker
                selected={startDate}
                // selected={watch("course_day")}
                onChange={(date: any) => setStartDate(date)}
                minDate={new Date(new Date().valueOf() + 1000 * 3600 * 24)}
                filterDate={filterDay}
                // selected={new Date(new Date().valueOf() + 1000 * 3600 * 24)}
                // {...register("course_day", { required: true })}
                className="p-3 border border-gray-200 rounded-md"
              />
            </div>
            <Select
              label="Jam"
              labelPlacement="inside"
              variant="bordered"
              size="sm"
              radius="sm"
              isInvalid={errors.course_time ? true : false}
              errorMessage={errors.course_time && errors.course_time.message}
              {...register("course_time", { required: true })}
              className="w-full font-semibold"
              classNames={{
                label: "text-sm",
                value: "text-sm font-semibold",
              }}
            >
              {mentoringTime.map((mentoringTime) => (
                <SelectItem
                  key={mentoringTime.value}
                  value={mentoringTime.value}
                >
                  {mentoringTime.value}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2 sm:col-span-2">
          <div className="flex gap-2">
            <RadioGroup
              label="Berapa Jumlah Partisipan Mentoring"
              orientation="horizontal"
              size="sm"
              isInvalid={errors.participant ? true : false}
              // errorMessage={errors.participant && errors.participant.message}
              {...register("participant", { required: true })}
              className="flex justify-between w-full"
              classNames={{
                label: "text-sm text-black",
                base: "text-xs font-semibold",
                wrapper: "w-full flex gap-2",
              }}
            >
              <Radio key={"Private"} value={"Private"}>
                Private
              </Radio>
              <Radio key={"2 - 5 Orang"} value={"2 - 5 Orang"}>
                2 - 5 Orang
              </Radio>
              <Radio key={"5 - 10 Orang"} value={"5 - 10 Orang"}>
                5 - 10 Orang
              </Radio>
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
              isInvalid={errors.location_detail ? true : false}
              errorMessage={
                errors.location_detail && errors.location_detail.message
              }
              {...register("location_detail", { required: true })}
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
              isInvalid={errors.mentoring_topic ? true : false}
              errorMessage={
                errors.mentoring_topic && errors.mentoring_topic.message
              }
              {...register("mentoring_topic", { required: true })}
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
          isLoading={isloading}
          className="w-full text-sm font-semibold"
        >
          Konfirmasi Pesanan
        </Button>
      </div>
    </form>
  );
}
