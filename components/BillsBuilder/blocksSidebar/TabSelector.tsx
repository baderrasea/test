import * as React from "react";

interface TabProps {
  tabs: { label: string }[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

export const TabSelector: React.FC<TabProps> = ({ tabs, activeTab, onTabChange }) => {
  return (  
    <nav className="flex gap-2 px-4 py-2 w-full rounded-xl border border-solid bg-stone-50">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => onTabChange(index)}
          className={`flex flex-col flex-1 shrink justify-center items-center my-auto basis-0 min-h-[38px] rounded-[0.375rem] ${
            activeTab === index
              ? "bg-sky-700 text-neutral-200"
              : "text-slate-500"
          }`}
          aria-selected={activeTab === index}
          role="tab"
        >
          <span className="gap-1.5 self-stretch px-5 py-2">
            {tab.label}
          </span>
        </button>
      ))}
    </nav>
  );
};
