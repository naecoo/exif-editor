import { useStore } from "../store/useStore"

export function ImagePreview() {
  const { selectedFile } = useStore()

  return (
    <div className="h-1/2 border-b app-border p-4">
      {selectedFile ? (
        <img
          src={`file://${selectedFile}`}
          alt="预览"
          className="h-full w-full object-contain"
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center text-gray-400">
          未选择图片
        </div>
      )}
    </div>
  )
} 