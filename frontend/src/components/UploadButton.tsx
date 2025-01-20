import { useRef } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useStore } from "../store/useStore";

export function UploadButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const store = useStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files?.[0];
    if (file) {
      console.log(file)
      store.addImage(file);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 
                   text-blue-600 rounded-lg border border-blue-200 transition-colors"
      >
        <PhotoIcon className="w-5 h-5" />
        <span>选择图片</span>
      </button>
    </>
  );
}
