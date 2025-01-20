import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";
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

  if (!isClient) {
    return null;
  }

  return (
    <div className="h-1/2">
      <div className="h-full">
        <MapContainer
          center={selectedLocation || defaultCenter}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <MapEvents />
          {selectedLocation && (
            <Marker position={selectedLocation} icon={defaultIcon} />
          )} */}
        </MapContainer>
      </div>
    </div>
  );
}
