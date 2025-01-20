import { create } from "zustand";
import { getGPSExif, setGPSExif } from "../service";

interface AlertState {
  show: boolean;
  title: string;
  message?: string;
  type: "success" | "error";
}

interface ImageInfo {
  path: string;
  filename: string;
  timestamp: string;
  latitude?: number;
  longitude?: number;
}

interface ExifState {
  selectedFile: string | null;
  selectedLocation: [number, number] | null;
  exifData: any;
  imageList: ImageInfo[];
  alert: AlertState;
  setSelectedFile: (file: string | null) => void;
  setSelectedLocation: (location: [number, number] | null) => void;
  setExifData: (data: any) => void;
  showAlert: (alert: Omit<AlertState, "show">) => void;
  hideAlert: () => void;
  addImage: (file: File) => void;
  loadExifData: (filePath: string) => Promise<void>;
  saveGPSLocation: () => Promise<void>;
}

export const useStore = create<ExifState>((set, get) => ({
  selectedFile: null,
  selectedLocation: null,
  exifData: null,
  imageList: [],
  alert: {
    show: false,
    title: "",
    type: "success",
  },

  setSelectedFile: (file) => set({ selectedFile: file }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  setExifData: (data) => set({ exifData: data }),

  showAlert: (alert) => set({ alert: { ...alert, show: true } }),
  hideAlert: () => set((state) => ({ alert: { ...state.alert, show: false } })),

  addImage: (file: File) => {
    set((state) => ({
      imageList: [
        ...state.imageList,
        {
          // TODO: get file path & uuid
          path: "",
          filename: file.name,
          timestamp: new Date().toISOString(),
        },
      ],
    }));
  },

  loadExifData: async (filePath: string) => {
    try {
      const data = await getGPSExif();
      if (data.error) {
        throw new Error(data.error);
      }
      set({
        exifData: data,
        selectedFile: filePath,
        selectedLocation:
          data.latitude && data.longitude
            ? [data.latitude, data.longitude]
            : null,
      });
    } catch (error) {
      console.error("Failed to load EXIF data:", error);
      get().showAlert({
        title: "加载失败",
        message:
          error instanceof Error ? error.message : "无法加载图片 EXIF 数据",
        type: "error",
      });
    }
  },

  saveGPSLocation: async () => {
    const { selectedFile, selectedLocation } = get();
    if (!selectedFile || !selectedLocation) return;
    try {
      const data = await setGPSExif();
      if (data.error) {
        throw new Error(data.error);
      }
      get().showAlert({
        title: "保存成功",
        message: "GPS 信息已更新",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to save GPS location:", error);
      get().showAlert({
        title: "保存失败",
        message: error instanceof Error ? error.message : "无法保存 GPS 信息",
        type: "error",
      });
    }
  },
}));
