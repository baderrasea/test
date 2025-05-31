


import { ButtonIcon } from "./Buttons/ButtonIcon";

export const ImagesGroup = () => {
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
        <div className="flex flex-row gap-[14px]">
            <h1 className="w-[44px] h-[44px] bg-[#00579F] text-[#E8E8E8] flex justify-center items-center rounded-full text-[30px]">
                A
            </h1>
            {btnHeader.map((e, index) => (
                <ButtonIcon key={index} icon={`header/${e.icon}`} />
            ))}
        </div>
    );
};