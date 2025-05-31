"use client";
import Image from "next/image";
import React from "react";

const CardTemplate = ({
  image,
  title,
  desc,
}: {
  image: string;
  title: string;
  desc: string;
}) => {
  return (
    <div className="p-[16px] flex flex-col gap-[10px] justify-between items-end">
      <Image
        alt="img-template"
        src={image}
        width={200}
        height={200}
        className="mx-auto"
      />
      <div className="flex-col gap-[10px] mt-auto">
        <h5 className="text-[#181D27] text-[18px]">{title}</h5>
        <h5 className="text-[#71717b] text-[16px]">{desc} </h5>
        <div className="w-full h-[1px] bg-[#e5e7eb]" />
      </div>
      <div className="w-full flex flex-row gap-[10px]">
        {[
          "icon-delete.svg",
          "icon-upload.svg",
          "copy.svg",
          "icon-write.svg",
        ].map((e, i) => (
          <div
            key={i}
            className="p-[10px] w-full rounded-[10px] cursor-pointer transition-all duration-300 hover:scale-110 flex justify-center items-center bg-[#F8F8F8] border border-[#E5E7EB]"
          >
            <Image
              width={24}
              height={24}
              alt="icon"
              src={`/assets/icons/templates/${e}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardTemplate;
