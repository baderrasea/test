"use client";

import Image from "next/image";
import React from "react";
import { ButtonIcon } from "./Buttons/ButtonIcon";

const Header = () => {
  const btnHeader = [
    { icon: "email.svg" },
    { icon: "file-text.svg" },
    { icon: "laptop.svg" },
    { icon: "cpu-setting.svg" },
    { icon: "calculator.svg" },
    { icon: "translate.svg" },
    { icon: "notification.svg" },
  ];
  return (
    <div className="flex flex-row justify-between bg-white rounded-[10px] px-[24px] py-[10px]">
      <div className="flex flex-row gap-[14px]">
        <h1 className="w-[44px] h-[44px] bg-[#00579F] text-[#E8E8E8] flex justify-center items-center rounded-full text-[30px]">
          A
        </h1>
        {btnHeader.map((e, index) => (
          <ButtonIcon key={index} icon={`header/${e.icon}`} />
        ))}
      </div>
      <div className="w-[427px] flex justify-between items-center bg-[#F8F8F8] border border-[#E5E7EB] rounded-[10px] px-[16px] py-[10px]">
        <Image
          width={24}
          height={24}
          alt="icon"
          src={`/assets/icons/header/search.svg`}
        />{" "}
        <input
          type="text"
          className=" bg-transparent text-end outline-none flex-1"
          placeholder="بحث"
        />
      </div>
    </div>
  );
};

export default Header;
