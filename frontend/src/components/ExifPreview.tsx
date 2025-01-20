import { useStore } from "../store/useStore";

export function ExifPreview() {
  const { selectedFile, exifData } = useStore();

  return (
    <div className="w-1/4 border-l app-border p-4">
      <div className="space-y-6">
        <section>
          <h3 className="text-sm text-gray-600 mb-2">Date and Time</h3>
          <div className="space-y-4">
            <div>
              <div className="text-xs text-gray-500">Old Date/Time</div>
              <input
                type="text"
                className="light-input w-full"
                defaultValue="9/12/2024, 13:04:53"
                readOnly
              />
            </div>
            <div>
              <div className="text-xs text-gray-500">New Date/Time</div>
              <input
                type="text"
                className="light-input w-full"
                defaultValue="9/12/2024, 13:04:53"
              />
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm text-gray-600 mb-2">Location</h3>
          <div className="space-y-4">
            <div>
              <div className="text-xs text-gray-500">Latitude</div>
              <input
                type="text"
                className="light-input w-full"
                defaultValue={exifData?.latitude || ""}
              />
            </div>
            <div>
              <div className="text-xs text-gray-500">Longitude</div>
              <input
                type="text"
                className="light-input w-full"
                defaultValue={exifData?.longitude || ""}
              />
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm text-gray-600 mb-2">Notice</h3>
          <p className="text-xs text-gray-500">
            Latitude and Longitude updates will not take effect until the return
            key is pressed when either field is active.
          </p>
        </section>
      </div>
    </div>
  );
}
