"use client";
import * as React from "react";
import { TabSelector } from "./TabSelector";
import { ElementRow } from "./ElementRow";

function InputDesign() {
  const [activeTab, setActiveTab] = React.useState(0);

  const tabs = [
      { label: "المتغيرات" },
    { label: "عناصر القالب" }
  ];

  const elements = [
    {
      title: "أمر قبض رقم",
      description: "حقل رقم",
      iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/20240d058b01c863c1a1748594b0d3406225c4e8?placeholderIfAbsent=true&apiKey=112967064f754fc48b097f8a4268c165"
    },
      {
      title: "أمر قبض رقم",
      description: "حقل رقم",
      iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/20240d058b01c863c1a1748594b0d3406225c4e8?placeholderIfAbsent=true&apiKey=112967064f754fc48b097f8a4268c165"
    },
    
    {
      title: "المبلغ",
      description: "حقل عملة",
      iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/d3ff4b8ff49666c1fef3310cd46f754a119f080c?placeholderIfAbsent=true&apiKey=112967064f754fc48b097f8a4268c165"
    },
    {
      title: "التاريخ",
      description: "حقل تاريخ",
      iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/f15a987df26f6c6e3d71e4a430129e0681adef07?placeholderIfAbsent=true&apiKey=112967064f754fc48b097f8a4268c165"
    },
    {
      title: "الشعار",
      description: "حقل صورة",
      iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/eee9720997a2b061fd66c7e99e3c52dbd9ce1654?placeholderIfAbsent=true&apiKey=112967064f754fc48b097f8a4268c165"
    },
    {
      title: "اسم المستلم",
      description: "حقل نص",
      iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/b202aa4b52c2bf8ad3628535ee65f3e66a23b996?placeholderIfAbsent=true&apiKey=112967064f754fc48b097f8a4268c165"
    }
  ];

  // عناصر القالب (second table)
  const templateElements = [
    { title: "أمر قبض رقم", description: "حقل رقم", iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/20240d058b01c863c1a1748594b0d3406225c4e8?placeholderIfAbsent=true&apiKey=112967064f754fc48b097f8a4268c165" },
    { title: "المبلغ", description: "حقل عملة", iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/d3ff4b8ff49666c1fef3310cd46f754a119f080c?placeholderIfAbsent=true&apiKey=112967064f754fc48b097f8a4268c165" },
    { title: "الشعار", description: "حقل صورة", iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/eee9720997a2b061fd66c7e99e3c52dbd9ce1654?placeholderIfAbsent=true&apiKey=112967064f754fc48b097f8a4268c165" },
    { title: "أمر قبض رقم", description: "حقل رقم", iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/20240d058b01c863c1a1748594b0d3406225c4e8?placeholderIfAbsent=true&apiKey=112967064f754fc48b097f8a4268c165" },
    { title: "المبلغ", description: "حقل عملة", iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/d3ff4b8ff49666c1fef3310cd46f754a119f080c?placeholderIfAbsent=true&apiKey=112967064f754fc48b097f8a4268c165" },
    { title: "التاريخ", description: "حقل تاريخ", iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/f15a987df26f6c6e3d71e4a430129e0681adef07?placeholderIfAbsent=true&apiKey=112967064f754fc48b097f8a4268c165" },
    { title: "الشعار", description: "حقل صورة", iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/eee9720997a2b061fd66c7e99e3c52dbd9ce1654?placeholderIfAbsent=true&apiKey=112967064f754fc48b097f8a4268c165" },
    { title: "اسم المستلم", description: "حقل نص", iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/b202aa4b52c2bf8ad3628535ee65f3e66a23b996?placeholderIfAbsent=true&apiKey=112967064f754fc48b097f8a4268c165" }
  ];

  return (
    <section dir="rtl" className="flex flex-col p-5 mx-auto w-full h-full     bg-white rounded-3xl max-w-[480px]">
      <div className="self-center w-full text-base font-medium leading-none text-center max-w-[397px]">
        <TabSelector
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      <div className="mt-5 w-full">
        {activeTab === 0 && (
          <>
            {elements.map((element, index) => (
              <ElementRow
                key={index}
                title={element.title}
                description={element.description}
                iconUrl={element.iconUrl}
                isFirst={index === 0}
              />
            ))}
          </>
        )}
        {activeTab === 1 && (
          <>
            {templateElements.map((element, index) => (
              <ElementRow
              activeTab={activeTab}
                key={index}
                title={element.title}
                description={element.description}
                iconUrl={element.iconUrl}
                isFirst={index === 0}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default InputDesign;
