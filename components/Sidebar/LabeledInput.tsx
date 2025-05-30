"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface LabeledInputProps {
  id: string;
  label: string;
  value: string | number;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) => (
  <div className="flex items-center justify-between gap-4 ">
    <Label htmlFor={id} className="text-sm-medium text-[#535862] font-expo-arabic w-1/2 text-right">
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-1/2 px-[16px] py-[10px]  text-right rounded-[10px] border max-h-[44px] gap-[10px] border-[#E5E7EB] bg-[#F8F8F8]
        focus:ring-1 focus:ring-blue-300"
    />
  </div>
);

export default LabeledInput;
