import { useStore } from "../store/useStore"

export function ExifPreview() {
  const { selectedFile, exifData } = useStore()

  return (
    <div className="w-1/4 p-4 border-l">
      <h2 className="text-lg font-medium mb-4">EXIF 信息预览</h2>
      {selectedFile && (
        <div>
          <img
            src={`file://${selectedFile}`}
            alt="预览"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(exifData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
} 