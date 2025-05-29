import Image from "next/image";
import React from "react";

const LogoSmall = () => {
  return (
    <div className="w-full rounded-[10px] flex flex-col justify-center items-center gap-[12px] bg-[#f8f8f8] border border-[#E5E7EB] py-[16px]">
      <Image
        alt="logo"
        src={"/assets/images/logo/logoS.svg"}
        width={40}
        height={40}
      />
    </div>
  );
};

export default LogoSmall;
