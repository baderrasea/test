"use client";

import Image from "next/image";
import React from "react";
import { ImagesGroup } from "./ImagesGroup";

const Header = () => {
 
  return (
    <div className="flex flex-row justify-between bg-white rounded-[10px] px-[24px] py-[10px]">
     <ImagesGroup />
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
