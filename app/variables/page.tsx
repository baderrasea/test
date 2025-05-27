// pages/variables.tsx
"use client";
import { NextPage } from "next";
import { useState } from "react";
import {
  DollarSign,
  ImageIcon,
  Calendar,
  Text,
} from "lucide-react";

type VariableType = 
  | "number"
  | "currency"
  | "image"
  | "date"
  | "text";

interface VariableItem {
  id: number;
  label: string;        // e.g. "أمر قبض رقم"
  placeholder: string;  // e.g. "حقل رقم"
  type: VariableType;
  value?: number;       // only for number-type
}

const demoVariables: VariableItem[] = [
  { id: 1, label: "أمر قبض رقم", placeholder: "حقل رقم", type: "number", value: 1 },
  { id: 2, label: "المبلغ",         placeholder: "حقل عملة", type: "currency" },
  { id: 3, label: "الشعار",         placeholder: "حقل صورة", type: "image" },
  { id: 4, label: "التاريخ",        placeholder: "حقل تاريخ", type: "date" },
  { id: 5, label: "اسم المستلم",    placeholder: "حقل نص",   type: "text" },
];

const demoTemplateElements = [
  "عنصر A",
  "عنصر B",
  "عنصر C",
];

const VariablesPage: NextPage = () => {
  const [activeTab, setActiveTab] = useState<"variables"|"template">("variables");

  const renderIconOrValue = (item: VariableItem) => {
    switch (item.type) {
      case "number":
        return (
          <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-sm font-medium">
            {item.value}
          </span>
        );
      case "currency":
        return <DollarSign className="w-5 h-5 text-gray-500" />;
      case "image":
        return <ImageIcon className="w-5 h-5 text-gray-500" />;
      case "date":
        return <Calendar className="w-5 h-5 text-gray-500" />;
      case "text":
        return <Text className="w-5 h-5 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden">
      {/* Tabs */}
      <div className="flex">
        <button
          className={
            "flex-1 py-2 text-center " +
            (activeTab === "variables"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600")
          }
          onClick={() => setActiveTab("variables")}
        >
          المتغيرات
        </button>
        <button
          className={
            "flex-1 py-2 text-center " +
            (activeTab === "template"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600")
          }
          onClick={() => setActiveTab("template")}
        >
          عناصر القالب
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === "variables" ? (
          <ul className="space-y-4">
            {demoVariables.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.label}</p>
                  <p className="text-gray-400 text-sm">{item.placeholder}</p>
                </div>
                {renderIconOrValue(item)}
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-2">
            {demoTemplateElements.map((el, idx) => (
              <li
                key={idx}
                className="p-2 border rounded-md text-center text-gray-700"
              >
                {el}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VariablesPage;
