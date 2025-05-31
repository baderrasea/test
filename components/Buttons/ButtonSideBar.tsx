"use client";
import React from "react";

const ButtonSideBar = ({
  icon,
  title,
  isSelected,
  isOpenSideBar,
}: {
  icon: string;
  title: string;
  isSelected: boolean;
  isOpenSideBar: boolean;
}) => {
  return (
    <button
      className={`${
        isSelected
          ? "bg-[#00579f] text-white"
          : " text-[#62748e] bg-transparent"
      }
      transition-all duration-300 hover:bg-[#00579f] hover:text-white cursor-pointer 
    w-full text-[16px] px-[16px] py-2 rounded-[10px] flex flex-row justify-end items-center gap-[10px]`}
    >
      {isOpenSideBar && <h5 className="text-[16px]">{title}</h5>}
      <img src={`/assets/icons/sidebar/${icon}`} alt={icon} />
    </button>
  );
};

export default ButtonSideBar;
