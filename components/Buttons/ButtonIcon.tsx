import Image from "next/image";
import React from "react";

export const ButtonIcon = ({ icon }: { icon: string }) => {
  return (
    <div className="p-[10px] rounded-[10px] cursor-pointer transition-all duration-300 hover:scale-110 flex justify-center items-center bg-[#F8F8F8] border border-[#E5E7EB]">
      <Image
        width={24}
        height={24}
        alt="icon"
        src={`/assets/icons/${icon}`}
      />
    </div>
  );
};
