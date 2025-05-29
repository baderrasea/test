import Image from "next/image";
import React from "react";

const TitleTemplates = () => {
  return (
    <div className="flex w-full justify-between px-[16px] pt-[16px]">
      <div className="flex flex-row gap-[10px]">
        <div className="p-[10px] rounded-[10px] cursor-pointer transition-all duration-300 hover:scale-110 flex justify-center items-center bg-[#F8F8F8] border border-[#E5E7EB]">
          <Image
            width={24}
            height={24}
            alt="icon"
            src={`/assets/icons/templates/file-download.svg`}
          />
        </div>
        <div className="p-[10px] rounded-[10px] cursor-pointer transition-all duration-300 hover:scale-110 flex justify-center items-center bg-[#00579f] border border-[#00579f]">
          <Image
            width={24}
            height={24}
            alt="icon"
            src={`/assets/icons/templates/add-circle.svg`}
          />
        </div>
      </div>
      <h5 className="text-[#535862] text-[16px]">القوالب</h5>
    </div>
  );
};

export default TitleTemplates;
