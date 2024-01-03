"use client";

import { Button, Link } from "@nextui-org/react";
import { useState } from "react";

type ButtonProps = {
  link: string;
  text: string;
};

export const ButtonComponent = ({ link, text }: ButtonProps) => {
  const [isloading, setLoading] = useState<boolean>();
  const clickHandler = (params: boolean) => {
    return async (event: React.MouseEvent) => {
      await setLoading(params);
      event.preventDefault();
    };
  };
  return (
    <Button
      href={link}
      as={Link}
      type="button"
      color="primary"
      radius="sm"
      className="w-full text-sm font-semibold"
      isDisabled={isloading}
      isLoading={isloading}
      onClick={clickHandler(true)}
    >
      {text}
    </Button>
  );
};
