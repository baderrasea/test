"use client";
import React, { useRef, useState, DragEvent, ChangeEvent } from "react";
import { Upload } from "lucide-react";

interface LabeledImageInputProps {
  label: string;
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
  placeholder = "اسحب صورة هنا أو اضغط للاختيار",
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
      <label className="self-end text-sm font-medium leading-none text-slate-500 block mb-2">
        {label}
      </label>
      <div
        className="relative flex items-center justify-center w-full h-40 border-2 border-dashed border-[#E0E0E0] rounded-lg bg-white cursor-pointer overflow-hidden"
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
          <div className="flex flex-col items-center justify-center">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 text-center">{placeholder}</p>
          </div>
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
