import { useStore } from "../store/useStore";

export function ImageList() {
  const { selectedFile, loadExifData, imageList } = useStore();

  if (!imageList?.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        暂无图片
      </div>
    );
  }

  return (
    <div className="divide-y app-border overflow-y-auto">
      {imageList.map((image, index) => (
        <div
          key={index}
          className={`p-4 hover:bg-gray-50 cursor-pointer ${
            selectedFile === image.path ? "bg-gray-50" : ""
          }`}
          onClick={() => loadExifData(image.path)}
        >
          <div className="text-sm text-gray-900 truncate">{image.filename}</div>
        </div>
      ))}
    </div>
  );
}
