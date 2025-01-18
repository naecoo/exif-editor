import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useStore } from "../store/useStore";

const defaultIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapEvents() {
  const setSelectedLocation = useStore((state) => state.setSelectedLocation);

  useMapEvents({
    click(e) {
      setSelectedLocation([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export function MapView() {
  const [isClient, setIsClient] = useState(false);
  const selectedLocation = useStore((state) => state.selectedLocation);
  const saveGPSLocation = useStore((state) => state.saveGPSLocation);
  const defaultCenter: [number, number] = [22.396428, 114.109497];

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="w-1/2 p-4 relative">
      <div style={{ height: "100%", width: "100%" }}>
        <MapContainer
          center={selectedLocation || defaultCenter}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapEvents />
          {selectedLocation && (
            <Marker position={selectedLocation} icon={defaultIcon} />
          )}
        </MapContainer>
      </div>
      {selectedLocation && (
        <button
          onClick={saveGPSLocation}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 
                   bg-blue-500 text-white px-4 py-2 rounded-lg
                   flex items-center space-x-2"
        >
          <MapPinIcon className="h-5 w-5" />
          <span>保存位置信息</span>
        </button>
      )}
    </div>
  );
}
