import { useDropzone } from "react-dropzone"
import { FolderIcon } from "@heroicons/react/24/outline"
import { useStore } from "../store/useStore"

export function FileUploader() {
  const { selectedFile, loadExifData } = useStore()

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    onDrop: files => {
      if (files[0]) {
        const file = files[0] as unknown as any;
        loadExifData(file.path)
      }
    }
  })

  return (
    <div className="w-1/4 p-4 border-r">
      <div {...getRootProps()} className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer">
        <input {...getInputProps()} />
        <FolderIcon className="h-12 w-12 mx-auto text-gray-400" />
        <p>拖放图片文件到此处，或点击选择</p>
      </div>
      {selectedFile && (
        <div className="mt-4">
          <p className="font-medium">已选择文件：</p>
          <p className="text-sm text-gray-600 break-all">{selectedFile}</p>
        </div>
      )}
    </div>
  )
} 