import { useState, useEffect } from "react";
import { GetGPSExif, SetGPSExif } from "../wailsjs/go/main/App";
import { main } from "../wailsjs/go/models";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useDropzone } from "react-dropzone";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { FolderIcon, MapPinIcon } from "@heroicons/react/24/outline";

// 修复 Leaflet 默认图标问题
const defaultIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// 分离 MapEvents 组件
function MapEvents({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function MapComponent({ onLocationSelect, selectedLocation }: {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation: [number, number] | null;
}) {
  const defaultCenter: [number, number] = [22.396428, 114.109497];
  
  return (
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
        <MapEvents onLocationSelect={onLocationSelect} />
        {selectedLocation && (
          <Marker position={selectedLocation} icon={defaultIcon} />
        )}
      </MapContainer>
    </div>
  );
}

function App() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [exifData, setExifData] = useState<any>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    onDrop: files => {
      if (files[0]) {
        setSelectedFile(files[0].path);
        // 读取图片的 EXIF 数据
        GetGPSExif(new main.GetExifParams({ image_path: files[0].path }))
          .then((data) => {
            setExifData(data);
            if (data.Latitude && data.Longitude) {
              setSelectedLocation([data.Latitude, data.Longitude]);
            }
          })
          .catch(console.error);
      }
    }
  });

  const handleSaveLocation = async () => {
    if (!selectedFile || !selectedLocation) return;
    
    try {
      await SetGPSExif(new main.SetExifParams({
        image_path: selectedFile,
        latitude: selectedLocation[0],
        longitude: selectedLocation[1],
      }));
      alert("GPS 信息已更新");
    } catch (err) {
      console.error(err);
      alert("更新失败");
    }
  };

  // 确保在组件挂载后才渲染地图
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="h-screen flex">
      {/* 左侧文件列表 */}
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

      {/* 中间地图 */}
      <div className="w-1/2 p-4 relative">
        {isClient && (
          <MapComponent
            onLocationSelect={(lat, lng) => setSelectedLocation([lat, lng])}
            selectedLocation={selectedLocation}
          />
        )}
        {selectedLocation && (
          <button
            onClick={handleSaveLocation}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 
                     bg-blue-500 text-white px-4 py-2 rounded-lg
                     flex items-center space-x-2"
          >
            <MapPinIcon className="h-5 w-5" />
            <span>保存位置信息</span>
          </button>
        )}
      </div>

      {/* 右侧预览 */}
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
    </div>
  );
}

export default App;
