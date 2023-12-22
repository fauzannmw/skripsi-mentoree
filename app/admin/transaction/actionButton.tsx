"use client";

import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { AdminchangeTransactionStatus } from "@/server/transaction_action";

type ActionButtonProps = {
  id: string;
  status: string;
};

export default function ActionButtonComponent({
  id,
  status,
}: ActionButtonProps) {
  const [selectedOption, setSelectedOption] = useState(new Set([status]));
  const [selectedId, setSelectedId] = useState(id);

  // Convert the Set to an Array and get the first value.
  const selectedOptionValue = Array.from(selectedOption)[0];

  const labelsMap = {
    "Belum diterima Mentor": "Ubah Status menjadi Belum diterima oleh Mentor",
    Berlangsung: "Ubah Status menjadi Berlangsung",
    Selesai: "Ubah Status menjadi Selesai",
    Gagal: "Ubah Status menjadi Gagal",
  };

  async function onClickButton() {
    await AdminchangeTransactionStatus(id, selectedOptionValue);
  }

  return (
    <ButtonGroup variant="flat">
      {/* @ts-ignore */}
      <Button onClick={onClickButton}>{labelsMap[selectedOptionValue]}</Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger className={`${""}`}>
          <Button isIconOnly>
            <IoIosArrowDown />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Action options"
          selectedKeys={selectedOption}
          selectionMode="single"
          // @ts-ignore
          onSelectionChange={setSelectedOption}
          className="max-w-[300px]"
        >
          <DropdownItem color="warning" key="Belum diterima Mentor">
            {labelsMap["Belum diterima Mentor"]}
          </DropdownItem>
          <DropdownItem color="primary" key="Berlangsung">
            {labelsMap["Berlangsung"]}
          </DropdownItem>
          <DropdownItem color="success" key="Selesai">
            {labelsMap["Selesai"]}
          </DropdownItem>
          <DropdownItem color="danger" key="Gagal">
            {labelsMap["Gagal"]}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}