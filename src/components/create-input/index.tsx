"use client";

import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { PlusCircle } from "lucide-react";

interface CreateInputProps {
  placeholderText: string;
  onCreate: (value: string) => void;
  disabled?: boolean;
}

export default function CreateInput({
  placeholderText,
  onCreate,
  disabled = false,
}: CreateInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (value.trim()) {
      onCreate(value);
      setValue("");
    }
  };

  return (
    <div className="rounded-lg flex flex-col gap-4 z-0">
      <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
        <div className="relative w-full">
          <Input
            className="w-full pl-10"
            type="text"
            placeholder={placeholderText}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            disabled={disabled}
          />
          <PlusCircle
            onClick={() => !disabled && handleSubmit()}
            className={`absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 ${
              disabled ? "cursor-not-allowed text-gray-300" : ""
            }`}
          />
        </div>
      </form>
    </div>
  );
}
