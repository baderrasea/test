"use client";

import React, { useState } from "react";
import { ButtonIcon } from "./Buttons/ButtonIcon";

const Pagination = () => {
  const [selected, setSelected] = useState(3);

  return (
    <div className="flex flex-row gap-[8px] px-[16px] pb-[16px]">
      <ButtonIcon icon="templates/arrow.svg" />

      {[1, 2, 3, 4, 5].map((e) => (
        <h5
          key={e}
          onClick={() => setSelected(e)}
          className={`px-[20px] py-[13px] text-[15px] cursor-pointer transition-all duration-300 hover:bg-[#00579f] hover:rounded-[8px] hover:text-white hover:scale-110 ${
            selected === e
              ? "bg-[#00579f] text-white rounded-[8px]"
              : "bg-transparent"
          }`}
        >
          {e}
        </h5>
      ))}

      <ButtonIcon icon="templates/rl.svg" />
    </div>
  );
};

export default Pagination;
