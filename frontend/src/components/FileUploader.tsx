import { UploadButton } from "./UploadButton";
import { ImageList } from "./ImageList";

export function FileUploader() {
  return (
    <div className="w-1/4 border-r app-border overflow-auto flex flex-col">
      <div className="p-4 border-b app-border">
        <UploadButton />
      </div>
      <div className="flex-1 overflow-auto">
        <ImageList />
      </div>
    </div>
  );
}
