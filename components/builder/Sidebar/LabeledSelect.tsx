"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface LabeledSelectProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

const LabeledSelect: React.FC<LabeledSelectProps> = ({
    id,
    label,
    value,
    onChange,
    options,
}) => (
    <div className="flex items-center justify-between gap-4">
        <Label htmlFor={id} className="text-sm-medium text-[#535862] font-expo-arabic w-1/2 text-right">
            {label}
        </Label>
        <Select value={value} onValueChange={onChange} dir="rtl">
            <SelectTrigger className="w-1/2 px-[16px] py-[10px]  text-right rounded-[10px] border max-h-[44px] gap-[10px] border-[#E5E7EB] bg-[#F8F8F8]
        focus:ring-1 focus:ring-blue-300">
                <SelectValue placeholder="اختر" />
            </SelectTrigger>
            <SelectContent className="bg-white rounded-lg border border-[#E0E0E0]">
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
);

export default LabeledSelect;
