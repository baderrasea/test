import Image from "next/image";
import React from "react";

const CopyRight = () => {
  return (
    <div className="w-full flex flex-row gap-[10px] py-[16px] bg-white justify-center items-center">
      <Image
        alt="logo"
        src={"/assets/images/logo/logo.svg"}
        width={120}
        height={120}
      />
      <h5 className="text-[#536485] text-[18px]">جميع الحقوق محفوظه لدئ</h5>
    </div>
  );
};

export default CopyRight;
