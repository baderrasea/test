"use client";
import Image from "next/image";
import React, { useState } from "react";
import LogoBig from "./Logos/LogoBig";
import LogoSmall from "./Logos/LogoSmall";
import ButtonSideBar from "./Buttons/ButtonSideBar";

const Sidebar = () => {
  const [IsOpen, setIsOpen] = useState(true);
  return (
    <div
      className={`${
        IsOpen ? "w-[310px]" : "w-[110px]"
      } flex flex-col bg-white rounded-[20px] px-[20px] py-[24px] gap-[16px]`}
    >
      {IsOpen ? <LogoBig /> : <LogoSmall />}
      <div className="w-full h-[1px] bg-[#e5e7eb]" />
      {IsOpen && (
        <div className="w-full flex gap-2 flex-row justify-center items-center">
          <div className="flex-1 h-[1px] bg-[#e5e7eb]" />
          <h5 className="text-[14px] text-[#62748e]">اكثر استخدام</h5>
          <div className="flex-1 h-[1px] bg-[#e5e7eb]" />
        </div>
      )}
      <ButtonSideBar icon="" isOpenSideBar isSelected title=" الرئيسية" />
    </div>
  );
};

export default Sidebar;
