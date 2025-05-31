import React from "react";
import TitleTemplates from "./TitleTemplates";
import CardTemplate from "./CardTemplate";
import Pagination from "./Pagination";

const Templates = () => {
  return (
    <div className="w-full flex flex-col bg-white gap-[24px] rounded-[10px]">
      <TitleTemplates />
      <div className="w-full px-[16px] grid lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((e, index) => (
          <CardTemplate
            key={index}
            image={
              e % 2 == 0
                ? `/assets/images/test/Rectangle 2525.png`
                : `/assets/images/test/image-3.png`
            }
            title="نسخه من نسخه سند قبض"
            desc="سند قبض"
          />
        ))}
      </div>
      <Pagination/>
    </div>
  );
};

export default Templates;
