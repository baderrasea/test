"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface LabeledCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const LabeledCheckbox: React.FC<LabeledCheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
}) => (
  <div className="flex items-center gap-[10px] text-[#627D98]">
    <Label htmlFor={id} className="text-sm-medium text-[#535862] text-md-regular      font-expo-arabic">
      {label}
    </Label>
    <Checkbox
      id={id}
      checked={checked}
      onCheckedChange={(checked) => onChange(!!checked)}
      className=" border cursor-pointer border-[#00579F] bg-[#FFFFFF]"
    />
  </div>
);

export default LabeledCheckbox;
