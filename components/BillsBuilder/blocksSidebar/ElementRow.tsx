import * as React from "react";

interface ElementRowProps {
  title: string;
  description: string;
  iconUrl: string;
  isFirst?: boolean;
  activeTab?: number;
}

export const ElementRow: React.FC<ElementRowProps> = ({
  activeTab,
  title,
  description,
  iconUrl,
  isFirst = false
}) => {
  return (
    <article
      className={`flex flex-row-reverse gap-2.5 items-center p-2.5 w-full min-h-16 ${
        isFirst ? "" : "mt-1"
      }`}
    >
      <div className="flex flex-row-reverse flex-1 shrink gap-2.5 items-center self-stretch my-auto basis-0 min-w-60">
      {activeTab === 1 && (
        <>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fccf201caad9510f8ac111729e6ca482efd27e41?placeholderIfAbsent=true&apiKey=112967064f754fc48b097f8a4268c165"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto aspect-[0.96] w-[23px]"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ce17cee00f6f3ffcace2f26d014accad65ac93ef?placeholderIfAbsent=true&apiKey=112967064f754fc48b097f8a4268c165"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto aspect-[0.96] w-[23px]"
          />
        </>
      )}
    
        <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto text-right basis-5 min-w-60">
          <h3 className="text-base font-medium text-slate-600">
            {title}
          </h3>
          <p className="text-sm leading-none text-slate-400">
            {description}
          </p>
        </div>
         <div className="flex gap-2.5 items-center self-stretch p-2.5 my-auto w-10 h-10 rounded-xl bg-slate-300">
          <img
            src={iconUrl}
            alt=""
            className="object-contain self-stretch my-auto w-5 aspect-square"
          />
        </div>
      </div>
     
    </article>
  );
};
