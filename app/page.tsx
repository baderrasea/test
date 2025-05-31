import CopyRight from "@/components/CopyRight";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { SubHeader } from "@/components/SubHeader";
import Templates from "@/components/Templates";


export default function Home() {
  return (
    <div dir="ltr" className="w-full min-h-screen px-[2px] py-[14px] bg-[#f4f3f4] flex flex-row gap-[24px]">
      {/* contact */}
      <div className="flex flex-col gap-[24px] flex-1">
        {/* header */}
        <div className="flex flex-col gap-[10px] ">
          <Header />
          <SubHeader />
        </div>
        <Templates />
        <CopyRight />
      </div>
      {/* sidebar */}
      <Sidebar />
    </div>
  );
}
