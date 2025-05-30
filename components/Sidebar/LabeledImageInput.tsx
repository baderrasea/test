"use client";
import React, { useRef, useState, DragEvent, ChangeEvent } from "react";
import Image from "next/image";

interface LabeledImageInputProps {
    label?: string;
    value?: string;
    onChange: (dataUrl: string) => void;
    className?: string;
    placeholder?: string;
    previewClassName?: string;
}

const LabeledImageInput: React.FC<LabeledImageInputProps> = ({
    label,
    value,
    onChange,
    className = "",
    placeholder = "اضغط هنا لرفع الصورة أو قم بالسحب والإفلات",
    previewClassName = "object-cover w-full h-full",
}) => {
    const [preview, setPreview] = useState<string>(value || "");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (files: FileList) => {
        const file = files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            setPreview(result);
            onChange(result);
        };
        reader.readAsDataURL(file);
    };

    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const onDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const onClickUpload = () => {
        fileInputRef.current?.click();
    };

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFiles(e.target.files);
        }
    };

    React.useEffect(() => {
        setPreview(value || "");
    }, [value]);

    return (
        <div className={"w-full text-right " + className}>
            {label && (
                <label className="block mb-2 text-sm font-medium text-gray-600">
                    {label}
                </label>
            )}
            <div
                className="relative flex flex-col items-center justify-center w-full h-[136px] gap-[16px] border border-gray-300 rounded-[8px] bg-[#F8F8F8] cursor-pointer hover:border-blue-500 transition text-center pt-[24px] pr-[16px] pb-[24px] pl-[16px] shadow-[0px_1px_2px_0px_#0A0D120D]"
                onDrop={onDrop}
                onDragOver={onDragOver}
                onClick={onClickUpload}
            >
                {preview ? (
                    <img
                        src={preview}
                        alt="Preview"
                        className={previewClassName}
                    />
                ) : (
                    <>
                        <Image
                            src='/assets/icons/builder/image-3.svg'
                            alt="معاينة القالب"
                            className="object-contain rounded-xl border w-[21.5px] h-[21.5px] top-[1.25px] left-[1.25px]"
                            style={{ background: '#fff' }}
                            width={21.5}
                            height={21.5}
                        />             
                         <div className="flex">


                            <p className="text-sm text-primary-600 font-medium">
                                اضغط هنا لرفع الصورة
                            </p>
                            <p className="text-sm text-gray-500">
                                أو قم بالسحب والإفلات
                            </p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                            لا تتجاوز 5MB. JPG, PNG, SVG
                        </p>
                    </>
                )}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={onFileChange}
                />
            </div>
        </div>
    );
};

export default LabeledImageInput;
