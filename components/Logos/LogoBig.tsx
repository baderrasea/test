import Image from "next/image";
import React from "react";

const LogoBig = () => {
  return (
    <div className="w-full rounded-[10px] flex flex-col justify-center items-center gap-[12px] bg-[#f8f8f8] border border-[#E5E7EB] py-[16px]">
      <Image
        alt="logo"
        src={"/assets/images/logo/logo.svg"}
        width={120}
        height={120}
      />
      <h5 className="text-[#62748e] text-[16px]">اسم الشركه سمارت لايف</h5>
    </div>
  );
};

export default LogoBig;
