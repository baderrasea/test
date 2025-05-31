import Image from "next/image";
import React from "react";

export const SubHeader = () => {
  return (
    <div className="flex flex-row gap-[10px] ml-auto text-[#4d637c] text-[16px]">
      <h5>عنوان الصفحه</h5>
      <Image
        width={20}
        height={20}
        alt="icon"
        src={`/assets/icons/header/icon-briefcase 9.svg`}
      />
      <h5>...</h5>

      <Image
        width={20}
        height={20}
        alt="icon"
        src={`/assets/icons/header/icon-briefcase 9.svg`}
      />
      <h5>عنوان</h5>
      <Image
        width={20}
        height={20}
        alt="icon"
        src={`/assets/icons/header/icon-briefcase 9.svg`}
      />
      <Image
        width={20}
        height={20}
        alt="icon"
        src={`/assets/icons/header/icon-briefcase 6.svg`}
      />
    </div>
  );
};
