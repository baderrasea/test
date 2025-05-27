import InputDesign from "@/components/BillsBuilder/blocksSidebar/InputDesign";
import DetailSidebar from "@/components/BillsBuilder/detailSidebar.tsx/DetailSidebar";


export default function Home() {
    return (
        <div className="flex flex-col items-center min-h-screen  bg-gray-100 p-[10px]">
            <header
                className="w-full h-[84px] flex items-center rounded-[10px] px-[24px] py-[10px] gap-[10px]
         bg-white shadow "
                style={{ boxSizing: 'border-box' }}
            >
                <h1 className="text-2xl font-bold text-gray-800">عنوان الصفحة</h1>
            </header>

            <div className="flex gap-[24px] h-[calc(100vh-105px)]  w-full px-[20px] py-[24px] ">
                <div className="w-[25%] h-fill ">
                    {/* Left Sidebar */}
                    <InputDesign />

                </div>

                <div className="w-[50%]  bg-amber-300">
                    {/* Right Center */}
                </div>
                <div className="w-[25%] h-full  ">
                    <DetailSidebar />
                </div>
            </div>


            {/* <InputDesign /> */}
        </div>
    );
}
